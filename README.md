# Claude Code Starter Kit

A minimal template for getting a new project set up well with [Claude Code](https://claude.com/claude-code):
a best-practices `CLAUDE.md`, one example skill, and pointers to Anthropic's published skills so you
get useful capabilities working on day one. This kit isn't tied to any particular language or
framework — it's meant to be forked into a fresh project.

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

1. Clone/fork this repo (or copy `CLAUDE.md` and `.claude/` into an existing project).
2. Open the project in Claude Code and run `/init` if you want Claude to scan your actual codebase
   and draft a starting point — then replace the example content in `CLAUDE.md` with whatever
   `/init` finds (or with your own knowledge of the project). Don't just keep `/init`'s raw output;
   treat it as a first draft.
3. Prune ruthlessly. For every line, ask: *"would removing this cause Claude to make mistakes?"*
   If not, cut it.

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

## Beyond this kit

A few other Claude Code features are worth knowing about, even though this starter kit doesn't
configure them:

- **Subagents** — specialized assistants with their own context, defined in `.claude/agents/`.
- **Hooks** — deterministic scripts that run at specific points (e.g. lint after every edit),
  configured in `.claude/settings.json`.
- **Plugins** — bundles of skills/hooks/agents/MCP servers, browsable with `/plugin`.

See the [official best practices guide](https://code.claude.com/docs/en/best-practices) for more.
