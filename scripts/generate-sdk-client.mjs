import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(__dirname, '..');

const HTTP = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
];

/** Hand-written signatures for Core operations whose generated types are too loose. */
const CORE_OVERRIDES = {
  getConversation: {
    uses: ['Conversation', 'SDKRequestInit', 'SDKResponse'],
    method: `    getConversation: (bucket: string, conversation_path: string, init?: any) =>\n      client.GET(\n        apiPaths.getConversationUrl(bucket, conversation_path) as any,\n        init,\n      ) as Promise<SDKResponse<Conversation>>,`,
    signature: `  getConversation: (\n    bucket: string,\n    conversation_path: string,\n    init?: SDKRequestInit,\n  ) => Promise<SDKResponse<Conversation>>;`,
  },
  saveConversation: {
    uses: [
      'Conversation',
      'ConversationResource',
      'SDKRequestInit',
      'SDKResponse',
    ],
    method: `    saveConversation: (bucket: string, conversation_path: string, init?: any) =>\n      client.PUT(\n        apiPaths.saveConversationUrl(bucket, conversation_path) as any,\n        init,\n      ) as Promise<SDKResponse<ConversationResource>>,`,
    signature: `  saveConversation: (\n    bucket: string,\n    conversation_path: string,\n    init: SDKRequestInit<Conversation> & { body: Conversation },\n  ) => Promise<SDKResponse<ConversationResource>>;`,
  },
};

/**
 * One entry per upstream service. Each writes `api-paths.ts` and `client.ts` to `outDir`, next to
 * the `schema.ts` that `openapi-typescript` generates there (see `npm run gen`).
 */
const SERVICES = [
  {
    spec: 'open_api_core.yaml',
    outDir: 'src',
    interfaceName: 'DIAL_SDK',
    factoryName: 'createSDK',
    // Core's published signatures use lowercased path-parameter names (`appid`, `filepath`).
    lowercasePathParams: true,
    overrides: CORE_OVERRIDES,
  },
  {
    spec: 'open_api_analytics.json',
    outDir: 'src/analytics',
    interfaceName: 'DIAL_ANALYTICS_SDK',
    factoryName: 'createAnalyticsSDK',
    lowercasePathParams: false,
    overrides: {},
  },
];

function toClientMethod(verb) {
  return verb.toLowerCase() === 'delete' ? 'DELETE' : verb.toUpperCase();
}

/**
 * @param {string} p
 * @returns {string[]}
 */
