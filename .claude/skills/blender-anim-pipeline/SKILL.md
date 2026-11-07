---
name: blender-anim-pipeline
description: "Author and integrate animation clips for owned RPG Core rigs using available Blender or pose tooling."
---

# blender-anim-pipeline

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Inspect the owned rig, rest pose, bone names and actual loaded clips. Read ASSETS.md and
src/product/owned_assets.ts before wiring. For richer character paths inspect existing
VisualDef/ClipMap/animUrls and seat_clips seams; preserve them instead of adding a driver
to renderer.ts. The placeholder has only Idle/Walk; additional clips need explicit mapping.
Use only licensed/owned donors. scripts/anim/pose_blend.mjs is reusable code; check its
actual dependencies first. Blender/headless Blender is authoring-time only and no MCP or
binary availability is assumed. Verify bone binding, root motion, foot sliding, transitions,
loop seams and seated anchor alignment in-engine. Do not claim clip presence proves playback.
Add meaningful binding/contract checks and run relevant builds/typechecks.
