# DIAL SDK website

An independent React + TypeScript + Vite application, designed with the
[Hallmark skill](https://github.com/nexu-io/open-design/tree/main/plugins/community/hallmark).
All interface text is English.

## Run locally

From the repository root (Node.js 20.19+ or 22.12+):

```sh
npm ci
npm ci --prefix website
npm run website:dev
```

Open the local URL printed by Vite. Routes:

- `/` — marketing landing page with copyable SDK examples.
- `/getting-started` — installation, configuration and first requests.
- `/api` — all SDK methods, with search, category and HTTP filters.
- `/api/:methodName` — signatures, parameters, request/response schemas and source links.

Examples are illustrative. They require your DIAL instance, credentials,
deployment names and a supported API version. The site never sends API calls
or collects API keys. Copying a demo that saves a prompt can create a resource
when you run it against a real DIAL instance.

## Update the reference

```sh
npm run docs:generate
npm run docs:check
npm run docs:test
```

`scripts/generate-api-docs.mjs` reads:

- `src/client.ts`: every public `DIAL_SDK` method, exact arguments and return type.
- `open_api_core.yaml`: endpoints, categories, descriptions, parameters and schemas.
- `src/schema.ts`: TypeScript-required fields (including fields promoted by defaults).
- `src/types.ts`: public helper types, including conversation overrides.
- `package.json`: the SDK name, version and license.

It writes deterministic JSON in `website/src/data/`. No timestamps or model calls
are used. Descriptions come from OpenAPI; missing summaries use a readable
method name, with curated summaries for common operations. The script fails
when a public method lacks a matching OpenAPI operation. `--check` exits nonzero
when checked-in data differs from the sources.

The reference refreshes automatically during `npm run gen`, before the website
dev server starts, and before the website builds. After editing SDK sources while
the server is already running, run `npm run docs:generate`; Vite reloads the data.
The website CI workflow checks for stale data and runs generator/example tests.
No Claude Code skill is required to maintain the page.

## Build and host

```sh
npm run website:build
npm --prefix website run preview
```

Deploy **only `website/dist/`** to a static host. The build writes an
`index.html` entry inside each known route directory, including every method
in the generated reference. Direct links and refreshes therefore work on static
hosts such as GitHub Pages, without a server-side SPA rewrite. These entries
load the React application; they are not pre-rendered page content.
An additional `404.html` displays the application's not-found view for unknown
routes. `public/_redirects` remains available for hosts that support SPA rewrites;
GitHub Pages does not use it.
For a subdirectory deployment, set `WEBSITE_BASE_PATH=/your-prefix/` during build;
the Vite asset base and React router basename use the same value.

## GitHub Pages deployment

The [website workflow](../.github/workflows/website.yml) follows the
[UI Kit Storybook deployment](https://github.com/epam/ai-dial-ui-kit/blob/development/.github/workflows/static.yml):
Node.js 24, Pages artifact upload and `actions/deploy-pages`, using the
`github-pages` environment. No `gh-pages` branch or personal access token is needed.

- Pull requests run verification only.
- Relevant pushes to `development` verify, build and deploy the website.
- Manual runs are available through **Actions → Website and GitHub Pages → Run
  workflow**, selecting **development**. Other branches never deploy.
- Deployment waits for documentation tests, both builds and npm package
  isolation checks. Write permissions are limited to the deployment job.
- Concurrent runs on the same branch are serialized; pull request checks may
  cancel superseded runs.
- The build sets `WEBSITE_BASE_PATH` to `/<repository-name>/`. For this repository,
  the site URL will be `https://epam.github.io/ai-dial-typescript-sdk/`.

One-time repository setup, by an administrator or maintainer:

1. Open **Settings → Pages → Build and deployment → Source** and select
   **GitHub Actions**. Do not select **Deploy from a branch**.
2. The workflow uses the `github-pages` environment, which GitHub can create
   automatically. In **Settings → Environments → github-pages**, restrict
   deployment branches to `development` if you want an additional branch guard.
   If required reviewers are configured, deployments wait for their approval.
3. Merge the website and workflow into `development`, or run the workflow
   manually from that branch after the first merge.

Checked on 2026-09-19: this repository has Pages disabled, GitHub Actions enabled,
all actions allowed, and no deployment environments. Thus enabling the Pages
source is the required settings change; no new secrets or general Actions
permission changes are needed. Repository settings have not been modified.

To inspect the exact project-path build locally:

```sh
WEBSITE_BASE_PATH=/ai-dial-typescript-sdk/ npm run website:build
WEBSITE_BASE_PATH=/ai-dial-typescript-sdk/ npm --prefix website run preview
```

Open `/ai-dial-typescript-sdk/` at the preview server's URL. A future custom
domain would require updating the workflow's base path as well as Pages settings.

## Library isolation

The site is not a workspace dependency. It has its own private `package.json`,
lockfile and `node_modules`. The library’s `build` still targets only
`src/index.ts`, its TypeScript config includes only `src`, and its npm `files`
allowlist contains only `dist`. React and Vite are not added to SDK dependencies.
Website output goes into `website/dist`, separate from library `dist`.

## Design and assets

Hallmark direction: Split Studio, Quiet dark variant, restrained blue accent,
Geist and IBM Plex Mono. Typography and code provide the visual content.
Local font packages keep the site independent of font CDNs.

The favicon is the user-requested
[chat-favicon.png](https://github.com/epam/ai-dial-chat-themes/blob/development/static/chat-favicon.png)
from EPAM AI DIAL chat themes, copied without modification to `public/favicon.png`.
