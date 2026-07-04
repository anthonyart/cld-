---
name: changelog-entry
description: Draft a CHANGELOG.md entry summarizing recent commits or a diff. Use when the user asks to update the changelog, summarize recent changes, or prepare release notes.
---
# Changelog Entry

Given a range of commits (or the current diff), write a concise, user-facing changelog entry.

1. Run `git log --oneline <last-tag>..HEAD` (or `git diff` if there's no tag yet) to see what changed.
2. Group the changes into `Added`, `Changed`, `Fixed`, and `Removed` — omit empty groups.
3. Write each line from the user's perspective, not the implementation's: describe what they can
   now do or what behavior changed, not which file was touched.
4. Skip purely internal changes (refactors, test-only commits, dependency bumps) unless the user
   asks to include them.
5. Prepend the entry to `CHANGELOG.md` under a new `## [Unreleased]` heading (create the file if
   it doesn't exist), then show the user the diff before committing.
