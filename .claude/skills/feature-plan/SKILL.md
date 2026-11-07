---
name: feature-plan
description: "Plan cross-cutting RPG Core features in testable phases with explicit compatibility and verification decisions."
---

# feature-plan

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Inspect current code and architecture before planning. State behavior, acceptance,
existing seam, authority, protocol/save compatibility, asset needs and migration risks.
For database work, record query cadence/cardinality, indexes, pool/locks and required real
PostgreSQL evidence. For recurring server work, name growing collections and CPU bounds.
Split into testable vertical phases with modules, checks and exit criteria. Persist a plan
only when useful to the request; do not turn planning into unauthorized implementation.
Do not invent upstream branch requirements, GitHub targets or unavailable services.
