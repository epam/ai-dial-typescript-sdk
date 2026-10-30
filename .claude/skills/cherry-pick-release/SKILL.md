---
name: cherry-pick-release
effort: low
allowed-tools: Bash(git:*), Read, AskUserQuestion
arguments: release
argument-hint: '[release-branch, e.g. release-0.1]'
description: >
  Use this skill whenever the user wants to bring changes from `development` into a release branch
  of this repository by cherry-picking. Triggers include: "cherry-pick into release", "backport to
  release", "sync release with development", "port development changes to release-0.1", or any
  variation of copying commits from `development` onto a `release-*` branch. Asks which release branch to target, finds every `development` commit that is not yet in
  it, cherry-picks them with `-x` oldest-first, and pushes directly to the release branch only after
  explicit confirmation.
---

# Cherry-pick Release Skill

Copies every commit from **`development`** that is missing on a chosen **`release-X.Y`** branch
directly onto that branch (no PR), preserving the repo's convention of `git cherry-pick -x` so each
release commit carries a `(cherry picked from commit <sha>)` trailer.

> ⚠️ Pushing to any `release-[0-9]+.[0-9]+` branch triggers `.github/workflows/release.yml`, which
> bumps the version, **publishes the package to npm** and cuts a GitHub release. The push in Step 6
> is therefore never done without an explicit "yes" from the user in this run.

---

## Step 0 — Preflight

```bash
git status --porcelain
git rev-parse --abbrev-ref HEAD
git fetch origin --prune
```

- Working tree not clean → report and stop. Don't stash on the user's behalf.
- Remember the current branch so you can return to it in Step 7.

---

## Step 1 — Choose the release branch (always ask if not given)

If the `release` argument was passed (e.g. `/cherry-pick-release release-0.1`), use it after
checking it exists on `origin`. Otherwise list candidates and **ask the user** with
`AskUserQuestion` — never guess, even if only one branch exists:

```bash
git branch -r --list 'origin/release-*' --sort=-committerdate --format='%(refname:short)'
```

Only branches matching `release-<major>.<minor>` are valid targets (that's what `release.yml`
watches). Ignore look-alikes such as `release/0.1.1`. Put the most recently updated branch first and
mark it "(Recommended)".

---

## Step 2 — Find the commits missing on the release branch

Use the remote refs so a stale local branch can't skew the result:

```bash
git log --reverse --no-merges --format='%H %s' origin/release-X.Y..origin/development
```

That range is too wide (cherry-picked commits have new SHAs), so drop every commit that is already
present on the release branch by **either** of these checks:

1. **Trailer match** — its SHA appears in a `-x` trailer on the release branch:
   ```bash
   git log origin/release-X.Y --format=%B | grep -oE 'cherry picked from commit [0-9a-f]{40}' | awk '{print $5}'
   ```
2. **Patch match** — `git cherry` marks it with `-` (same patch-id already applied):
   ```bash
   git cherry origin/release-X.Y origin/development
   ```

Also skip CI-generated commits whose subject contains `[skip ci]` (e.g. `[skip ci] Update version`).

As a last safety net, if a remaining commit's subject (including its `(#NN)` PR number) exactly
matches a subject already on the release branch, don't silently drop it — list it separately as
"probably already ported (subject match)" so the user decides.

If nothing remains → report "release-X.Y is up to date with development" and stop.

---

## Step 3 — Confirm the list

Show the user the commits that will be picked, oldest first, e.g.:

```
Target: release-0.1   (from development)
  1. 7908a32 feat: sync open_api_core.yaml ... (#57)
  2. b22d8a9 fix(ci): run PR title check on synchronize ... (#58)
Probably already ported (subject match):
  - eeaa6d8 ci(deps): bump source-map-js ... (#51)
```

Ask (via `AskUserQuestion`) whether to pick all of them or exclude some. Default is **all** — that's
what this skill is for — but the user may want to leave out e.g. `website/` or dependabot bumps.

---

## Step 4 — Cherry-pick

```bash
git checkout release-X.Y 2>/dev/null || git checkout -b release-X.Y origin/release-X.Y
git merge --ff-only origin/release-X.Y      # local branch must match the remote exactly
git cherry-pick -x <sha1> <sha2> ...        # oldest first, in the order from Step 3
```

If `--ff-only` fails, the local release branch has diverged from `origin` — report and stop.

**On conflict** — stop immediately. Do **not** resolve conflicts on your own, do not use
`-X theirs/ours`, do not `--skip`. Report:

- which commit conflicted (`git status`, conflicted file list),
- which commits were already applied and which are still pending,

and let the user choose: resolve manually and then `git cherry-pick --continue`, or abort with
`git cherry-pick --abort` (which restores the branch to its pre-pick state). If the user resolves
and continues, resume with the remaining commits.

Empty pick (change already present) → `git cherry-pick --skip` is fine here; mention it in the
summary.

---

## Step 5 — Verify before pushing

```bash
git log --oneline origin/release-X.Y..HEAD
git diff --stat origin/release-X.Y..HEAD
```

Show this to the user. If `open_api_core.yaml` or `src/` changed, it's reasonable to suggest (not
force) running `npm run build` / `npm test` before pushing.

---

## Step 6 — Push (explicit confirmation required)

Ask with `AskUserQuestion`: "Push N commits directly to `release-X.Y`? This triggers the npm
release." Only on an explicit yes:

```bash
git push origin release-X.Y
```

Never `--force`. If the push is rejected (branch protection, non-fast-forward, permissions) —
report the full output and stop. Don't rebase or retry automatically. The local commits stay on the
local `release-X.Y` so the user can decide what to do next.

If the user declines, leave the commits local and say so.

---

## Step 7 — Return and summarize

Switch back to the branch from Step 0 (`git checkout <original-branch>`), then finish with:

```
Release:  release-X.Y
Picked:   N commits  (skipped: M already present, K excluded by user)
Push:     ✅ pushed — release workflow triggered  /  ⏸ not pushed (local only)  /  ❌ failed — <reason>
```
