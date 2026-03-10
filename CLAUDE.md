# CLAUDE.md

## Project Overview

[PROJECT_NAME] is a [brief description: what it does, who it's for, and why it exists].

**Primary language**: [Language/Runtime]
**Purpose**: [production app / library / tool / internal service]
**Status**: [active development / stable / maintenance mode]

---

## Communication Style

- **Language**: All responses in [English / your language]
- **Tone**: Be direct and concise. Avoid unnecessary preamble.
- **Code comments**: Write them as if explaining to a future maintainer, not a beginner.
- **When uncertain**: Say so explicitly rather than guessing.

---

## Core Behaviors

**Always:**
- Read existing code before writing new code
- Prefer editing existing files over creating new ones
- Keep changes minimal and focused — don't refactor unrelated code
- Run tests after making changes if a test command is available

**Never:**
- Add unrequested features or "improvements"
- Change unrelated files in the same edit
- Use placeholder comments like `// TODO: implement this`
- Leave debugging code (console.log, print statements) in commits

---

## Development Commands

```bash
# Install dependencies
[install command]

# Start development server
[dev command]

# Run tests
[test command]

# Run a single test file
[single test command]

# Build for production
[build command]

# Lint / format
[lint command]
```

---

## Architecture

### Directory Structure

```
[root]/
├── [src or app]/       # [description]
├── [tests]/            # [description]
├── [config]/           # [description]
└── [docs]/             # [description]
```

### Key Patterns

- **[Pattern name]**: [Brief explanation of the main architectural pattern used]
- **[State management]**: [How application state is handled]
- **[Data layer]**: [How data is fetched / stored / mutated]

---

## Code Style

- **Indentation**: [tabs / 2 spaces / 4 spaces]
- **Quotes**: [single / double]
- **Semicolons**: [yes / no]
- **Line length**: [80 / 100 / 120] characters max
- **File naming**: [kebab-case / camelCase / snake_case]
- **Component naming**: [PascalCase]
- **Function naming**: [camelCase / snake_case]

Linting is enforced via [ESLint / Prettier / Ruff / etc.] — always run before committing.

---

## Testing

### Philosophy

Test behavior, not implementation. Tests should survive internal refactors.

### What to test

- Public API surface of modules
- Edge cases and error states
- Integration between major components

### What not to test

- Internal implementation details
- Third-party libraries
- One-liners with no logic

### Running tests

```bash
# Full test suite
[test command]

# Watch mode
[watch command]

# Coverage
[coverage command]
```

---

## Git Workflow

### Branch naming

```
feature/[short-description]
fix/[short-description]
chore/[short-description]
```

### Commit messages

Follow Conventional Commits:

```
feat: add user authentication
fix: resolve null pointer in payment flow
chore: update dependencies
docs: clarify setup instructions
```

- Subject line: ≤72 chars, imperative mood, no trailing period
- Never commit directly to `main` / `master`

---

## Pull Requests

- Keep PRs small and focused — one concern per PR
- Write a clear description of *what* and *why*, not just *what*
- Link to relevant issues
- All CI checks must pass before merging
- At least [1 / 2] approval(s) required

When reviewing, Claude should flag:
- Logic errors or edge cases
- Missing error handling
- Security issues
- Performance concerns in hot paths

---

## Environment & Configuration

Environment variables are managed via `.env` files. Never commit `.env` files.

```bash
# Copy the example and fill in values
cp .env.example .env
```

### Required variables

| Variable | Description |
|----------|-------------|
| `[VAR_NAME]` | [What it does] |
| `[VAR_NAME]` | [What it does] |

### Environments

- **development**: [brief description]
- **staging**: [brief description]
- **production**: [brief description]

---

## Security

**Never:**
- Log secrets, tokens, or passwords — not even partially
- Hardcode credentials or API keys
- Disable authentication/authorization for convenience
- Commit `.env` files or any file containing real secrets

**Always:**
- Validate and sanitize user input before processing
- Use parameterized queries — never string-concatenate SQL
- Follow principle of least privilege for API permissions

---

## Do Not Modify

The following files/directories should not be modified without explicit instruction:

- `[file or directory]` — [reason]
- `[file or directory]` — [reason]
- `[file or directory]` — auto-generated, will be overwritten

Always confirm before making changes to:
- Database migration files
- CI/CD pipeline configuration
- Production secrets or credentials

---

## Error Handling

- Fail fast and explicitly — don't silently swallow errors
- Use typed errors / custom error classes where the stack supports it
- Always handle promise rejections — no unhandled `.catch()`
- Log errors with enough context to reproduce the issue
- User-facing errors should be human-readable; internal errors can be verbose

```
// Pattern: Result type (adapt to your language)
{ success: true, data: ... }
{ success: false, error: "description", code: "ERROR_CODE" }
```

---

## API Conventions

- **Style**: [RESTful / GraphQL / tRPC / RPC]
- **Versioning**: [/v1/ prefix / header-based / none]
- **Auth**: [JWT Bearer / API Key / Session]
- **Error format**:

```json
{
  "success": false,
  "error": "Human-readable message",
  "code": "MACHINE_READABLE_CODE"
}
```

- All endpoints return consistent response shapes
- Use HTTP status codes correctly (200, 201, 400, 401, 403, 404, 422, 500)

---

## Database

- **Database**: [PostgreSQL / MySQL / SQLite / MongoDB / etc.]
- **ORM / Query builder**: [name]
- **Migrations**: [tool name] — always create a migration for schema changes

### Rules

- Never modify existing migration files — create new ones
- Always backup before running migrations in production
- Use transactions for multi-step operations
- Add indexes for fields used in `WHERE`, `JOIN`, or `ORDER BY`

```bash
# Create migration
[migration create command]

# Run migrations
[migration run command]

# Rollback
[migration rollback command]
```

---

## Troubleshooting

### [Common issue #1]

**Symptom**: [What the developer sees]
**Cause**: [Why it happens]
**Fix**:
```bash
[fix command]
```

### [Common issue #2]

**Symptom**: [What the developer sees]
**Fix**: [Description or command]

### When all else fails

```bash
# Nuclear reset
[reset command]
```

---

## Glossary

| Term | Meaning |
|------|---------|
| **[Term]** | [Definition as used in this project] |
| **[Term]** | [Definition] |
| **[Term]** | [Definition] |

> These terms have specific meanings in this codebase that may differ from general usage.

---

## Multi-Agent Workflow

This project uses Claude Code in agentic mode. The following agent roles are defined:

| Agent | Responsibility |
|-------|----------------|
| **Orchestrator** | Breaks tasks into subtasks, delegates, synthesizes results |
| **[Agent role]** | [Specific domain responsibility] |
| **[Agent role]** | [Specific domain responsibility] |

### Coordination rules

- Agents communicate through [shared files / message queue / memory store]
- No agent should modify files outside its domain without orchestrator approval
- Conflicts are resolved by [orchestrator / human review]

---

## Memory & Context

Use `CLAUDE.md` sub-files in major directories to provide local context:

```
src/
├── CLAUDE.md         ← Component-level guidance
api/
├── CLAUDE.md         ← API-specific rules
```

### What to persist between sessions

- Decisions made about architecture
- Known gotchas and workarounds
- Ongoing work and next steps (use `NOTES.md` for in-progress state)
