---
name: sync-openapi-analytics
context: fork
effort: medium
allowed-tools: Bash(curl:*), Bash(gh:*), Bash(git:*), Bash(npm:*), Bash(node:*), Read
description: >
  Use this skill whenever the user wants to sync/update/regenerate the DIAL Analytics (ADAS) client
  from the upstream ai-dial-analytics OpenAPI document. Triggers include: "sync the analytics spec",
  "update open_api_analytics.json", "regenerate the analytics client", "pull the latest ADAS spec",
  "check for analytics API changes upstream", or any variation of refreshing this repo's
  `open_api_analytics.json` from github.com/epam/ai-dial-analytics and regenerating the typed
  Analytics client from it. Handles the full cycle: fetch → validate → format → (conditionally)
  regenerate → summarise operation changes → ship as a PR via the git-ship skill. For DIAL Core's
  `open_api_core.yaml`, use the sync-openapi-core skill instead.
---

# Sync OpenAPI Analytics Skill

Pulls the latest `docs/openapi.json` from `epam/ai-dial-analytics@development`, drops it in at this
repo's root `open_api_analytics.json`, and — only if that actually changed anything — regenerates the
Analytics client in `src/analytics/` and ships the result as a PR into `development`.

`open_api_analytics.json` is large (about 460 KB). **Never read it into the conversation with the
Read tool** and never inline its content as a tool argument. Every step below works on it through
`curl`, `git`, `npm` and `node` in the shell. The Read tool is only for `git-ship`'s instructions in
Step 7.

---

## Step 0 — Preconditions

```bash
git status --porcelain
git rev-parse --abbrev-ref HEAD
```

- **Dirty working tree** → stop and report. Do not stash, commit or discard anything: the changes
  may be the user's work.
- **Clean, but not on `development`** → `git checkout development`. A sync must be generated from
  `development`; on a feature branch, that branch's generator or contract changes would leak into
  the sync PR.

Then bring `development` up to date and confirm the Analytics client exists on it:

```bash
git pull --ff-only origin development
git ls-files --error-unmatch open_api_analytics.json
```

