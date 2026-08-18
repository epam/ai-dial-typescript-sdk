# Commit message examples — ai-dial-typescript-sdk

Format:

```
<type>: <short description>
<type>(<scope>): <short description>   # scope is optional, use sparingly
```

- This repo is a single npm package (not a monorepo), so most commits in real history omit a
  scope entirely: `feat: add user limits and usage endpoints`, not `feat(sdk): …`. Add one only
  when it disambiguates a specific, narrow concern (e.g. `chore(deps): …`).
- Breaking change → add `!` before the colon: `feat!: …`.
- No `(Issue #…)` suffix convention here. If there's a related issue, link it in the PR body's
  `fixes #<num>` line (see `pr-body.md`) — not in the commit or PR title.

## Type selection

Allowed types are CI-enforced (`amannn/action-semantic-pull-request` via the shared
`pr-title-check.yml` from `epam/ai-dial-ci`):

| Type    | When to use                                            |
| ------- | ------------------------------------------------------- |
| `feat`  | New feature, endpoint, schema field, or SDK capability   |
| `fix`   | Bug fix                                                  |
| `docs`  | Documentation only                                       |
| `test`  | Tests only                                               |
| `ci`    | CI/CD pipeline changes                                   |
| `chore` | Maintenance, dependency bumps, tooling, lockfile, config |

`refactor` and `style` are **not** in the allowed list — use `chore` or `fix` as the closest fit.

## Examples (drawn from real repo history)

```
feat: add user limits and usage endpoints
feat: add X-DIAL-CACHE-POLICY header for prompt-caching deployments
feat: add external service consent and offline credentials endpoints
feat: add platform-level applications and toolsets API endpoints
fix: simplify operation parameter location type inference in SDK types
fix: update ModelData type to use ModelOpenAi schema instead of Model
chore: bump the ai-dial-ci group with 3 updates
chore: update eslint to version 10.4.1 in package.json and package-lock.json
chore(deps-dev): bump fast-uri from 3.1.0 to 3.1.2
```

## Branch name

Derive the branch from the description slug — lowercase, hyphens only, no ticket number:

```
<type>/<short-slug>
```

Example:

- Commit: `feat: add X-DIAL-CACHE-POLICY header for prompt-caching deployments`
- Branch: `feat/dial-cache-policy-header`
