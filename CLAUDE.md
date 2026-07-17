# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

> **This is a starter-kit template.** It ships with one small, real example app (`app/`) so the
> whole journey — build, test, deploy over SSH — actually works out of the box instead of being
> described in the abstract. When you fork this for your own project, delete `app/` and replace
> everything below with the real details of *your* project. See `README.md` for the full ✅/❌
> guide on what belongs here versus what to leave out.

## Project Overview

The example app in this kit: a single-page HTML app (`app/public/index.html`) served by a
dependency-free Node `http` server (`app/server.js`). It exists to give the deploy guide
(`docs/deploying.md`) something real to ship over SSH — it's intentionally trivial, not a
template for how *your* app should be architected.

## Development Commands

```bash
# Run the app locally
cd app && npm start        # or: node app/server.js
# then open http://localhost:3000

# Run tests (Node's built-in test runner — no test framework dependency)
cd app && npm test

# Deploy to a server over SSH (one-time server setup: see docs/deploying.md)
REMOTE_HOST=example.com REMOTE_USER=deploy ./scripts/deploy.sh
```

## Code Style & Conventions

- The example app deliberately has zero npm dependencies — built-in `node:http`/`node:fs` only —
  so a fresh fork works without `npm install`. Don't add dependencies to `app/` without a reason.
- The frontend is one static HTML file with inline CSS/JS: no build step, no framework, so it
  still renders even if the Node server behind it isn't running (see the fallback status text in
  `app/public/index.html`).

## Key Files & Directories

```
app/server.js              # Dependency-free Node http server: serves app/public/, exposes /api/health
app/public/index.html      # Static SPA — renders standalone even without the Node server running
app/server.test.js         # node:test suite for server.js
scripts/deploy.sh          # rsync app/ to a server over SSH, restart the systemd service
deploy/myapp.service       # systemd unit template — copy to the server, edit paths/user
deploy/nginx.conf.example  # optional reverse proxy config (:80/:443 -> node on :3000)
docs/deploying.md          # full SSH deployment guide: one-time server setup through rollback
.claude/skills/            # changelog-entry example skill
```

## Environment Variables

```
PORT=3000   # port the Node server listens on, both locally and in deploy/myapp.service
```

## Testing

`app/server.test.js` uses Node's built-in test runner (`node --test`) — no test framework
dependency to install. Run it with `cd app && npm test`.

## Repo Etiquette

- Branch names: `<initials>/<short-description>` (e.g. `jd/fix-login-timeout`)
- Commit messages: imperative mood, one line summary + optional body
- Open PRs against `main`; squash-merge only

## Notes for Claude

- Read relevant files before making changes
- Prefer editing existing files over creating new ones
- Do not commit unless explicitly asked
- Ask before taking destructive or irreversible actions
- `scripts/deploy.sh` touches a real server — it's a manual, human-run step by design; never run
  it unprompted
- For domain knowledge or workflows that only come up sometimes, add a skill under
  `.claude/skills/` instead of growing this file — see `.claude/skills/changelog-entry/SKILL.md`
  for an example, and `README.md` for how to pull in Anthropic's published skills
- Large or unrelated context (a linked doc, another file's contents) can be pulled in with
  `@path/to/file` instead of pasting it here
