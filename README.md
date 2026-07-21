# Claude Code Starter Kit

A starter kit that walks you all the way from a fresh Claude Code install to a real deploy: a
best-practices `CLAUDE.md`, one example skill, pointers to Anthropic's published skills, a tiny
dependency-free example app, and an SSH deploy flow (`docs/deploying.md`) to put it on a server.
Fork it, swap the example app for your real project, and keep the guide/scripts as it grows.

## Getting started / verify your setup

Before touching anything in this repo, confirm Claude Code itself is installed and authenticated.

**1. Install** (native install is recommended and auto-updates in the background):

```bash
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash
```

```powershell
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

Homebrew (`brew install --cask claude-code`) and WinGet (`winget install Anthropic.ClaudeCode`) also
work, but don't auto-update — you'll need to `brew upgrade` / `winget upgrade` yourself.

**2. Authenticate** — pick whichever matches how you're using it:

- **Subscription login (recommended for individual use)**: run `claude` and follow the browser
  login prompt (Pro, Max, Team, or Enterprise account). Use `/login` inside a session to switch
  accounts later.
- **API key (Console access, CI, or scripting)**: create a key in the
  [Claude Console](https://platform.claude.com), then:
  ```bash
  export ANTHROPIC_API_KEY=sk-ant-...
  ```
  Gotcha: if you also have an active subscription login, a set `ANTHROPIC_API_KEY` takes
  precedence once approved. Run `unset ANTHROPIC_API_KEY` to fall back to your subscription, and
  check `/status` inside a session to see which credential is actually active.

**3. Verify it works** — run a quick smoke test:

```bash
claude -p "which model are you, and what's the current working directory?"
```

A response that correctly names the model and directory confirms install + auth are both working.
Or start interactively with `claude` and ask `what does this project do?` — that also doubles as
your first real read of this repo's `CLAUDE.md`.

## Using this template

Try it as-is first: run the example app locally (`cd app && npm start`, then open
http://localhost:3000) and skim `docs/deploying.md` — see the whole loop working before you
change anything.

Then make it yours:

1. Clone/fork this repo (or copy `CLAUDE.md` and `.claude/` into an existing project).
2. Delete `app/` once you have your own codebase — it's a stand-in, not a dependency.
3. Open the project in Claude Code and run `/init` if you want Claude to scan your actual codebase
   and draft a starting point — then replace the example content in `CLAUDE.md` with whatever
   `/init` finds (or with your own knowledge of the project). Don't just keep `/init`'s raw output;
   treat it as a first draft.
4. Prune ruthlessly. For every line, ask: *"would removing this cause Claude to make mistakes?"*
   If not, cut it.
5. Adapt `scripts/deploy.sh` and `deploy/myapp.service` to your app's entry point, paths, and
   service name — the deploy mechanics (rsync + systemd) stay the same even after the app changes.

### What belongs in CLAUDE.md

| ✅ Include | ❌ Exclude |
|---|---|
| Bash commands Claude can't guess | Anything Claude can figure out by reading code |
| Code style rules that differ from defaults | Standard language conventions Claude already knows |
| Testing instructions and preferred test runners | Detailed API documentation (link to docs instead) |
| Repo etiquette (branch naming, PR conventions) | Information that changes frequently |
| Architectural decisions specific to your project | Long explanations or tutorials |
| Developer environment quirks (required env vars) | File-by-file descriptions of the codebase |
| Common gotchas or non-obvious behaviors | Self-evident practices like "write clean code" |

Keep `CLAUDE.md` itself short — it's loaded on every session. For domain knowledge or workflows
that only come up sometimes, add a skill instead (see below); Claude loads those on demand.

## Skills

This repo ships one example skill, [`changelog-entry`](.claude/skills/changelog-entry/SKILL.md),
so you can see the `SKILL.md` format working locally. Run `/skill-creator` (see below) or write a
new folder under `.claude/skills/` to add your own.

For broader capabilities, Anthropic publishes a set of ready-made skills at
[anthropics/skills](https://github.com/anthropics/skills). Install what you need through the
plugin marketplace:

```
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

| Category | Skill | What it does | License |
|---|---|---|---|
| Document | `docx` | Create/edit Word documents | Source-available |
| Document | `pdf` | Extract from and generate PDFs | Source-available |
| Document | `pptx` | Create/edit PowerPoint presentations | Source-available |
| Document | `xlsx` | Create/analyze Excel spreadsheets | Source-available |
| Creative/design | `algorithmic-art` | Generative/algorithmic art | Apache 2.0 |
| Creative/design | `canvas-design` | Visual layout design on a canvas | Apache 2.0 |
| Creative/design | `theme-factory` | Generate cohesive visual themes | Apache 2.0 |
| Creative/design | `frontend-design` | UI/frontend design guidance | Apache 2.0 |
| Creative/design | `brand-guidelines` | Apply brand/style guidelines | Apache 2.0 |
| Dev/technical | `mcp-builder` | Scaffold MCP servers | Apache 2.0 |
| Dev/technical | `webapp-testing` | Test web apps end-to-end | Apache 2.0 |
| Dev/technical | `web-artifacts-builder` | Build web-based artifacts | Apache 2.0 |
| Dev/technical | `claude-api` | Work with the Claude API/SDK | Apache 2.0 |
| Dev/technical | `skill-creator` | Scaffold new skills | Apache 2.0 |
| Enterprise/comms | `internal-comms` | Draft internal communications | Apache 2.0 |
| Enterprise/comms | `doc-coauthoring` | Collaborative document drafting | Apache 2.0 |
| Enterprise/comms | `slack-gif-creator` | Generate GIFs for Slack | Apache 2.0 |

The four document skills (`docx`/`pdf`/`pptx`/`xlsx`) are source-available reference
implementations of what powers Claude's built-in document capabilities, not open source — install
them rather than copying their code.

## Deploying via SSH

This kit teaches one concrete, boring-on-purpose deploy path: `rsync` the app to a server, run it
under `systemd`. No Docker, no orchestration, no build pipeline required to get started.

```bash
# One-time on the server — full walkthrough in docs/deploying.md:
#   - create a deploy user, install Node >=18
#   - copy deploy/myapp.service to /etc/systemd/system/, edit paths, `systemctl enable`
#   - (optional) copy deploy/nginx.conf.example for a :80/:443 reverse proxy + TLS

# Every deploy after that:
REMOTE_HOST=example.com REMOTE_USER=deploy ./scripts/deploy.sh
```

`scripts/deploy.sh` is a manual, human-run script by design — Claude Code won't run it unless you
explicitly ask, since it touches a real server. See `docs/deploying.md` for the full guide,
including firewall/security notes and what to do when a deploy fails.

## Beyond this kit

A few other Claude Code features are worth knowing about, even though this starter kit doesn't
configure them:

- **Subagents** — specialized assistants with their own context, defined in `.claude/agents/`.
- **Hooks** — deterministic scripts that run at specific points (e.g. lint after every edit),
  configured in `.claude/settings.json`.
- **Plugins** — bundles of skills/hooks/agents/MCP servers, browsable with `/plugin`.

See the [official best practices guide](https://code.claude.com/docs/en/best-practices) for more.
