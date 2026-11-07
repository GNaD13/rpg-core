# RPG Core agent setup

## Authority and runtime boundaries

AGENTS.md contains project safety, privacy and user requirements. CLAUDE.md is the shared
engineering contract; GEMINI.md points to it. No runtime may inspect personal notes by any
method. Keep reads inside authorized project scope. No global user settings, MCP connections,
credentials or model/provider pins are installed. Current approved visual requirements live
in docs/ART_DIRECTION.md; do not restore upstream chibi styling as project policy.

.codex/config.toml declares CLAUDE.md fallback, a 64 KiB instruction budget and 4 threads
at depth 1, inheriting session model/permissions. Harness support and effective discovery
must be observed in the actual runtime; files alone do not prove an agent or skill loaded.
There is no forced task fan-out. Select relevant specialist roles when useful and supported.

## Skills

Ten Codex entry points in .agents/skills retain the woc- prefix so existing vocabulary
continues working. Each points to one adapted, runtime-neutral workflow under .claude/skills.
The sixteen shared workflows are extract-and-test, feature-plan, qa, review-pr, file-issue,
write-game-tooltips, image-to-glb, release-merge-audit, release-malware-audit, codex-audit,
asset-pipeline, blender-anim-pipeline, ci-triage, hunt-live-programs, i18n-locale-fill and
pr-screenshots. codex-audit has a Claude entry too, giving sixteen shared workflow folders.
The original Claude set had fifteen; the added shared codex-audit avoids duplicating its body.

Asset generation services and Blender are not installed/configured by these files.
The current owned-asset manifest and ASSETS.md take precedence over upstream media paths.
Do not use WoC donor media or paid services implicitly. No GitHub remote is assumed.

## Reviewer routing

| Surface | Codex role | Claude role |
|---|---|---|
| Simulation purity/determinism | woc_sim_architecture | architecture-reviewer |
| IWorld/wire/headless parity | woc_cross_platform | cross-platform-sync |
| Schema/save/load compatibility | woc_persistence | migration-safety |
| SQL/index/pool/locks/engine/growth | woc_database_performance | database-performance-reviewer |
| Tick/request/broadcast/jobs/collections | woc_server_hot_path | server-hot-path-reviewer |
| Auth/authority/privacy/trust boundaries | woc_security | privacy-security-review |
| UI/render/styles/i18n/fairness | woc_frontend | frontend-seam-reviewer |
| Decisive behavior/test coverage | woc_test_coverage | test-coverage-auditor |
| Executable/dependency/release threats | woc_release_malware | release-malware-audit |
| Official API/documentation research | woc_docs_researcher | Use available official-source tooling |
| GPU/resource/compile performance | Scope frontend role or use available reviewer | render-performance-reviewer |
| New content consistency | Scope parity/test roles or use available reviewer | content-obligations-reviewer |
| QA pipeline selection | Scope test role or use available reviewer | gate-integrity-reviewer |
| Overall QA coordination | woc-qa skill | qa-checklist |

All specialists are read-only. The coordinator owns execution and integration.
Definitions retain deep WoC technical checklists. Some example content systems, design
runbooks, source paths and workload assumptions describe upstream and must be verified
against this tree and the approved target workload, not adopted as new product requirements.
Missing upstream documentation is not permission to restore media or contact WoC services.

## Hooks intentionally inactive

.codex/hooks.json and .claude/settings.json both contain `hooks: {}`.
Upstream scripts are stored only under tools/agent-hooks/inactive/ for inspection.
No .githooks directory or auto-install command is added. Nothing calls ensure-hooks.sh,
and no Git core.hooksPath setting is changed. Do not activate them without a later explicit
request. See tools/agent-hooks/README.md for adaptation and privacy concerns.

## Verification and provenance

Use docs/qa-gate.md and package.json. The upstream full gate, wiki/media generation,
GitHub release branches and CI package scripts are not assumed available here.
This setup does not create a repository, PR, CI pipeline, deployment or MCP server.
Agent-source fingerprints and adaptation scope are recorded in agent-config-provenance.json.
Root LICENSE preserves the upstream MIT attribution. Media and dependencies remain separately
licensed. No source gameplay, assets, package dependencies or lockfile are changed by this setup.
