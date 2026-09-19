import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

test('the exact website code examples compile against the SDK public exports', async () => {
  const source = readFileSync(
    path.join(root, 'website/src/data/examples.ts'),
    'utf8',
  );
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
    },
  }).outputText;
  const { snippets, setup, customFetch, discover } = await import(
    'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64')
  );
  const dir = mkdtempSync(path.join(tmpdir(), 'dial-examples-'));
  try {
    const entry = path.join(dir, 'examples.ts');
    const sdkImport = path.join(root, 'src/index');
    const text =
      setup.replace('@epam/ai-dial-typescript-sdk', sdkImport) +
      '\nconst apiVersion = "example-version";\n' +
      Object.values({ ...snippets, discover, customFetch })
        .map((code, index) => `async function example${index}() {\n${code}\n}`)
        .join('\n');
    writeFileSync(entry, text);
    const program = ts.createProgram([entry], {
      noEmit: true,
      strict: true,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      types: ['node'],
      typeRoots: [path.join(root, 'node_modules/@types')],
    });
    const errors = ts.getPreEmitDiagnostics(program);
    assert.equal(
      errors.length,
      0,
      ts.formatDiagnosticsWithColorAndContext(errors, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => root,
        getNewLine: () => '\n',
      }),
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
