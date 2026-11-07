---
name: image-to-glb
description: "Integrate an owned reference-based GLB using the current RPG Core asset contract."
---

# image-to-glb

Read AGENTS.md and CLAUDE.md first. Use docs/qa-gate.md for supported checks. Preserve the personal-notes prohibition in every tool and delegation.

Read ASSETS.md and the latest docs/ART_DIRECTION.md first. Verify reference and output
rights; never restore upstream media or donor rigs under the source MIT license.
Check available authoring tools instead of assuming img2threejs, Blender MCP or Tripo exists.
Use owned models, self-contained GLB and supported materials/animations. Integrate via
public/assets/manifest.json and src/product/owned_assets.ts; inspect the schema first.
Match height, axes, rig, clip names and colliders; shared collider changes need both hosts
rebuilt. Run pnpm assets:check, relevant tests/builds and inspect the asset in-engine.
An image-generation tool produces concepts/textures, not a rigged GLB. Report missing
rigging, animation, tooling or integration honestly. Do not invoke paid services without
user authorization covering that service and cost.
