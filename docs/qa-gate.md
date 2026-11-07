# RPG Core verification contract

This is the fork's supported gate. It does not activate any agent or Git hook.
Read AGENTS.md and CLAUDE.md; inspect scripts before using their external or data targets.
Copied upstream gate scripts are references, not a validated replacement for this list.

| Change | Appropriate verification |
|---|---|
| Agent/docs configuration only | Parse JSON/TOML and skill frontmatter; verify references, safe targets and inactive hooks. No full game build needed. |
| Owned asset manifest/model | pnpm assets:check, pnpm test, pnpm build; inspect in game. Rebuild client/server for shared collider/world changes. |
| Client/game/render/UI | pnpm typecheck, focused unit tests, pnpm build; matching local visual evidence for visual behavior. |
| Shared simulation or protocol | Focused regression and parity tests, pnpm test:core, pnpm typecheck, pnpm typecheck:server, pnpm build:all. |
| Server/auth/persistence | Focused regressions, pnpm test:core, pnpm typecheck:server, pnpm build:server; persistence/SQL also pnpm test:postgres against own disposable local DB. |
| Cross-target or release work | pnpm test, pnpm test:core, pnpm typecheck, pnpm typecheck:server, pnpm typecheck:bot, pnpm build:all; applicable DB/multiplayer checks. |

Focused tests use `pnpm exec vitest run --config vitest.product.config.ts <test-files>`.
`pnpm test:unit` selects the broad inherited suite; many tests require omitted upstream
media or services. Do not call missing-media failures product regressions or describe
that suite as passing without running it. Do not suppress a real behavior failure.
`pnpm test:multiplayer` requires the local stack and creates synthetic local test accounts;
inspect its local-only guard and prerequisites first. Do not expose its credential cache.
Real PostgreSQL proof uses pnpm test:postgres, never upstream/shared databases.
Do not run a full-tree scanner before verifying it cannot include notes or secrets.

The coordinator runs deterministic checks once and shares redacted output. Choose matching
read-only reviewers from docs/AGENT_SETUP.md. A reviewer or hook is not test evidence.
If a reviewer is unavailable, state that and distinguish a coordinator review from an
independent one. Report commands and exact results, skipped checks and material risks.
Production readiness additionally needs product assets/content, independent service
configuration, operational/security/load evidence and native checks where applicable.
