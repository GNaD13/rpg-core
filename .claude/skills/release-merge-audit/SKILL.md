---
name: release-merge-audit
description: "Audit an RPG Core upstream integration or merge for semantic regressions."
---

# release-merge-audit

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Identify the explicit integration range and both parents, or a supplied source comparison
when Git is absent. Compare overlapping paths, not just textual conflict resolution.
Check lost branch behavior, stale registry/dispatch entries, protocol/save drift, rebinding
of adapters, generated artifacts and tests bypassing the intended path. Recheck asset
exclusions, license boundaries and product-world overrides. Use supported targeted checks.
Audit-only is read-only. Report confirmed regressions, evidence and remediation order.
