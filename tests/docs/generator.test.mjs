import assert from 'node:assert/strict';
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import YAML from 'yaml';

import {
  buildReference,
  generateReference,
  parseMethods,
  resolveRef,
} from '../../scripts/generate-api-docs.mjs';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const fixture = {
  client: `export interface SDKOptions { baseUrl: string; }
export interface DIAL_SDK {
  getItem: (id: string, init?: SDKRequestInit) => Promise<SDKResponse<Item>>;
}`,
  openapi: {
    paths: {
      '/items/{id}': {
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
          { name: 'limit', in: 'query', schema: { type: 'number' } },
        ],
        get: {
          operationId: 'getItem',
          tags: ['Items'],
          description: 'Read the requested item.',
          parameters: [
            {
              name: 'limit',
              in: 'query',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          responses: { 200: { $ref: '#/components/responses/Item' } },
        },
      },
    },
    components: {
      responses: {
        Item: {
          description: 'Found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Item' },
            },
          },
        },
      },
      schemas: {
        Item: { type: 'object', properties: { name: { type: 'string' } } },
      },
    },
  },
  schema:
    'export interface components { schemas: { Item: { name: string; optional?: number } } }',
  types: 'export interface Item { name: string; }',
  packageJson: { name: 'sdk', version: '1', license: 'Apache-2.0' },
};

test('real repository: every SDK method has exactly one documented operation', () => {
  const data = generateReference(root, true);
  const names = parseMethods(
    readFileSync(path.join(root, 'src/client.ts'), 'utf8'),
  ).map((m) => m.name);
  assert.deepEqual(
    data.methods.map((m) => m.name),
    names,
  );
  assert.ok(data.methodCount > 100);
  assert.ok(
    data.methods.every(
      (m) => m.summary && m.endpoint && m.returnType && m.responses.length,
    ),
  );
  assert.match(
    data.methods.find((m) => m.name === 'saveConversation').signature,
    /body: Conversation/,
  );
  assert.ok(
    data.schemas.ChatCompletionRequest['x-typescript-required'].includes(
      'stream',
    ),
  );
  assert.equal(
    data.methods.find((m) => m.name === 'uploadFile').requestBody.content[0]
      .mediaType,
    'multipart/form-data',
  );
});

test('merges path parameters, honors operation overrides and resolves response references', () => {
  const data = buildReference(fixture);
  assert.equal(data.methods[0].parameters.length, 2);
  assert.equal(data.methods[0].parameters[1].required, true);
  assert.equal(data.methods[0].parameters[1].schema.type, 'integer');
  assert.equal(data.methods[0].responses[0].description, 'Found');
  assert.deepEqual(data.schemas.Item['x-typescript-required'], ['name']);
  assert.match(data.methods[0].signature, /init\?: SDKRequestInit/);
});

test('method drift and duplicate operation IDs fail instead of silently dropping docs', () => {
  assert.throws(
    () =>
      buildReference({
        ...fixture,
        client: fixture.client.replace('getItem:', 'missingMethod:'),
      }),
    /No OpenAPI operation/,
  );
  const openapi = structuredClone(fixture.openapi);
  openapi.paths['/duplicate'] = {
    get: structuredClone(openapi.paths['/items/{id}'].get),
  };
  assert.throws(
    () => buildReference({ ...fixture, openapi }),
    /Duplicate operationId/,
  );
});

test('missing, external and circular references report useful errors', () => {
  assert.throws(() => resolveRef({}, { $ref: '#/missing' }), /Unresolved/);
  assert.throws(() => resolveRef({}, { $ref: 'external.yaml' }), /external/);
  assert.throws(
    () => resolveRef({ loop: { $ref: '#/loop' } }, { $ref: '#/loop' }),
    /Circular/,
  );
});

test('generation is deterministic and --check detects stale descriptions', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'dial-reference-'));
  try {
    mkdirSync(path.join(dir, 'src'));
    writeFileSync(path.join(dir, 'src/client.ts'), fixture.client);
    writeFileSync(path.join(dir, 'src/schema.ts'), fixture.schema);
    writeFileSync(path.join(dir, 'src/types.ts'), fixture.types);
    writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify(fixture.packageJson),
    );
    writeFileSync(
      path.join(dir, 'open_api_core.yaml'),
      YAML.stringify(fixture.openapi),
    );
    generateReference(dir);
    const first = readFileSync(
      path.join(dir, 'website/src/data/api-reference.json'),
      'utf8',
    );
    generateReference(dir);
    assert.equal(
      readFileSync(
        path.join(dir, 'website/src/data/api-reference.json'),
        'utf8',
      ),
      first,
    );
    generateReference(dir, true);
    const changed = structuredClone(fixture.openapi);
    changed.paths['/items/{id}'].get.description = 'A new description';
    writeFileSync(
      path.join(dir, 'open_api_core.yaml'),
      YAML.stringify(changed),
    );
    assert.throws(() => generateReference(dir, true), /stale/);
    generateReference(dir);
    assert.match(
      readFileSync(
        path.join(dir, 'website/src/data/api-reference.json'),
        'utf8',
      ),
      /A new description/,
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('site is private and excluded by the library package allowlist', () => {
  const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  const website = JSON.parse(
    readFileSync(path.join(root, 'website/package.json'), 'utf8'),
  );
  assert.deepEqual(pkg.files, ['dist']);
  assert.equal(website.private, true);
  assert.equal(pkg.dependencies.react, undefined);
  assert.ok(!pkg.scripts.build.includes('website'));
});