function getPathParamNames(p) {
  return [...p.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
}

/**
 * @param {string} name
 */
function toPropertyKeyInType(name) {
  if (!/^[$_a-zA-Z][\w$]*$/.test(name) || /^\d/.test(name)) {
    return JSON.stringify(name);
  }
  return name;
}

function operationRequiresInit(op) {
  const hasRequiredRequestBody = op.requestBody?.required === true;
  const hasRequiredInitParam = (op.parameters ?? []).some(
    (param) =>
      param?.required === true &&
      param?.in &&
      param.in !== 'path' &&
      ['query', 'header', 'cookie'].includes(param.in),
  );

  return hasRequiredRequestBody || hasRequiredInitParam;
}

/**
 * True when every success response is plain text (e.g. `text/csv`), so the client must read the
 * body with `parseAs: 'text'` instead of openapi-fetch's default JSON parsing.
 */
function operationReturnsText(op) {
  const mediaTypes = Object.entries(op.responses ?? {})
    .filter(([status]) => /^2\d\d$/.test(status))
    .flatMap(([, response]) => Object.keys(response?.content ?? {}));
  return (
    mediaTypes.length > 0 &&
    mediaTypes.every((type) => /^text\/(?!event-stream)/.test(type))
  );
}

/** @param {string} p @returns {string} */
function escJsString(p) {
  return p.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

/** `../x` sorts before `./x`, as `simple-import-sort` expects. */
function byImportPath([a], [b]) {
  const depth = (s) => s.split('../').length;
  return depth(b) - depth(a) || a.localeCompare(b);
}

function readSpec(file) {
  const text = fs.readFileSync(file, 'utf8');
  return file.endsWith('.json') ? JSON.parse(text) : YAML.parse(text);
}

function generate(service) {
  const outDir = path.join(REPO, service.outDir);
  const rootDir = path.relative(outDir, path.join(REPO, 'src')) || '.';
  const paramName = (n) => (service.lowercasePathParams ? n.toLowerCase() : n);
  const pathParamsTypeString = (paramNames) =>
    paramNames.length === 0
      ? null
      : paramNames
          .map((n) => `${toPropertyKeyInType(paramName(n))}: string`)
          .join(', ');

  const doc = readSpec(path.join(REPO, service.spec));
  const docPaths = doc.paths;
  if (!docPaths) throw new Error(`No paths in ${service.spec}`);

  const opMap = new Map();

  for (const [p, item] of Object.entries(docPaths)) {
    for (const [verb, op] of Object.entries(item)) {
      if (!HTTP.includes(verb)) continue;
      if (!op || typeof op !== 'object' || !op.operationId) {
        continue;
      }
      // Machine-to-machine endpoints (e.g. OTLP receivers) are not part of the public SDK.
      if (op['x-internal'] === true) continue;
      const id = op.operationId;
      if (opMap.has(id)) {
        throw new Error(
          `Duplicate operationId: ${id}\n` +
            `  existing: ${opMap.get(id).path} ${opMap.get(id).httpVerb}\n` +
            `  new: ${p} ${verb}`,
        );
      }
      const pathParamNames = getPathParamNames(p);
      opMap.set(id, {
        path: p,
        method: toClientMethod(verb),
        httpVerb: verb,
        pathParamNames,
        requiresInit: operationRequiresInit(op),
        returnsText: operationReturnsText(op),
      });
    }
  }

  const sortedIds = [...opMap.keys()].sort();

  const apiPathLines = [
    '/**',
    ` * Path templates (from \`${service.spec}\`, one \`export const\` per \`operationId\`).`,
    ' * Static paths are `as const` strings. Paths with `{param}` are functions: one `string` arg per',
    ' * segment (e.g. `(toolset_name: string) => ...`) or a single object when there are several `{...}` parts.',
    ' *',
    ' * @generated by `scripts/generate-sdk-client.mjs` — do not edit by hand; run `npm run gen`',
    ' */',
    '',
  ];

  for (const id of sortedIds) {
    const p = opMap.get(id).path;
    const esc = escJsString(p);
    const names = getPathParamNames(p);

    if (names.length === 0) {
      apiPathLines.push(`export const ${id}Url = '${esc}';`);
      continue;
    }

    if (names.length === 1) {
      const n0 = names[0];
      if (/^[$_a-zA-Z][\w$]*$/.test(n0)) {
        const name = paramName(n0);
        // Example: (toolset_name: string) => { void toolset_name; return '...' as const; }
        apiPathLines.push(
          `export const ${id}Url = (${name}: string) => { return \`${esc.replace(`{${n0}}`, `\${${name}}`)}\` };`,
        );
      }
    } else {
      const t = pathParamsTypeString(names);
      let url = esc;
      names.forEach((n) => {
        url = url.replace(`{${n}}`, `\${${paramName(n)}}`);
      });
      apiPathLines.push(
        `export const ${id}Url = (${t}) => { return \`${url}\` };`,
      );
    }
    apiPathLines.push('');
  }

  const usedTypes = new Set();

  const methodLines = sortedIds.map((id) => {
    const { method, pathParamNames, returnsText } = opMap.get(id);
    const override = service.overrides[id];
    if (override) {
      override.uses.forEach((t) => usedTypes.add(t));
      return override.method;
    }

    const responseType = returnsText
      ? 'SDKOperationTextResponse'
      : 'SDKOperationResponse';
    const initArg = returnsText ? `{ parseAs: 'text', ...init }` : 'init';

    if (pathParamNames.length === 0) {
      return `    ${id}: (init?: any) =>\n      client.${method}(apiPaths.${id}Url, ${initArg}) as Promise<\n        ${responseType}<operations[${JSON.stringify(id)}]>\n      >,`;
    }

    const t = pathParamsTypeString(pathParamNames);
    return `    ${id}: (${t}, init?: any) =>\n      client.${method}(apiPaths.${id}Url(${pathParamNames.map(paramName).join(', ')}) as any, ${initArg}) as Promise<\n        ${responseType}<operations[${JSON.stringify(id)}]>\n      >,`;
  });

  const interfaceLines = sortedIds.map((id) => {
    const { pathParamNames, requiresInit, returnsText } = opMap.get(id);
    const override = service.overrides[id];
    if (override) return override.signature;

    const responseType = returnsText
      ? 'SDKOperationTextResponse'
      : 'SDKOperationResponse';
    usedTypes.add('SDKOperationInit');
    usedTypes.add(responseType);

    const initParam = requiresInit
      ? `init: SDKOperationInit<operations[${JSON.stringify(id)}]>`
      : `init?: SDKOperationInit<operations[${JSON.stringify(id)}]>`;
    const result = `Promise<${responseType}<operations[${JSON.stringify(id)}]>>`;

    const t = pathParamsTypeString(pathParamNames);
    if (!t) {
      return `  ${id}: (${initParam}) => ${result};`;
    }
    return `  ${id}: (${t}, ${initParam}) => ${result};`;
  });

  const ownsOptions = rootDir === '.';
  const imports = [
    ['./api-paths', `import * as apiPaths from './api-paths';`],
    ['./schema', `import type { operations, paths } from './schema';`],
    [
      `${rootDir}/types`,
      `import type {\n${[...usedTypes]
        .sort()
        .map((t) => `  ${t},`)
        .join('\n')}\n} from '${rootDir}/types';`,
    ],
    ...(ownsOptions
      ? []
      : [
          [
            `${rootDir}/client`,
            `import type { SDKOptions } from '${rootDir}/client';`,
          ],
        ]),
  ].sort(byImportPath);

  const optionsDeclaration = ownsOptions
    ? `
export interface SDKOptions {
  baseUrl: string;
  apiKey?: string;
  token?: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}
`
    : '';

  const client = `/* eslint-disable no-unused-vars */
import createClient from 'openapi-fetch';

${imports.map(([, line]) => line).join('\n')}
${optionsDeclaration}
/** Methods exposed by \`${service.factoryName}\` (explicit shape avoids TS emit limits on the inferred return type). */
export interface ${service.interfaceName} {
${interfaceLines.join('\n')}
}

export function ${service.factoryName}(opts: SDKOptions): ${service.interfaceName} {
  const client = createClient<paths>({
    baseUrl: opts.baseUrl,
    headers: {
      ...(opts.apiKey ? { 'Api-Key': opts.apiKey } : {}),
      ...(opts.token ? { Authorization: \`Bearer \${opts.token}\` } : {}),
      ...(opts.headers ?? {}),
    },
    fetch: opts.fetch,
  });

  return {
${methodLines.join('\n')}
  };
}
`;

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, 'api-paths.ts'),
    apiPathLines.join('\n') + '\n',
    'utf8',
  );
  fs.writeFileSync(path.join(outDir, 'client.ts'), client, 'utf8');
}

SERVICES.forEach(generate);
