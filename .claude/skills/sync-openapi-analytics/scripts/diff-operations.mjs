/**
 * Summarise how the DIAL Analytics OpenAPI contract changed, as Markdown for a sync PR body.
 *
 * Usage (from the repo root):
 *   node .claude/skills/sync-openapi-analytics/scripts/diff-operations.mjs [--old <file>] [--new <file>]
 *
 * Defaults: the old contract is `open_api_analytics.json` at `HEAD`, the new one is the working copy.
 * Only the `operationId`s the SDK generates count as SDK changes: operations marked
 * `x-internal: true` are skipped by `scripts/generate-sdk-client.mjs`.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const SPEC = 'open_api_analytics.json';
const HTTP = new Set([
  'get',
  'put',
  'post',
  'delete',
  'patch',
  'head',
  'options',
  'trace',
]);

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function readOld() {
  const file = option('--old');
  if (file) return JSON.parse(fs.readFileSync(file, 'utf8'));
  try {
    const text = execFileSync('git', ['show', `HEAD:${SPEC}`], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return JSON.parse(text);
  } catch {
    return {}; // First sync: nothing at HEAD yet.
  }
}

/** JSON with sorted keys, so key order never counts as a change. */
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function operations(doc) {
  const result = new Map();
  for (const [path, item] of Object.entries(doc.paths ?? {})) {
    for (const [verb, op] of Object.entries(item ?? {})) {
      if (!HTTP.has(verb) || !op?.operationId) continue;
      result.set(op.operationId, {
        route: `${verb.toUpperCase()} ${path}`,
        pathParams: [...path.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]),
        internal: op['x-internal'] === true,
        preview: op['x-preview'] === true,
        body: canonical(op),
      });
    }
  }
  return result;
}

const code = (s) => `\`${s}\``;
const list = (names) => names.map(code).join(', ');

const before = readOld();
const after = JSON.parse(fs.readFileSync(option('--new') ?? SPEC, 'utf8'));
const oldOps = operations(before);
const newOps = operations(after);
const publicIds = (ops) =>
  [...ops].filter(([, op]) => !op.internal).map(([id]) => id);
const oldPublic = new Set(publicIds(oldOps));
const newPublic = new Set(publicIds(newOps));

const added = [...newPublic].filter((id) => !oldPublic.has(id)).sort();
const removed = [...oldPublic].filter((id) => !newPublic.has(id)).sort();

// A removed id and an added id on the same route is a rename.
const renamed = [];
for (const oldId of [...removed]) {
  const newId = added.find(
    (id) => newOps.get(id).route === oldOps.get(oldId).route,
  );
  if (newId) {
    renamed.push([oldId, newId]);
    removed.splice(removed.indexOf(oldId), 1);
    added.splice(added.indexOf(newId), 1);
  }
}

const describeAdded = (id) =>
  `${code(id)} ${newOps.get(id).route}${
    oldOps.get(id)?.internal ? ' (no longer `x-internal`)' : ''
  }${newOps.get(id).preview ? ' (preview)' : ''}`;
const describeRemoved = (id) =>
  newOps.get(id)?.internal
    ? `${code(id)} ${oldOps.get(id).route} (now \`x-internal\`, so no longer generated)`
    : `${code(id)} ${oldOps.get(id).route}`;

// `x-internal` operations are not generated; list them so the operation counts add up.
const internalAdded = [...newOps]
  .filter(([id, op]) => op.internal && !oldOps.has(id))
  .map(([id]) => id)
  .sort();
const internalRemoved = [...oldOps]
  .filter(([id, op]) => op.internal && !newOps.has(id))
  .map(([id]) => id)
  .sort();

const kept = [...newPublic].filter((id) => oldPublic.has(id)).sort();
const moved = kept.filter(
  (id) => oldOps.get(id).route !== newOps.get(id).route,
);
// Path parameters are positional SDK arguments: only a different count breaks callers.
const signatureChanged = moved.filter(
  (id) => oldOps.get(id).pathParams.length !== newOps.get(id).pathParams.length,
);
const previewToggled = kept.filter(
  (id) => oldOps.get(id).preview !== newOps.get(id).preview,
);
const detailsChanged = kept.filter(
  (id) =>
    !moved.includes(id) &&
    !previewToggled.includes(id) &&
    oldOps.get(id).body !== newOps.get(id).body,
);

