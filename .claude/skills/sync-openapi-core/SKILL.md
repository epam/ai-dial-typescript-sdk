---
name: sync-openapi-core
context: fork
effort: medium
allowed-tools: Bash(curl:*), Bash(gh:*), Bash(git:*), Bash(npm:*), Read
description: >
  Use this skill whenever the user wants to sync/update/regenerate the SDK from the upstream
  ai-dial-core OpenAPI spec. Triggers include: "sync the openapi spec", "update open_api_core.yaml",
  "regenerate the SDK", "pull the latest spec from ai-dial-core", "check for API changes upstream",
  or any variation of refreshing this repo's `open_api_core.yaml` from
  github.com/epam/ai-dial-core and regenerating the typed client from it. Handles the full cycle:
  fetch → replace → format → (conditionally) regenerate → ship as a PR via the git-ship skill.
---

# Sync OpenAPI Core Skill

Pulls the latest `docs/open_api_core.yaml` from `epam/ai-dial-core@development`, drops it in at
this repo's root `open_api_core.yaml`, and — only if that actually changed anything — regenerates
the typed SDK and ships the result as a PR into `development`.

`open_api_core.yaml` is large (several hundred KB). **Never read it into the conversation with the
Read tool** and never inline its content as a tool argument — every step below works on it purely
through `curl`/`git`/`npm` in the shell, which is exactly why this skill only needs Bash + Read
(the latter is for reading `git-ship`'s instructions in Step 6, not the spec file).

---

## Step 1 — Fetch the upstream spec

```bash
curl -fsSL https://raw.githubusercontent.com/epam/ai-dial-core/development/docs/open_api_core.yaml \
  -o open_api_core.yaml
```

Always the `development` branch of `epam/ai-dial-core` — that's the source of truth this repo
tracks. If `curl` fails (network error, 404, empty response), stop and report; do not overwrite the
local file with a partial/empty response. A quick sanity check before proceeding:

```bash
[ -s open_api_core.yaml ] && head -c 200 open_api_core.yaml
```

## Step 2 — Format

```bash
npm run format
```

This runs `prettier --write .`, which normalizes the freshly-copied file (GitHub's raw formatting,
line endings, etc. may otherwise register as a diff even when the spec content is identical).

## Step 3 — Check whether anything actually changed

```bash
git status --porcelain open_api_core.yaml
```

- **Empty output** → the spec is already up to date. Report this and **stop** — no regeneration,
  no branch, no PR.
- **Non-empty output** → proceed to Step 4.

## Step 4 — Regenerate the SDK

```bash
npm run gen
```

This bundles `open_api_core.yaml` → `openapi.bundle.yaml`, regenerates `src/schema.ts` (via
`openapi-typescript`) and `src/api-paths.ts` / `src/client.ts` (via
`scripts/generate-sdk-client.mjs`), runs `tsc --noEmit`, and formats again.

**If this fails** (type errors from `tsc --noEmit`, a generation script crash, etc.) — stop here.
Do not proceed to shipping a PR with a broken generation step; report the failure output so it can
be fixed by hand (the upstream spec may have introduced something the generator or the SDK's
hand-written parts don't yet handle).

## Step 5 — Confirm the full diff

```bash
git status --porcelain
```

Expect changes limited to: `open_api_core.yaml`, `openapi.bundle.yaml`, `src/schema.ts`,
`src/api-paths.ts`, `src/client.ts` (and possibly `package-lock.json`/`dist/*` only if something
else in the working tree was already dirty — if unrelated files show up, flag it rather than
silently shipping them).

## Step 6 — Ship via git-ship

Read `.claude/skills/git-ship/SKILL.md` and its `examples/` files, then **follow those steps
directly in this run** — do not try to invoke it via the Skill tool or a slash command; it's a
`context: fork` skill and can't be called that way from inside another skill.

- Base branch: `development` (per git-ship's default).
- Stage only the files identified in Step 5 (`git add open_api_core.yaml openapi.bundle.yaml
src/schema.ts src/api-paths.ts src/client.ts`), not `git add .`.
- Let git-ship's own diff analysis pick the commit type — a pure spec sync with no new
  endpoints/fields is typically `chore: sync open_api_core.yaml from ai-dial-core`; if the diff
  shows new endpoints/operations/schema fields, `feat: …` is more accurate. Don't hardcode it here.
- PR body: describe it as a sync from `epam/ai-dial-core@development` as of today, and mention
  whether the diff added, removed, or changed endpoints/fields — a one-line summary is enough,
  drawn from skimming `git diff --stat` and the changed operation IDs in `src/api-paths.ts`, not
  from reading the full spec.
- No ticket number applies here unless the user gives one — proceed without a `fixes #` line, as
  git-ship's own Step 1 allows.

## Step 7 — Summary

Always finish with a concise report:

```
Spec:       up to date, no changes  /  updated from ai-dial-core@development
Regen:      skipped (no spec change)  /  ✅ succeeded  /  ❌ failed — <reason>
Branch:     <branch>  (omitted if nothing shipped)
PR:         <link>  (omitted if nothing shipped)
```
