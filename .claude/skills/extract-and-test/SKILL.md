---
name: extract-and-test
description: "Implement features, bug fixes and focused refactors through existing RPG Core seams and decisive tests."
---

# extract-and-test

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Trace the live path, callers, state owner and existing tests before choosing a seam.
For defects, reproduce through the real path with a failing focused test, then apply the
smallest coherent fix. For features, extend existing modules/facets, keeping pure logic
separate from I/O. Preserve Rng order, authority, protocol parity and persistence.
Do not rewrite WoC subsystems or expand coordinators when a sibling module is suitable.
For database changes, use database-performance review before decisions and after the diff;
for server tick/request/broadcast/jobs, use server-hot-path review. Run focused tests and
the relevant checks in docs/qa-gate.md. Report behavior, seam and verification gaps.