const oldSchemas = before.components?.schemas ?? {};
const newSchemas = after.components?.schemas ?? {};
const schemasAdded = Object.keys(newSchemas)
  .filter((n) => !oldSchemas[n])
  .sort();
const schemasRemoved = Object.keys(oldSchemas)
  .filter((n) => !newSchemas[n])
  .sort();
const fieldChanges = [];
const otherSchemaChanges = [];
for (const name of Object.keys(newSchemas).sort()) {
  const a = oldSchemas[name];
  const b = newSchemas[name];
  if (!a || canonical(a) === canonical(b)) continue;
  const aProps = Object.keys(a.properties ?? {});
  const bProps = Object.keys(b.properties ?? {});
  const aRequired = a.required ?? [];
  const bRequired = b.required ?? [];
  const parts = [
    ...bProps.filter((p) => !aProps.includes(p)).map((p) => `+${code(p)}`),
    ...aProps.filter((p) => !bProps.includes(p)).map((p) => `−${code(p)}`),
    ...bRequired
      .filter((p) => !aRequired.includes(p))
      .map((p) => `${code(p)} now required`),
    ...aRequired
      .filter((p) => !bRequired.includes(p))
      .map((p) => `${code(p)} now optional`),
  ];
  if (parts.length) fieldChanges.push(`${code(name)}: ${parts.join(', ')}`);
  else otherSchemaChanges.push(name);
}

const breaking = [
  ...removed.map((id) => `removed ${describeRemoved(id)}`),
  ...renamed.map(([o, n]) => `renamed ${code(o)} → ${code(n)}`),
  ...signatureChanged.map(
    (id) =>
      `${code(id)} takes a different number of path arguments: ${oldOps.get(id).route} → ${newOps.get(id).route}`,
  ),
];

const lines = [
  `Operations: ${oldOps.size} → ${newOps.size} (${oldPublic.size} → ${newPublic.size} generated in the SDK).`,
];
const section = (title, items) => {
  if (items.length === 0) return;
  lines.push('', `**${title}**`, '', ...items.map((item) => `- ${item}`));
};
section('Breaking changes for SDK consumers', breaking);
section('Added operations', added.map(describeAdded));
section(
  'Moved operations',
  moved
    .filter((id) => !signatureChanged.includes(id))
    .map(
      (id) =>
        `${code(id)}: ${oldOps.get(id).route} → ${newOps.get(id).route} (same SDK signature)`,
    ),
);
section(
  'Preview marking changed',
  previewToggled.map(
    (id) =>
      `${code(id)} ${newOps.get(id).preview ? 'is now' : 'is no longer'} \`x-preview\``,
  ),
);
section('Internal operations (`x-internal`, not generated)', [
  ...internalAdded.map((id) => `added ${code(id)} ${newOps.get(id).route}`),
  ...internalRemoved.map((id) => `removed ${code(id)} ${oldOps.get(id).route}`),
]);
if (detailsChanged.length) {
  lines.push(
    '',
    `**Operations with changed parameters, bodies, responses or descriptions:** ${list(detailsChanged)}`,
  );
}
section('Schema fields', fieldChanges);
if (schemasAdded.length)
  lines.push('', `**Schemas added:** ${list(schemasAdded)}`);
if (schemasRemoved.length)
  lines.push('', `**Schemas removed:** ${list(schemasRemoved)}`);
if (otherSchemaChanges.length) {
  lines.push(
    '',
    `**Schemas with other changes (types, enums, descriptions, examples):** ${list(otherSchemaChanges)}`,
  );
}
if (lines.length === 1) {
  lines.push(
    '',
    canonical(before) === canonical(after)
      ? 'No changes.'
      : 'No operation or schema changes; only document-level metadata changed (info, tags, security schemes).',
  );
}

console.info(lines.join('\n'));
