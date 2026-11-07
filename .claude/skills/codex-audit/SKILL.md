---
name: codex-audit
description: "Audit the project agent configuration, instruction consistency and inactive-hook boundary."
---

# codex-audit

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Read docs/AGENT_SETUP.md, project instruction files, skills and runtime definitions.
Check canonical references, supported commands, role isolation, model inheritance, privacy,
external-write boundaries, hook registrations and stale upstream targets. Do not inspect
home-directory agent configuration or personal history to discover context. For claims
about current harness behavior consult the available official-documentation workflow.
Distinguish checked-in declarations from observed runtime support. Audit-only is read-only;
changes require a request. Hooks stay inactive unless separately authorized.
