# Verification, 2026-11-03

Local runtime: macOS, Node 20.20.2, pnpm 10.34.5. Database: dedicated Docker
`postgres:16-alpine`, project `rpg-core-local`, port 55482 and a new persistent volume.
No existing/shared database was used.

## Completed checks

| Check | Result |
| --- | --- |
| Independent install and lockfile | Own dependencies, pinned versions, patched Three; frozen offline reinstall passed |
| `pnpm assets:check` | Passed, default own placeholder manifest |
| `pnpm test` | Passed: idle, move, jump, land, terrain, animation, five scenery collision paths and disposal |
| `pnpm test:core` | **993/993 passed, 14 files, no skips** |
| `pnpm test:postgres` | **47/47 passed, 2 files, no skips**, actual PostgreSQL 16 |
| `pnpm test:multiplayer` | Passed through the client HTTP/WS proxy, real server and database |
| `pnpm test:multiplayer --verify-restart` | Passed after a real game-server shutdown/start |
| `pnpm typecheck` | Passed, browser entry/import closure and smoke test |
| `pnpm typecheck:server` | Passed, server entry/import closure |
| `pnpm typecheck:bot` | Passed with Node-only lib |
| `NODE_ENV=production pnpm build:all` | Passed: client, server, editor, admin, headless, bot |
| `pnpm dev` | Starts isolated DB, builds and starts both real server and static/WS proxy |
| Browser | Original login -> realm -> existing character -> enter world, rendered HUD and movement, fresh final tab had no console errors |

The core suite includes original WebSocket auth/covenant, character lease, linkdead,
backpressure, snapshots, movement-v2, world API parity, persistence round trip,
periodic-save flush and database-budget/timeout tests; plus two product world boot tests.
Node 20 test setup supplies the writable WebSocket global expected by the original
harness. The original tests and implementation were not weakened to pass.

Real PostgreSQL suites are the original `shutdown_character_saves_pg_integration` and
`character_save_statement_pg_integration`. They created/dropped their own uniquely
named fixture databases. Skipped DB tests were not counted as evidence.

Live E2E proved register/login, character creation, two authenticated players in one
world, mutual visibility, authoritative movement observed by the other player,
rejection of an unowned character, linkdead resume with the same pid, the original
takeover/leave save path, rejoin position, and position restored after server restart.
Credentials/tokens are kept only in ignored `.cache` files, never in this report.

## Reuse and boundary evidence

- All 1,566 simulation files match upstream bytes.
- `server/game.ts`, `server/db.ts`, `server/ws_auth.ts` and `src/net/online.ts` match upstream bytes.
- Restore inventory and hashes are in `upstream/RESTORED_FILES.json` and
  `upstream/RESTORED_SHA256.json`; adaptations are listed in PROVENANCE.json.
- No original public media or old data/map placement directory was copied.
- Build rejects Reown/WalletConnect runtime in the client graph.
- No original-repository dependency path. Dependency links stay within this project.
- `.cache/local.env`, `node_modules`, `dist` and `dist-*` are ignored by Git.
- Proposed-change database and server-hot-path reviews supported unchanged backend
  plus a boot-only world adapter. Independent finished-diff review was attempted but
  the agent service returned its usage limit; no completed final independent security
  review is claimed. Parent reviewed the concrete proxy, boot and persistence seams.

## Not established by these checks

Full upstream QA gate/suite, every gameplay domain/campaign, load capacity, a complete
security/license audit, container-image build, production TLS/proxy/backup/restore,
external email/OAuth/store/wallet/Discord integrations, and native application builds.
Some original tests intentionally require the excluded media/catalog; their presence
in source does not mean they have been run or are applicable to the new artwork.
Admin build emits inherited chunk-size/lazy-import warnings; build still completes.
Original release/deployment scripts remain reference material and must not be pointed
at WoC infrastructure. Product UI still contains legacy content/branding strings and
links, to be replaced with the product's identity and legal documents before release.
