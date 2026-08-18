# PR body — ai-dial-typescript-sdk

Always follow the repo's actual PR template at `.github/pull_request_template.md`. Fill every
placeholder; never leave a blank `fixes #` or an empty description.

## Template structure

```markdown
### Applicable issues

- fixes #<ticket>

### Description of changes

<Explain what changed and why — 1-3 sentences is enough for most PRs in this repo.>

### Checklist

- [x] Title of the pull request follows [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.
```

## Rules for filling it

- **Applicable issues**: one `- fixes #<ticket>` line if a ticket exists. If there is genuinely no
  ticket, remove the line but keep the `### Applicable issues` heading with `- fixes #` blank, or
  drop the whole section — either matches existing PRs in this repo, which frequently ship without
  a linked issue.
- **Description of changes**: required — a real, specific summary, even for small chores. State the
  *why* when it isn't obvious from the *what* (e.g. dependency bumps: why now, not just what
  version).
- **Checklist**: the only item is the Conventional Commits title check — tick it since this skill's
  Step 4 always produces a compliant title.
- **Breaking changes**: if the PR is breaking, the title must use `!` (e.g. `feat!: …`).
- Do **not** add UI-screenshot or scope-taxonomy sections — this repo's template doesn't have them;
  don't invent structure it doesn't ask for.

## Filled example

```markdown
### Applicable issues

- fixes #40

### Description of changes

Adds a `dryRun` option to `createSDK()` so callers can validate request shapes against the OpenAPI
schema without making a network call. Needed for the CLI's `--check` flag.

### Checklist

- [x] Title of the pull request follows [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.
```

## Creating the PR

```bash
# Regular PR
gh pr create \
  --base development \
  --head <type>/<short-slug> \
  --title "<type>: <description>" \
  --body "<generated body>"

# Draft PR (if the user said "draft")
gh pr create \
  --base development \
  --head <type>/<short-slug> \
  --title "<type>: <description>" \
  --body "<generated body>" \
  --draft
```

Never pass `--base` pointing at a `release-*` branch from this skill — see the safety rail in
`SKILL.md` Step 0.

If `gh` is unavailable, give the compare URL for manual PR creation:

```
https://github.com/epam/ai-dial-typescript-sdk/compare/development...<type>/<short-slug>
```
