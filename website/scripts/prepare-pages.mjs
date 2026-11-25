import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WEBSITE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

// GitHub Pages serves directories, but does not support an SPA rewrite rule.
// Each known route gets the built entry document; React renders its content.
// Core methods live under `api/`, Analytics methods under `analytics/api/`
// (the same prefixes as src/data/clients.ts).
export function writeRouteEntries(
  outDir,
  methodNames,
  analyticsMethodNames = [],
) {
  for (const name of [...methodNames, ...analyticsMethodNames]) {
    if (!/^[A-Za-z_$][\w$]*$/.test(name)) {
      throw new Error(`Invalid SDK method name for a Pages route: ${name}`);
    }
  }
  const html = readFileSync(path.join(outDir, 'index.html'), 'utf8');
  const routes = [
    'getting-started',
    'api',
    ...methodNames.map((name) => `api/${name}`),
    'analytics/api',
    ...analyticsMethodNames.map((name) => `analytics/api/${name}`),
  ];
  for (const route of routes) {
    const directory = path.join(outDir, route);
    mkdirSync(directory, { recursive: true });
    writeFileSync(path.join(directory, 'index.html'), html);
  }
  // Unknown routes retain HTTP 404 and display the application's not-found UI.
  writeFileSync(path.join(outDir, '404.html'), html);
  return routes;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const methodNames = (file) =>
    JSON.parse(
      readFileSync(path.join(WEBSITE, 'src/data', file), 'utf8'),
    ).methods.map((method) => method.name);
  const routes = writeRouteEntries(
    path.join(WEBSITE, 'dist'),
    methodNames('api-reference.json'),
    methodNames('analytics-reference.json'),
  );
  console.info(
    `Prepared ${routes.length} static route entries and 404.html for GitHub Pages.`,
  );
}
