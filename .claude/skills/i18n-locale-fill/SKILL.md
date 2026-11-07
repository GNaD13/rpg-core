---
name: i18n-locale-fill
description: "Fill explicitly requested RPG Core locales while preserving catalog and generated-output contracts."
---

# i18n-locale-fill

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Inspect English domain catalogs, requested locale overlays, glossary and current generator.
Preserve placeholder names, markup and matcher semantics. Locale edits are permitted for
an explicit translation task; ordinary feature work changes English sources first.
Do not run missing upstream package scripts; inspect the installed generator and dependencies.
Regenerate only through its owner, run relevant localization tests and typechecks, and
report pending rows honestly. Avoid global rewrites or unrelated locale edits.
