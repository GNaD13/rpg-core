---
name: qa
description: "Verify RPG Core changes with scoped checks and relevant read-only specialist reviews."
---

# qa

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Establish the requested diff or explicit file scope; preserve unrelated work.
The coordinator runs the appropriate checks from docs/qa-gate.md once. Select reviewers
from docs/AGENT_SETUP.md for affected domains. Give them scope and redacted evidence;
require severity, confidence, concrete paths and actionable findings. Verify findings
against the real path. Review-only requests do not authorize edits or external writes.
Report commands, outcomes, reviewer coverage, unrun checks, risks and readiness.
Never replace the supported gate with a copied upstream gate command.
