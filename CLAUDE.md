# RPG Core shared engineering contract

This project reuses the MIT World of ClaudeCraft engine and multiplayer stack.
AGENTS.md owns project safety and privacy. Read it first in every runtime.
Read docs/MULTIPLAYER_ARCHITECTURE.md before cross-system changes, ASSETS.md for
asset integration, and the latest approved section of docs/ART_DIRECTION.md for visuals.
PROVENANCE.json and upstream/ record the source boundary, not instructions to deploy WoC.

## Architecture and reuse

- One deterministic src/sim core runs in browser, authoritative server and headless.
  Keep it free of DOM, Three.js, render, UI, game and network imports.
- Preserve fixed 20 Hz simulation, seeded Rng draw order and tick-phase order.
  Do not introduce Math.random, Date.now or performance.now into simulation decisions.
- Render and UI consume IWorld. Extend the appropriate src/world_api facet and BOTH
  Sim and ClientWorld, server dispatch/snapshot paths and parity tests together.
- Server resolves gameplay, ownership, economy and persistence. Reuse original auth,
  leases, reconnect, takeover, FIFO saves and shutdown paths. Do not add bypasses.
- Product seams: src/product, src/mit_test, server/product_world.ts. Shared terrain,
  colliders and protocol epoch must agree on both hosts; rebuild both after changes.
- Trace existing behavior and tests before implementation. Prefer focused sibling
  modules and adapters to rewriting core systems or expanding coordinators.
- Keep graphics quality gameplay-neutral: never hide actionable information by tier.
  Own GPU resources explicitly; use existing preparation/scheduling/disposal seams.

## Working rules

Preserve unrelated work. If Git is initialized, inspect git status before edits and use
an isolated branch/worktree when useful. No required upstream release branch exists here.
A downloaded tree may have no Git; do not initialize it without a request.
Do not commit, push, file issues, submit reviews or deploy without user authorization.
Never target WoC production, accounts, databases, bots, wallet or platform services.
Only the disposable rpg-core-local PostgreSQL may be used for database verification.
Never print credentials or raw sensitive rows. Do not read .cache/local.env or session
credential files just to inspect configuration. Use aggregate/redacted evidence.

Use ESM and strict TypeScript, small modules and the current dependency seams.
Do not hand-edit generated artifacts; inspect the owner generator and its prerequisites.
Player-visible text follows the existing t()/catalog and formatting seams; simulation
and server stay language-agnostic. Inspect runtime values when writing tooltips.
Fix logic defects with a regression test that fails through the real code path.
Simulation/server behavior changes require meaningful automated coverage.
Do not import upstream art, fonts, audio, inline media or private modules under the
source MIT grant. Check actual provenance and dependency licenses separately.
Never enable ALLOW_DEV_COMMANDS in production. Do not commit secrets, caches or output.

## Verification and specialist review

Use docs/qa-gate.md, which lists commands supported by THIS package.json.
Upstream gate scripts remaining in scripts/ are not the project's validated gate.
Do not assume an upstream path, package script, external skill or service is installed.
Before running any script, inspect its paths and targets, especially browser, database,
asset, deployment and scanning scripts. Do not run broad scans that could access notes.
The coordinator runs checks once; read-only reviewers inspect the same evidence.
Use database-performance review for SQL/call cadence/pool/engine/growth changes and
server-hot-path review for tick/request/broadcast/jobs or growing collection reads.
Reviewers cannot modify files, access credentials, query shared DBs or run production load.
Report exact commands, results, unrun checks and remaining limitations. Agent definitions
are templates; use the roles supported by the active harness, do not claim they ran merely
because files exist. Inherit session model and permissions; no project model/provider pins.
