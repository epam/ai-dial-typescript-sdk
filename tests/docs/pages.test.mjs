import assert from 'node:assert/strict';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

import { writeRouteEntries } from '../../website/scripts/prepare-pages.mjs';

test('every documented method has a static entry with the project asset prefix preserved', () => {
  const reference = JSON.parse(
    readFileSync(
      new URL('../../website/src/data/api-reference.json', import.meta.url),
      'utf8',
    ),
  );
  const outDir = mkdtempSync(path.join(tmpdir(), 'dial-pages-'));
  const html =
    '<!doctype html><link rel="icon" href="/ai-dial-typescript-sdk/favicon.png"><div id="root"></div><script type="module" src="/ai-dial-typescript-sdk/assets/app.js"></script>';
  try {
    writeFileSync(path.join(outDir, 'index.html'), html);
    writeRouteEntries(
      outDir,
      reference.methods.map((method) => method.name),
    );
    for (const route of [
      'getting-started',
      'api',
      ...reference.methods.map((m) => `api/${m.name}`),
    ]) {
      assert.equal(
        readFileSync(path.join(outDir, route, 'index.html'), 'utf8'),
        html,
        route,
      );
    }
    assert.equal(readFileSync(path.join(outDir, '404.html'), 'utf8'), html);
    assert.equal(readFileSync(path.join(outDir, 'index.html'), 'utf8'), html);
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});

test('invalid route names fail before writing any pages', () => {
  const outDir = mkdtempSync(path.join(tmpdir(), 'dial-pages-invalid-'));
  try {
    writeFileSync(path.join(outDir, 'index.html'), '<!doctype html>');
    assert.throws(
      () => writeRouteEntries(outDir, ['getPrompt', '../../outside']),
      /Invalid SDK method name/,
    );
    assert.equal(existsSync(path.join(outDir, 'api')), false);
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});
