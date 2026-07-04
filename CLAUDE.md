# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

> **This is a starter-kit template.** The sections below show realistic *example* content so you can
> see what a good `CLAUDE.md` looks like, not blank placeholders. Replace every example with the real
> details of your project, then delete anything that doesn't apply. See `README.md` for the
> full ✅/❌ guide on what belongs here versus what to leave out.

## Project Overview

Example: a Node/TypeScript REST API that manages user accounts and billing, deployed as a
single service behind an API gateway. (Replace with a 2-3 sentence description of what your
project does and who uses it.)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run a single test file (prefer this over the full suite while iterating)
npm test -- path/to/file.test.ts

# Run the full test suite
npm test

# Build for production
npm run build

# Lint / format
npm run lint
```

## Code Style & Conventions

- Use ES modules (`import`/`export`), not CommonJS (`require`)
- Destructure imports when possible (e.g. `import { foo } from 'bar'`)
- Errors are thrown as typed `AppError` subclasses, not raw strings — see `src/errors.ts`
- New endpoints go through the existing `src/routes/*` pattern; don't add a second routing layer

## Key Files & Directories

```
src/routes/       # HTTP route handlers, one file per resource
src/services/     # Business logic, called from routes
src/db/           # Database schema and migrations
```

## Environment Variables

```
DATABASE_URL=       # Postgres connection string, see .env.example
ANTHROPIC_API_KEY=  # Only needed if running the AI-powered import feature locally
```

## Testing

Tests live next to the code they cover (`foo.ts` / `foo.test.ts`). Run a single test file while
iterating; only run the full suite before committing.

## Repo Etiquette

- Branch names: `<initials>/<short-description>` (e.g. `jd/fix-login-timeout`)
- Commit messages: imperative mood, one line summary + optional body
- Open PRs against `main`; squash-merge only

## Notes for Claude

- Read relevant files before making changes
- Prefer editing existing files over creating new ones
- Do not commit unless explicitly asked
- Ask before taking destructive or irreversible actions
- For domain knowledge or workflows that only come up sometimes, add a skill under
  `.claude/skills/` instead of growing this file — see `.claude/skills/changelog-entry/SKILL.md`
  for an example, and `README.md` for how to pull in Anthropic's published skills
- Large or unrelated context (a linked doc, another file's contents) can be pulled in with
  `@path/to/file` instead of pasting it here
