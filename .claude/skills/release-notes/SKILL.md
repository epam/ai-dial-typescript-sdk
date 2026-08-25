---
name: release-notes
description: Use when the user asks to enhance, refine, polish, or "look at" the release notes for a tag of @epam/ai-dial-typescript-sdk — a version cut by the CI release workflow (e.g. `0.3.0`). Reads the CI-generated notes off the GitHub release, classifies and rewrites each bullet in this project's editorial voice, and saves a draft to `.claude/release-notes/`. Never edits GitHub directly.
allowed-tools: Read Grep Glob Bash(gh release view:*) Bash(gh release list:*) Bash(gh pr view:*) Bash(gh pr list:*) Bash(gh pr diff:*) Bash(git log:*) Bash(git show:*) Bash(git diff:*) Bash(git tag:*) Bash(git rev-parse:*) Bash(date:*) Write(.claude/release-notes/*)
argument-hint: '[tag]'
arguments: tag
model: opus
effort: xhigh
context: fork
agent: general-purpose
---

# @epam/ai-dial-typescript-sdk — release-notes enhancer

The `.github/workflows/release.yml` pipeline (`epam/ai-dial-ci` `node_release.yml`) cuts a GitHub release on every push to `development`/`release-*`, with notes built from commit/PR titles. Titles in this repo mostly already follow Conventional Commits without a scope (`feat: add user limits and usage endpoints`, `fix: simplify operation parameter location type inference in SDK types`, `chore: bump the ai-dial-ci group with 3 updates`) — see `gh pr list --state merged`. The raw notes still carry noise that isn't worth a consumer's time: the `type:` prefix repeated verbatim, `chore(deps...)`/dependabot bumps for `ai-dial-ci`/`github_actions` groups, lockfile-only chores, and internal repo-setup one-offs (`chore: prepare repo to public`, `chore: use trust publishing for npm registry`). This skill reproduces the editorial pass a maintainer would do by hand before publishing.

You are running in a forked, isolated context. Read and research freely — only the final summary you return reaches the main conversation. All file writes happen in this fork; the draft lands at `.claude/release-notes/<tag>-draft.md`.

## When to use

- "Enhance the release notes for `0.3.0`"
- "Look at the latest release notes and refine them"
- "The CI just published `<tag>`, make it readable"
- "Polish the release notes for the current tag"

Do **not** trigger on requests like "what changed in 0.2.0?" — that is a recall question, not a notes-editing task.

## Inputs

`tag` = `$tag` — the GitHub release tag to enhance (e.g. `0.3.0`). If empty, pick the most recent tag from `gh release list --limit 5` and confirm with the user before editing.

## First release / merge-base mode caveat

When there's no previous stable tag, `changelog-mode` is `merge-base` and the raw notes cover the _entire_ git history since project inception, including the first commit(s). Do not classify by commit message alone here — a boring or throwaway-sounding first commit (`init commit`, `innit commit`, `initial setup`) is exactly where a huge, product-defining diff hides, since it predates any commit-message conventions. Before dropping _any_ early commit as bootstrapping noise, run `git show --stat <hash>` and skim what actually changed. If it introduced the initial OpenAPI spec, generated client, or README describing the SDK's API surface, that is the release's headline feature, not noise — lead the `Features` section with a summary bullet built from that diff/README rather than skipping straight to the first `feat:`-labeled commit.

## Workflow

### 1. Resolve target and reference styles

1. `gh release view <tag> --json body,name,tagName` — capture the raw CI notes.
2. `gh release list --limit 10` — locate the previous tag.
3. `gh release view <prev-tag> --json body` — style anchor, if a previous release exists. Match its terseness; one line per bullet. If this is the first release, there is no predecessor to match — just apply the rules below.
4. `git log <prev-tag>..<tag> --oneline` — full commit list for the range, to spot commits the CI dropped or squashed oddly.

### 2. Pull source context for each bullet

For every bullet in the raw notes:

1. Parse out the trailing `(#<PR>)`.
2. `gh pr view <PR> --json title,body,labels` — read the PR body for the _why_; the title alone is often just the conventional-commit subject line.
3. For a change that touches `open_api_core.yaml` / `openapi.bundle.yaml` (this is an OpenAPI-generated SDK — most `feat`/`fix` entries do), check `gh pr diff <PR>` or `git show` for which endpoints, operations, or schema types actually changed. The PR title alone ("add file-config, skill-grouping, and external-service endpoints") often undersells what's new — confirm the concrete API surface before writing the bullet.
4. For bullets without a PR number, find the commit with `git log <prev-tag>..<tag> --oneline | grep -i <keywords>` and `git show <hash>` — fold into a related entry rather than leaving standalone.

**Grouping related PRs:** When multiple PRs are clearly follow-ups on the same endpoint group or feature (e.g. adding endpoints, then adding a missing field to the same schema), fold them into one bullet with all PR refs at the end: `(#27, #29)`.

### 3. Classify each bullet

The raw CI partition (by commit `type:`) is a reasonable starting point here since PR titles are already conventional, but still needs a consumer-impact pass:

| Signal in raw title/commit                                                                                                        | Where it belongs   | Rule                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------- |
| `feat: ...`                                                                                                                       | `Features`         | New endpoints, operations, schema fields, SDK capabilities.     |
| `fix: ...`                                                                                                                        | `Fixes`            | Corrected types, inference, generated client behavior.          |
| `feat`/`fix` touching only `openapi.bundle.yaml`/`schema.ts` regen                                                                | `Features`/`Fixes` | Keep — this **is** the product surface for an SDK.              |
| Security-relevant dependency bump (CVE, `dompurify`-style)                                                                        | `Other`            | Consumer-relevant even though it's a `chore`.                   |
| `chore: bump the ai-dial-ci group ...`                                                                                            | **Drop**           | CI-only dependency group, zero consumer impact.                 |
| Dependabot bump for `github_actions` label                                                                                        | **Drop**           | CI-only.                                                        |
| `chore: update lock`, `chore: update eslint ...`                                                                                  | **Drop**           | Dev-tooling/lockfile churn, not consumer-visible.               |
| One-off repo-setup chores (`prepare repo to public`, `use trust publishing for npm registry`, `remove rewrite of publish script`) | **Drop**           | Internal to this repo's own release plumbing, not SDK behavior. |
| `[skip ci]` items that are infra-only                                                                                             | **Drop**           | Same as above.                                                  |

If unsure whether to keep a bullet: _would someone importing `@epam/ai-dial-typescript-sdk` care?_ If no, drop it.

**Flag as `[Breaking]`** — changes that require consumer code changes:

- Removed or renamed exported types/operations (e.g. "remove deprecated ones" in a `feat`/`fix` PR).
- Changed the shape of a generated client method's params or return type.
- Renamed a schema type that consumers import directly.

There is currently no `CHANGELOG.md` or migration-guide directory in this repo. If a bullet is `[Breaking]`, still flag it — semantic-release/`node_release.yml` uses commit type + breaking-change footers to decide the version bump, so a mismatch between a `[Breaking]` bullet and the actual version bump (e.g. tag went `0.2.0` → `0.2.1` for a breaking change) is worth surfacing as an open question rather than silently fixed.

### 4. Rewrite each kept bullet

Raw form: `* type: description (#NNN)`. Rewrite to:

```
* <Active-voice description of what changed> — <brief why-it-matters, only if non-obvious> (#<PR>)
```

Rules in order of importance:

1. **One line per bullet.** No multi-paragraph descriptions.
2. **Drop the conventional prefix** (`feat:`, `fix:`, `chore:`). Replace with prose; don't just re-capitalize the raw subject.
3. **Name the concrete API surface**, not the meta-description: prefer "adds `GET /v1/limits` and `GET /v1/usage` endpoints" over "add user limits and usage endpoints" only when the PR diff makes the concrete paths/operations clear — otherwise keep the PR's own framing rather than guessing.
4. **Use a `—` em-dash for an optional "why" clause**, not a hyphen or colon. Omit it when the bullet is already self-explanatory (common for straightforward endpoint additions).
5. **Backticks for code identifiers**: operation IDs, type names, path parameters, header names (e.g. `` `X-DIAL-CACHE-POLICY` ``).
6. **Preserve PR refs at the end** in `(#<PR>)` form. For grouped entries list all PRs: `(#27, #29)`.
7. **Prefix with `[Breaking]`** for breaking changes.
8. **Quote CVE IDs verbatim** for security upgrades kept in `Other`.

#### Example transformations (this project's patterns)

```
# Dropping the conventional prefix, keeping it factual:
- * feat: add X-DIAL-CACHE-POLICY header for prompt-caching deployments (#34)
+ * Adds the `X-DIAL-CACHE-POLICY` header for prompt-caching deployments (#34)

# Naming the concrete surface once confirmed from the diff:
- * feat: add user limits and usage endpoints (#35)
+ * Adds endpoints for retrieving per-user limits and usage data (#35)

# Fix, active voice, no forced "why":
- * fix: simplify operation parameter location type inference in SDK types (#16)
+ * Simplifies parameter-location type inference for generated SDK operations (#16)

# Breaking change:
- * feat: Enhance DIAL_SDK interface with new operations and remove deprecated ones (#24)
+ * [Breaking] `DIAL_SDK` interface gains new operations; deprecated operations are removed (#24)

# Dropping CI-only dependency noise:
- * chore: bump the ai-dial-ci group with 3 updates (#30)  ← drop
- * chore: bump the ai-dial-ci group across 1 directory with 3 updates (#25)  ← drop

# Dropping one-off repo-setup chores:
- * chore: use trust publishing for npm registry (#10)  ← drop
- * chore: prepare repo to public (#5)  ← drop

# Keeping a real dependency bump only if security-relevant:
- * chore: bump js-yaml and @redocly/openapi-core (#26)
  → keep only if `gh pr view #26` shows a CVE/security advisory driving it; otherwise drop as routine chore.
```

### 5. Save the draft

Write **`.claude/release-notes/<tag>-draft.md`** — the final notes, ready to paste into the GitHub release body. No preamble or commentary — just headings and bullets.

Optionally also write **`.claude/release-notes/<tag>-editorial-notes.md`** when there's something worth surfacing: grouping decisions, items dropped with a one-line reason, open questions (e.g. a `[Breaking]` bullet whose version bump looks wrong, an ambiguous chore, a PR whose diff didn't match its title).

### 6. Verify nothing was pushed to GitHub

This skill **never** runs `gh release edit`, `gh release create`, or any write operation against the repo. Drafts only.

## Output format

The file saved to `.claude/release-notes/<tag>-draft.md` follows this shape:

```markdown
## Features

- <one bullet per change or group>

---

## Fixes

- <one bullet per change>

---

## Other

- <only consumer-relevant items, e.g. security dependency bumps>
```

Omit any section that has no entries. Section order: `Features` → `Fixes` → `Other`. Breaking changes appear at the **top of `Features`** (or `Fixes` if it's purely a behavioral correction), prefixed with `[Breaking]`.

## Return to the main conversation

Return a short summary — five lines or fewer:

- The draft path (`.claude/release-notes/<tag>-draft.md`).
- Counts of bullets per section after enhancement and grouping.
- Groupings that happened, if any.
- Items dropped (count, with one example).
- Whether any breaking changes were found, and whether the actual version bump for `<tag>` matches (major bump expected for breaking changes).
- Any open questions (a PR whose diff didn't match its title, an ambiguous dependency bump).

Example:

> Drafted `.claude/release-notes/0.3.0-draft.md`. 3 Features, 1 Fix, 0 Other. No grouping needed. Dropped 4 items (2 `ai-dial-ci` dependency bumps, 1 lockfile chore, 1 repo-setup chore). No breaking changes detected. No open questions.

## Safety rails

- **Never edit GitHub.** No `gh release edit`, no `gh release create`. Drafts only.
- **Never invent items.** Every kept bullet maps to a PR or a commit hash in the range.
- **Never silently drop a PR reference.** The bullet ends with the canonical `(#<PR>)` ref.
- **Don't guess at concrete API surface** (paths, operation IDs) without checking the PR diff or `openapi.bundle.yaml` change — a wrong endpoint name in release notes is worse than a vaguer-but-correct one.
- **Match the terseness of the predecessor's notes**, if one exists.

## Maintenance

If you notice a pattern in the raw CI notes that this skill doesn't handle (a new commit-type scope, a recurring rewrite the user keeps requesting, breaking-change conventions once a `CHANGELOG.md` is introduced), surface it in your return summary and offer to update this `SKILL.md`. The user can confirm before any edit lands.
