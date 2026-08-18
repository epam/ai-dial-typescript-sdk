---
name: git-ship
model: claude-haiku-4-5-20251001
context: fork
effort: low
allowed-tools: Bash(git:*), Bash(gh:*), Bash(grep:*), Read
arguments: ticket
argument-hint: '[ticket]'
description: >
  Use this skill whenever the user wants to commit, push, or ship changes in this repository.
  Triggers include: "commit changes", "push my changes", "ship it", "commit and push", "create a branch and commit",
  "make a PR", "open a pull request", "create draft PR", or any variation of committing/pushing work.
  Always use this skill when the user mentions committing — even casually — as it handles the full cycle:
  branch → add → commit → push → (optionally) PR, with Conventional Commits format.
---

# Git Ship Skill

Full cycle for **ai-dial-typescript-sdk**: checkout new branch from `development` → stage → commit
(Conventional Commits) → push → optional PR. Base branch is **`development`**.

Supporting files (read them when the step says so — don't inline everything up front):

- `.claude/skills/git-ship/examples/commit-messages.md` — allowed type table, message + branch
  examples drawn from real repo history.
- `.claude/skills/git-ship/examples/pr-body.md` — PR body template and `gh pr create` usage.

---

## Step 0 — Detect mode (new branch vs. update existing) — and a safety rail

```bash
git rev-parse --abbrev-ref HEAD                 # current branch
gh pr view --json number,url,state 2>/dev/null  # open PR for current branch (if any)
```

- **New-branch mode** — current branch is `development` (or another base branch), or there's no
  PR for it. Run the full cycle: Steps 1–6.
- **Update-existing mode** — you're already on a feature branch **and** it has an open PR (or the
  user says "push to the existing PR" / "update my PR"). **Do not** create a new branch and **do
  not** run `gh pr create`. Stay on the current branch, then:
  1. Step 2 — review the changes.
  2. Step 4 — generate the commit message (reuse the same type/scope as the existing PR's history).
  3. Step 5 — **skip the `git checkout` lines**; just `git add` → `git commit` → `git push`.
  4. Skip Step 6's `gh pr create`. Pushing updates the open PR automatically. Only refresh the body
     (`gh pr edit --body`) if the user asks or the description is stale/missing.
  5. Step 7 — report the existing PR link, not a new one.

**Safety rail — never target a `release-*` branch.** In this repo, pushing to any branch matching
`release-[0-9]+\.[0-9]+` triggers `.github/workflows/release.yml`, which builds, versions, and
**publishes the package to npm** and cuts a GitHub release (see the `release-notes` skill for
context on that pipeline). If the current branch is a `release-*` branch, or the user asks to base
work on one, stop and confirm explicitly — this skill's default flow assumes `development` as the
base and feature/fix branches only.

---

## Step 1 — Gather required context

- **Ticket / issue number** — use the `ticket` argument if passed. Else look in conversation
  context. If still not found, proceed without one — this repo's PR template makes the `fixes #`
  line optional (see `examples/pr-body.md`), unlike repos that require an issue reference in the
  title.
- **Draft PR?** — if the user said "draft", note it for Step 6.

> This skill runs in a forked context (`context: fork`), so it does **not** see the main
> conversation. Prefer passing arguments: `/git-ship 42`.

---

## Step 2 — Understand the changes

```bash
git status
git diff HEAD
```

If there are no changes at all — report and stop.

---

## Step 3 — Determine commit type (and scope, rarely)

Read `.claude/skills/git-ship/examples/commit-messages.md` for the allowed-type table (CI-enforced:
`feat`, `fix`, `docs`, `test`, `ci`, `chore` — no `refactor` or `style`). This repo is a single npm
package, not a monorepo, so a scope is **rarely used** in real history — omit it unless it
meaningfully disambiguates (e.g. `chore(deps): …`).

---

## Step 4 — Generate commit message

Format: `<type>: <short description>` or, only when a scope earns its place,
`<type>(<scope>): <short description>`.

Analyze the diff to pick the most accurate type and write a concise, imperative description.
Breaking change → add `!` before the colon (e.g. `feat!: …`). Do **not** append `(Issue #…)` to the
title — this repo links issues in the PR body instead (see Step 6), never in the commit/PR title.

---

## Step 5 — Execute

```bash
# 1. Create branch from base (skip in update-existing mode)
git checkout development
git pull origin development
git checkout -b <type>/<short-slug>

# 2. Stage changes
git add <files>          # prefer explicit paths over `git add .`/`-A`

# 3. Commit
git commit -m "<type>: <description>"

# 4. Push
git push origin <type>/<short-slug>
```

If push fails (no permissions, rejected, conflict) — **report the full output and stop**. Do not
force push or rebase automatically.

---

## Step 6 — Pull Request (if requested)

If the user requested a PR or draft PR, **read `.claude/skills/git-ship/examples/pr-body.md`** and
follow the repo's actual template (`.github/pull_request_template.md`) — fill every placeholder,
then run the `gh pr create` command shown there with `--base development`.

---

## Step 7 — Summary

Always finish with a concise confirmation:

```
Branch:  <type>/<short-slug>
Commit:  <type>: <description>
Push:    ✅ succeeded  /  ❌ failed — <reason>
PR:      <link> (created)  /  <link> (updated existing)  /  skipped
```
