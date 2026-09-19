# Website validation

Reviewed on 2026-09-19 using Node.js 20.19.5 and local Chrome through Playwright.

## Build and documentation

- Website TypeScript checking and production build pass.
- The SDK's original ESM, CJS and declaration build passes.
- Repository ESLint passes.
- Nine generator/example/Pages tests pass. They cover complete method coverage,
  operation drift, parameter overrides, local references, deterministic output,
  stale-data detection, package isolation, compilation of the displayed examples,
  static route coverage and rejection of invalid route names.
- The reference contains all 205 public `DIAL_SDK` methods in 32 categories.
- `npm pack --dry-run --json` contains only `dist/*`, LICENSE, README.md and
  package.json. It contains no website files or React runtime dependency.

## Browser review

- All 205 method links are reachable through pagination.
- Search, empty results, filter reset, HTTP filters and direct method URLs work.
- Request schema expansion, clipboard copying and example tabs work.
- Mobile navigation opens and closes; the category browser starts collapsed
  on narrow screens so method content is immediately accessible.
- Keyboard tab navigation, the search shortcut, guide anchors and reduced
  motion were checked.
- Landing, guide, method index and method detail have no document overflow at
  320, 375, 414, 768 and 1440 CSS pixels. Code blocks scroll independently.
- The requested PNG favicon loads successfully. Interface copy is English.
- No JavaScript page errors occurred during the interaction checks.
- Computed foreground/background contrast was checked on the default views
  of those four routes: 571 text elements, minimum measured ratio 5.24:1.
  This is a targeted check, not a complete accessibility certification.

## Hallmark review

Design: Split Studio, Quiet dark variant, modern-minimal genre. Two font
families, named OKLCH tokens, code examples as the main visual, two navigation
destinations and an inline footer. Reviewed against the Hallmark slop checklist:
no invented testimonials or metrics, decorative gradients, fake browser chrome,
card grids, automatic content rotation or ornamental animation.

Self-critique, out of five: philosophy 4, hierarchy 4, execution 4,
specificity 5, restraint 5, variety 4. The site prioritizes actual SDK usage;
its visual identity deliberately stays close to a technical documentation tool.

## GitHub Pages preparation

- Production build verified with `WEBSITE_BASE_PATH=/ai-dial-typescript-sdk/`.
- The build generates 207 route entry documents (guide, index and 205 methods)
  plus `404.html`, preserving the prefixed bundle and favicon URLs.
- Local Chrome was tested against a static server with directory redirects and
  custom 404 handling, without an SPA rewrite. All 205 direct method URLs returned
  HTTP 200. Refreshes, search, navigation, guide anchors and both favicon uses
  worked; an unknown method returned HTTP 404 and rendered the not-found view.
- Workflow YAML, artifact names, build dependency, branch guards and job
  permissions were checked locally. GitHub-hosted execution has not been run.
- GitHub API inspection confirmed Pages is disabled and Actions is enabled.
  Repository settings were read, not changed; no site has been published.

## Limits

Examples are type-checked, not executed against a live DIAL instance. A deployment
must supply credentials, available models and a supported API version.

The API route loads separately from the landing page. Its complete reference
and Markdown renderer produce an approximately 641 KB JavaScript chunk
(89 KB gzip), which triggers Vite's default size warning. The landing does not
load that chunk until documentation is opened.

GitHub Pages must be enabled as described in README.md before the first deployment.
Local browser checks used Chrome; Safari and Firefox were not tested.
