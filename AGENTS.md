# RPG Core engineering

- Never access personal notes, note apps, note databases, note exports or their metadata.
  Scope reads/searches to this project and explicitly required source dependencies.
- This is a multiplayer fork of MIT WoC source, not a rewritten game engine.
  Read docs/MULTIPLAYER_ARCHITECTURE.md and PROVENANCE.json before structural changes.
- For asset, material, lighting, VFX or visual-design work, read docs/ART_DIRECTION.md.
  The latest approved scope is a modern office and moderately stylized characters
  for mobile/web, targeting sustained 60 FPS (~16.7 ms total frame time). Prioritize
  responsiveness over realism; follow the latest approved section in that document.
  Device baseline and concurrent visible player count remain to be specified.
  Do not claim performance from concept images; measure in-game on target devices.
- Preserve the shared deterministic simulation and authoritative server model.
  Reuse existing auth, character ownership, lease, FIFO save and shutdown pipelines.
  Do not add alternate unauthenticated joins or unfenced save writers.
- Product changes belong in small adapters at existing seams. Client/server must share
  world/terrain/collider definitions and compatible world protocol epochs.
- Do not restore original media, branded artwork or private extensions by copying a
  whole upstream folder. Check upstream/CREDITS.md and package license terms.
- Never commit secrets, cache, dependencies, build output or local database files.
  Use only the rpg-core-local disposable database for tests, never a shared database.
- Validate appropriate targets: pnpm test, pnpm test:core, pnpm typecheck,
  pnpm typecheck:server, pnpm build:all. Persistence changes also require real-Postgres
  tests (pnpm test:postgres). Do not describe skipped database tests as passed proof.
- Use docs and source in upstream only as reference. Do not run the original production
  deployment, Discord, email, wallet or platform integration against WoC services.


## Agent configuration

Read CLAUDE.md for the shared engineering contract and docs/AGENT_SETUP.md for
runtime configuration, skill inventory and limitations. The user privacy rule above
applies to every tool, script, hook and delegated reviewer without exception.
Preserve this project's approved art direction; upstream styling is not product policy.
Use the existing project skills and read-only reviewers for relevant tasks.
Do not initialize Git, commit, push, publish or contact external services merely because
an upstream workflow mentions it. Check Git availability before using diff-based tools.
Hooks are intentionally inactive. Do not run hook setup scripts, register hooks, or set
core.hooksPath without a subsequent explicit user request to enable them.
