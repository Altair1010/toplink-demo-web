# P0 Repository and GitHub Baseline

**Captured:** 2026-08-30 23:13 +07:00  
**Canonical repository:** `https://github.com/Altair1010/toplink-demo-web`  
**Resolved Git repository root:** `F:\Codex\Yvien Hotlink Website`  
**Application directory:** `F:\Codex\Yvien Hotlink Website\app-demo`  
**P0 worktree:** `F:\Codex\yvien-v1-foundation`

## Resolution

The expected `app-demo` directory is the application working directory but is not a separate Git
repository. `git rev-parse --show-toplevel` resolves the repository to
`F:\Codex\Yvien Hotlink Website`.

## Pre-mutation local state

The primary checkout was clean on `archive/no-merge-snapshot` at
`a6babb5b85dbd220460c45b2bb30e194c5bd58af`, tracking the matching origin branch. It had no staged,
unstaged or untracked files. Existing user work was therefore not stashed, reset, moved or
overwritten.

Existing worktrees before P0:

| Worktree                         | Branch                      | HEAD                                       |
| -------------------------------- | --------------------------- | ------------------------------------------ |
| `F:\Codex\Yvien Hotlink Website` | `archive/no-merge-snapshot` | `a6babb5b85dbd220460c45b2bb30e194c5bd58af` |
| `F:\Codex\yvien-main`            | `main`                      | `b98dfd063f6bc8f63e43a65bb8cfe617c750c111` |

P0 added a third isolated worktree at `F:\Codex\yvien-v1-foundation` on
`chore/v1-foundation`. No branch switching was performed in either existing worktree.

## Verified remote state

`git fetch origin --prune --tags` exited 0. After the fetch:

| Ref                         | SHA                                        | Relationship                |
| --------------------------- | ------------------------------------------ | --------------------------- |
| package historical baseline | `b98dfd063f6bc8f63e43a65bb8cfe617c750c111` | provenance                  |
| `origin/main`               | `b98dfd063f6bc8f63e43a65bb8cfe617c750c111` | verified execution baseline |
| local `main`                | `b98dfd063f6bc8f63e43a65bb8cfe617c750c111` | `0` ahead, `0` behind       |
| P0 branch start             | `b98dfd063f6bc8f63e43a65bb8cfe617c750c111` | exact branch point          |

There is no baseline drift: the package provenance SHA and current GitHub `origin/main` SHA match.

The configured fetch/push URL is `https://github.com/Altair1010/toplink-demo-web.git` and matches the
canonical repository. `gh repo view` verified:

- owner/name: `Altair1010/toplink-demo-web`;
- URL: `https://github.com/Altair1010/toplink-demo-web`;
- default branch: `main`;
- repository is active and currently `PUBLIC`.

Remote branches at capture: `archive/no-merge-snapshot`, `feat/dropbox-motion-system`, `main`, and
`refactor/skin-layer-motion-token`. Existing tag: `humanizer-h7-final-20260829`.

## Governance findings

- The package proposes a pre-V1 archive tag only after a human gate. P0 did not create a tag.
- D-006 intends the production repository to become private, but this is a consequential external
  mutation and the repository is still public. P0 only records the drift.
- GitHub Pages currently deploys from pushes to `main`; no push to `main` occurred.
- The existing archive branch is provenance only and is not a V1 merge base. The verified V1 base is
  `origin/main`.

## Reproduction commands

```powershell
git -c safe.directory='F:/Codex/Yvien Hotlink Website' fetch origin --prune --tags
git -c safe.directory='F:/Codex/Yvien Hotlink Website' rev-parse origin/main
git -c safe.directory='F:/Codex/Yvien Hotlink Website' rev-list --left-right --count main...origin/main
git -c safe.directory='F:/Codex/Yvien Hotlink Website' worktree list --porcelain
gh repo view Altair1010/toplink-demo-web --json nameWithOwner,url,visibility,defaultBranchRef,isArchived,isPrivate
```