If `git ls-files` fails, the Analytics client has not landed on `development` yet (epam/ai-dial-typescript-sdk#72).
Report that and stop.

## Step 1 — Fetch the upstream spec

```bash
curl -fsSL https://raw.githubusercontent.com/epam/ai-dial-analytics/development/docs/openapi.json \
  -o open_api_analytics.json
```

Always the `development` branch of `epam/ai-dial-analytics`, which is the source of truth this repo
tracks, as it does for Core. ADAS commits this file with a build-time drift check, so it always
matches the code on that branch.

## Step 2 — Validate before going further

```bash
node -e "const d = JSON.parse(require('fs').readFileSync('open_api_analytics.json', 'utf8')); if (!/^3\./.test(d.openapi ?? '') || !Object.keys(d.paths ?? {}).length) { console.error('Not an OpenAPI 3 document with paths'); process.exit(1); }"
```

If `curl` failed (network error, 404) or this check fails (empty, truncated or non-JSON response),
restore the committed file and stop:

```bash
git checkout -- open_api_analytics.json
```

Never continue with a partial or empty spec.

## Step 3 — Format

```bash
npm run format
```

This runs `prettier --write .`, which normalises the fetched file (for example, it puts short arrays
on one line). Without it, upstream formatting would show up as a diff even when the content is
identical.

## Step 4 — Check whether anything actually changed

```bash
git status --porcelain open_api_analytics.json
```

- **Empty output** → the spec is already up to date. Report this and **stop**: no regeneration, no
  branch, no PR.
- **Non-empty output** → proceed to Step 5.

## Step 5 — Regenerate the SDK

```bash
npm run gen
```

This regenerates both clients: `src/schema.ts`, `src/api-paths.ts` and `src/client.ts` for Core,
the same three files under `src/analytics/` for Analytics, runs `tsc --noEmit`, formats, and
refreshes the website reference. Operations marked `x-internal: true` in the spec are not generated.

**If this fails** (type errors from `tsc --noEmit`, a generator crash, and so on), stop. Do not ship
a PR with a broken generation step. Report the failure output so it can be fixed by hand: the
upstream spec may use something the generator or the SDK's hand-written types do not handle yet.

## Step 6 — Confirm the diff and summarise the changes

```bash
git status --porcelain
node .claude/skills/sync-openapi-analytics/scripts/diff-operations.mjs
```

Expect changes limited to:

- `open_api_analytics.json`
- `src/analytics/schema.ts`, `src/analytics/api-paths.ts`, `src/analytics/client.ts`
- `website/src/data/api-reference.json` and `website/src/data/sdk-summary.json`, but only once the
  website documents the Analytics client (epam/ai-dial-typescript-sdk#75)

If a Core file changed (`open_api_core.yaml`, `openapi.bundle.yaml`, `src/schema.ts`,
`src/api-paths.ts`, `src/client.ts`) or anything else shows up, **stop and report it**. It means the
generator or the Core contract drifted from what is committed, and that does not belong in an
Analytics sync PR.

`diff-operations.mjs` compares the contract at `HEAD` with the fetched one and prints a Markdown
summary:

- operation counts;
- **breaking changes for SDK consumers**: removed or renamed `operationId`s, operations that became
  `x-internal` (no longer generated), and operations whose number of path parameters changed (the
  SDK passes them as positional arguments);
- added and moved operations, `x-preview` changes, and operations whose parameters or bodies changed;
- schema changes: added and removed fields, newly required or optional fields, and added or removed
  schemas.

Use its output for the commit title and the PR body. Do not read the spec to work this out.

## Step 7 — Ship via git-ship

Read `.claude/skills/git-ship/SKILL.md` and its `examples/` files, then **follow those steps
directly in this run**. Do not try to invoke it through the Skill tool or a slash command: it is a
`context: fork` skill and can't be called that way from inside another skill.

- Base branch: `development` (git-ship's default).
- Stage only the files confirmed in Step 6 (for example,
  `git add open_api_analytics.json src/analytics/schema.ts src/analytics/api-paths.ts src/analytics/client.ts`),
  never `git add .`.
- Commit and PR title, following the Core sync convention:
  - `feat: sync open_api_analytics.json from ai-dial-analytics with <summary>` when the summary
    lists added, moved or changed operations, schema field changes, or added schemas. All of these
    reach SDK users, through the client or the exported `AnalyticsComponents` types. `<summary>`
    names the main change in a few words, for example `dashboard legend and table access export`.
  - `chore: sync open_api_analytics.json from ai-dial-analytics` when the summary lists only
    internal operations, "Schemas with other changes", or document-level metadata.
  - Do **not** add `!` on your own. Breaking changes go in the PR body and the final report, and a
    person decides whether the title needs `!`, because it affects the release.
- PR body: in "Description of changes", say the spec was synced from
  `epam/ai-dial-analytics@development` as of today's date, then paste the `diff-operations.mjs`
  output unchanged. If it has a "Breaking changes for SDK consumers" section, add one sentence
  before the pasted output saying the PR contains breaking changes.
- No ticket number applies unless the user gives one: proceed without a `fixes #` line, as
  git-ship's Step 1 allows.

## Step 8 — Summary

Always finish with a concise report:

```
Spec:       up to date, no changes  /  updated from ai-dial-analytics@development
Regen:      skipped (no spec change)  /  ✅ succeeded  /  ❌ failed — <reason>
Operations: <the counts line from diff-operations.mjs>  (omitted if nothing changed)
Breaking:   none  /  <one line per breaking change> — decide whether the PR title needs `!`
Branch:     <branch>  (omitted if nothing shipped)
PR:         <link>  (omitted if nothing shipped)
```
