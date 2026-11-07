---
name: hunt-live-programs
description: "Investigate local shader compilation hitches using scoped RPG Core render evidence."
---

# hunt-live-programs

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Read the render preparation/scheduling code and docs/ART_DIRECTION.md. Target only the
user-authorized local RPG Core client/server; the upstream hunt script may default to WoC
production and must not be run unchanged. Inspect script flags, endpoints, credentials and
outputs first. Capture compile/program events and frame timings with an available approved
browser tool. Attribute the hitch to its owner; use existing prewarm/compile/reveal seams.
Compare before/after under matching workloads. Do not infer target-device 60 FPS from a
concept or an empty scene. Report capture scope and unmeasured limits.
