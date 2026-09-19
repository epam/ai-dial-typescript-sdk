/** Generate the website reference from the SDK's actual public interface and OpenAPI. */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';
import YAML from 'yaml';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HTTP = new Set([
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
  'trace',
]);
const INPUTS = [
  'open_api_core.yaml',
  'src/client.ts',
  'src/schema.ts',
  'src/types.ts',
  'package.json',
];
const clean = (text = '') => text.replace(/\r\n/g, '\n').trim();
const titleCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());

export function resolveRef(document, value, seen = new Set()) {
  if (!value?.$ref) return value;
  const ref = value.$ref;
  if (!ref.startsWith('#/'))
    throw new Error(`Unsupported external reference: ${ref}`);
  if (seen.has(ref))
    throw new Error(`Circular reference while resolving ${ref}`);
  const target = ref
    .slice(2)
    .split('/')
    .reduce(
      (node, key) => node?.[key.replace(/~1/g, '/').replace(/~0/g, '~')],
      document,
    );
  if (!target) throw new Error(`Unresolved reference: ${ref}`);
  return {
    ...resolveRef(document, target, new Set([...seen, ref])),
    ...Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== '$ref'),
    ),
  };
}

function parseSource(text, name) {
  return ts.createSourceFile(
    name,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

export function parseMethods(text) {
  const source = parseSource(text, 'client.ts');
  const declaration = source.statements.find(
    (node) => ts.isInterfaceDeclaration(node) && node.name.text === 'DIAL_SDK',
  );
  if (!declaration)
    throw new Error('DIAL_SDK interface was not found in src/client.ts');
  const methods = declaration.members.map((member) => {
    if (
      !ts.isPropertySignature(member) ||
      !member.type ||
      !ts.isFunctionTypeNode(member.type)
    ) {
      throw new Error(`Unsupported SDK member: ${member.getText(source)}`);
    }
    const name = member.name.getText(source).replace(/^['"]|['"]$/g, '');
    const args = member.type.parameters.map((parameter) => ({
      name: parameter.name.getText(source),
      required: !parameter.questionToken && !parameter.initializer,
      type: parameter.type?.getText(source).replace(/\s+/g, ' ') ?? 'unknown',
    }));
    return {
      name,
      arguments: args,
      signature: `sdk.${name}(${args.map((arg) => `${arg.name}${arg.required ? '' : '?'}: ${arg.type}`).join(', ')})`,
      returnType: member.type.type.getText(source).replace(/\s+/g, ' '),
      sourceLine:
        source.getLineAndCharacterOfPosition(member.getStart(source)).line + 1,
    };
  });
  if (new Set(methods.map((m) => m.name)).size !== methods.length)
    throw new Error('Duplicate SDK method');
  return methods.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

function typescriptRequiredFields(text) {
  const source = parseSource(text, 'schema.ts');
  const components = source.statements.find(
    (n) => ts.isInterfaceDeclaration(n) && n.name.text === 'components',
  );
  const schemas = components?.members.find(
    (n) => n.name?.getText(source) === 'schemas',
  )?.type;
  if (!schemas || !ts.isTypeLiteralNode(schemas)) return {};
  return Object.fromEntries(
    schemas.members
      .filter((n) => n.type && ts.isTypeLiteralNode(n.type))
      .map((n) => [
        n.name.getText(source).replace(/^['"]|['"]$/g, ''),
        n.type.members
          .filter((p) => ts.isPropertySignature(p) && !p.questionToken)
          .map((p) => p.name.getText(source).replace(/^['"]|['"]$/g, '')),
      ]),
  );
}

function publicTypes(text) {
  const source = parseSource(text, 'types.ts');
  return Object.fromEntries(
    source.statements
      .filter(
        (n) =>
          (ts.isInterfaceDeclaration(n) || ts.isTypeAliasDeclaration(n)) &&
          n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword),
      )
      .map((n) => [n.name.text, n.getText(source)]),
  );
}

const descriptions = {
  sendChatCompletionRequest:
    'Generate a chat completion with a configured DIAL deployment.',
  createEmbedding:
    'Generate vector embeddings for text or token inputs using a DIAL deployment.',
  createCompletion: 'Generate a text completion with a configured deployment.',
  getDeployments: 'List the deployments available to the caller.',
  getUserBucket:
    'Get the caller’s DIAL storage bucket and application-data location.',
  uploadFile: 'Upload a file to a bucket using a multipart request body.',
  downloadFile: 'Download file contents from a bucket.',
  saveConversation:
    'Save or update a conversation at the specified bucket and path.',
  getConversation: 'Read a stored conversation from a bucket.',
  savePrompt: 'Save a reusable prompt at the specified bucket and path.',
  getPrompt: 'Read a stored prompt from a bucket.',
};

export function buildReference({
  client,
  openapi,
  schema,
  types,
  packageJson,
}) {
  const methods = parseMethods(client);
  const operations = new Map();
  for (const [endpoint, rawItem] of Object.entries(openapi.paths ?? {})) {
    const item = resolveRef(openapi, rawItem);
    for (const [verb, rawOperation] of Object.entries(item)) {
      if (!HTTP.has(verb) || !rawOperation?.operationId) continue;
      const operation = resolveRef(openapi, rawOperation);
      if (operations.has(operation.operationId))
        throw new Error(`Duplicate operationId: ${operation.operationId}`);
      operations.set(operation.operationId, {
        endpoint,
        verb: verb.toUpperCase(),
        item,
        operation,
      });
    }
  }
  const documents = methods.map((method) => {
    const mapped = operations.get(method.name);
    if (!mapped)
      throw new Error(
        `No OpenAPI operation for SDK method ${method.name}. Regenerate the SDK before the reference.`,
      );
    const { endpoint, verb, item, operation } = mapped;
    // Operation parameters override path-item parameters with the same name/location.
    const parameters = new Map();
    for (const rawParameter of [
      ...(item.parameters ?? []),
      ...(operation.parameters ?? []),
    ]) {
      const p = resolveRef(openapi, rawParameter);
      parameters.set(`${p.in}:${p.name}`, {
        name: p.name,
        location: p.in,
        required: p.required === true,
        description: clean(p.description),
        schema: p.schema ?? {},
        ...(p.example !== undefined ? { example: p.example } : {}),
      });
    }
    const request = resolveRef(openapi, operation.requestBody);
    const content = (value) =>
      Object.entries(value ?? {}).map(([mediaType, media]) => ({
        mediaType,
        schema: media.schema ?? {},
      }));
    const description = clean(operation.description || item.description);
    const summary =
      operation.summary && !operation.summary.startsWith('/')
        ? clean(operation.summary)
        : descriptions[method.name] || `${titleCase(method.name)}.`;
    return {
      ...method,
      title: titleCase(method.name),
      summary,
      description,
      category: operation.tags?.[0] ?? 'Other',
      tags: operation.tags ?? [],
      endpoint,
      httpMethod: verb,
      deprecated: operation.deprecated === true,
      parameters: [...parameters.values()],
      requestBody: request
        ? {
            required: request.required === true,
            description: clean(request.description),
            content: content(request.content),
          }
        : null,
      responses: Object.entries(operation.responses ?? {}).map(
        ([status, rawResponse]) => {
          const response = resolveRef(openapi, rawResponse);
          return {
            status,
            description: clean(response.description),
            content: content(response.content),
            headers: Object.entries(response.headers ?? {}).map(
              ([name, rawHeader]) => {
                const header = resolveRef(openapi, rawHeader);
                return {
                  name,
                  description: clean(header.description),
                  schema: header.schema ?? {},
                };
              },
            ),
          };
        },
      ),
      security: operation.security ?? openapi.security ?? [],
    };
  });
  const required = typescriptRequiredFields(schema);
  const schemas = Object.fromEntries(
    Object.entries(openapi.components?.schemas ?? {}).map(([name, value]) => [
      name,
      {
        ...value,
        ...(required[name] ? { 'x-typescript-required': required[name] } : {}),
      },
    ]),
  );
  const optionSource = parseSource(client, 'client.ts');
  const options = optionSource.statements.find(
    (n) => ts.isInterfaceDeclaration(n) && n.name.text === 'SDKOptions',
  );
  return {
    packageName: packageJson.name,
    version: packageJson.version,
    license: packageJson.license,
    runtimeDependencyCount: Object.keys(packageJson.dependencies ?? {}).length,
    methodCount: documents.length,
    categories: [...new Set(documents.map((m) => m.category))].sort(),
    methods: documents,
    schemas,
    sdkTypes: publicTypes(types),
    sdkOptions: options?.getText(optionSource) ?? '',
  };
}

export function generateReference(root = REPO, check = false) {
  const inputs = Object.fromEntries(
    INPUTS.map((file) => [
      file,
      fs.readFileSync(path.join(root, file), 'utf8'),
    ]),
  );
  const reference = buildReference({
    client: inputs['src/client.ts'],
    openapi: YAML.parse(inputs['open_api_core.yaml']),
    schema: inputs['src/schema.ts'],
    types: inputs['src/types.ts'],
    packageJson: JSON.parse(inputs['package.json']),
  });
  const sourceHash = createHash('sha256')
    .update(INPUTS.map((f) => f + '\n' + inputs[f]).join('\n'))
    .digest('hex');
  const data = { ...reference, sourceHash };
  const summary = {
    packageName: data.packageName,
    version: data.version,
    license: data.license,
    runtimeDependencyCount: data.runtimeDependencyCount,
    methodCount: data.methodCount,
    categories: data.categories,
  };
  const outputs = { 'api-reference.json': data, 'sdk-summary.json': summary };
  for (const [name, value] of Object.entries(outputs)) {
    const target = path.join(root, 'website/src/data', name);
    const serialized = JSON.stringify(value, null, 2) + '\n';
    if (check) {
      if (
        !fs.existsSync(target) ||
        fs.readFileSync(target, 'utf8') !== serialized
      ) {
        throw new Error(
          `${path.relative(root, target)} is stale. Run npm run docs:generate and commit the result.`,
        );
      }
    } else if (
      !fs.existsSync(target) ||
      fs.readFileSync(target, 'utf8') !== serialized
    ) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, serialized);
    }
  }
  return data;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const data = generateReference(REPO, process.argv.includes('--check'));
    console.info(
      `${process.argv.includes('--check') ? 'Verified' : 'Generated'} API reference: ${data.methodCount} methods, ${data.categories.length} categories.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
