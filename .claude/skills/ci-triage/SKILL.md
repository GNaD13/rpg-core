---
name: ci-triage
description: "Diagnose a specified RPG Core CI failure or stalled run before changing code or retrying."
---

# ci-triage

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Use only the explicitly identified project run/repository. Read failure evidence scoped
to the task; do not inspect general account history. Classify code, missing fork prerequisite,
infrastructure, cancellation and resource failure. Reproduce the smallest relevant check
from docs/qa-gate.md. Do not weaken a gate or rerun repeatedly without a changed premise.
Do not submit fixes, reruns or remote changes without authorization covering the action.
No GitHub CI workflow is installed by this agent configuration migration.
