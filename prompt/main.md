Bạn đang tiếp tục phát triển dự án rpg-core đã được làm ở máy khác. Hãy dùng bản bàn giao này làm context ban đầu, sau đó kiểm tra source hiện tại trước khi kết luận hoặc thay đổi.

Trao đổi với tôi bằng tiếng Việt.

1. Mục tiêu và nguyên tắc phát triển

- rpg-core là sản phẩm multiplayer game mới, dựa trên source code World of ClaudeCraft (WoC).
- Tôi muốn tận dụng tối đa core và các luồng WoC đã có. Phải đọc implementation, callers và tests trước khi sửa.
- Không mặc định viết lại engine hoặc tạo subsystem song song khi có thể mở rộng seam hiện tại.
- Giữ simulation dùng chung, server authoritative, auth, character ownership, reconnect/takeover, lease, FIFO save và shutdown persistence.
- Không coi demo hiện tại là sản phẩm đã sẵn sàng production.

2. Quy tắc riêng tư bắt buộc

Tuyệt đối không truy cập ghi chú cá nhân của tôi bằng bất kỳ công cụ nào.
Không đọc, tìm kiếm, liệt kê, chụp, sao chép hay truyền nội dung, tiêu đề, attachment hoặc metadata của personal notes.
Bao gồm Apple Notes/iCloud Notes, ứng dụng ghi chú khác, file/database/backup/export/cache/index và bản sao trong logs hoặc lịch sử.
Không tìm kiếm rộng trong home directory.
Chỉ thao tác trong project được chỉ định và dependency nguồn cần thiết.
Không nhờ agent khác truy cập thay.
Nếu gặp nội dung ghi chú cá nhân ngoài ý muốn, dừng thao tác liên quan và không nhắc lại nội dung đó.
Tài liệu kỹ thuật thông thường trong repository không tự động là personal notes.

3. Repository và đường dẫn

Trên máy cũ:

- WoC gốc: /Users/gnad/work/gnad/world-of-claudecraft-main
- Project mới: /Users/gnad/work/gnad/rpg-core
- rpg-core trước đây nằm trong /Users/gnad/Documents/ChatGPT/Game/rpg-core rồi đã được di chuyển.

Trên máy mới, dùng đường dẫn repository tôi đã clone, không giả định đường dẫn giống máy cũ.
Tôi tự đồng bộ source qua GitHub.
Không tự tạo remote, commit, push, PR hay deploy nếu chưa được yêu cầu.
Không mặc định repo hoặc service của WoC là đích thao tác.

4. Source và licensing

- Source WoC có root LICENSE MIT, attribution Levy Street cần được giữ.
- Media/art/audio/fonts và một số nội dung khác có điều khoản riêng; source MIT không có nghĩa toàn bộ asset MIT.
- Chủ trương của tôi: sử dụng core source và tự phát triển assets riêng.
- Không copy lại media gốc, inline artwork, private extension hoặc donor rig chỉ vì nằm trong repository WoC.
- Dependency có license riêng; không mô tả toàn bộ dependency là MIT.
- Reown runtime đã được loại khỏi bản fork.
- Đọc LICENSE, THIRD_PARTY_NOTICES.md, PROVENANCE.json, upstream/CREDITS.md và tài liệu liên quan trước khi quyết định về nguồn gốc.
- Chưa có kết luận kiểm toán pháp lý toàn bộ sản phẩm.

5. Phần core đã được đưa vào

Theo kiểm chứng trên máy cũ:

- Toàn bộ 1.566 file src/sim lúc đó giống nguyên bản WoC.
- Đã đưa sang phần lớn source/config/tests kỹ thuật, cùng authoritative server, auth, persistence, network, editor, admin, headless/RL, bot và các native shell.
- server/game.ts, server/db.ts, server/ws_auth.ts và src/net/online.ts từng được xác nhận giữ nguyên.
- Có các adapter cần thiết cho world và assets riêng.
- Không mang theo toàn bộ media và dữ liệu placement map gốc.
- Native source đã giữ lại, nhưng chưa chứng minh native app build/chạy hoàn chỉnh.
- Editor/admin/headless/bot từng build được; không có nghĩa mọi tính năng đã E2E.

Đây là bằng chứng lịch sử, không phải bảo đảm source hiện tại chưa thay đổi. Hãy kiểm tra PROVENANCE.json và code hiện tại.

6. Các luồng và seam quan trọng

- src/sim: deterministic simulation dùng chung cho browser, server và headless.
- Simulation cố định 20 Hz, RNG có seed; giữ draw order và tick order.
- Không đưa DOM, Three.js hay wall-clock randomness vào simulation.
- Render/UI làm việc qua IWorld.
- Thay đổi IWorld phải xét cả Sim, ClientWorld, command dispatch, snapshot/wire và parity tests.
- Luồng online giữ REST đăng ký/đăng nhập → realm → character → enterWorld → WebSocket → snapshot.
- Không có đường join không xác thực riêng để thay luồng gốc.

Adapter sản phẩm:

- src/product/asset_manifest.ts
- src/product/owned_assets.ts
- src/mit_test/world.ts
- src/mit_test/scenery_layout.ts
- src/mit_test/assets.ts
- server/product_world.ts
- server/sim_boot_config.ts

World riêng dùng RPG_WORLD=placeholder.
Client/server phải dùng chung terrain/collider definitions.
Thay đổi world/collider cần rebuild cả hai phía.
World protocol epoch đã được tách khỏi upstream; xác minh giá trị hiện tại trước khi sửa.

7. Demo và assets hiện tại

- Demo đã chạy bằng core WoC, có multiplayer server/client thật.
- Tôi đã thử và di chuyển nhân vật được.
- Có procedural placeholders được tạo bằng code: nhân vật hình khối và scenery cơ bản.
- Nhân vật placeholder có Idle/Walk; chưa có bộ animation đầy đủ.
- Assets thật nạp qua public/assets/manifest.json và src/product/owned_assets.ts.
- ASSETS.md mô tả GLB, height/axes, rig, clip names và collider contract.
- Không giả định thả bất kỳ GLB nào vào là đủ cho mọi gameplay.
- Adapter hiện tại chưa phải một catalog đầy đủ cho mọi class, mob, gear và animation.
- Không giả định Draco/KTX2/Meshopt decoder đã được cấu hình.
- Tôi từng yêu cầu camera góc nhìn thứ ba gần nhân vật hơn. Đọc code camera hiện tại để giữ trạng thái cuối; không quay lại góc nhìn thứ nhất mặc định.
- Các tab demo cũ từng ở localhost 5180, 5181 và 5182; không coi đó là bằng chứng server đang chạy trên máy mới.

8. Development environment và checks

Dự án có pnpm lockfile và dependencies riêng, đã tách khỏi node_modules của WoC gốc.

Các lệnh từng được cấu hình:

- pnpm dev
- pnpm build
- pnpm build:all
- pnpm assets:check
- pnpm typecheck
- pnpm typecheck:server
- pnpm typecheck:bot
- pnpm test
- pnpm test:core
- pnpm test:unit
- pnpm test:postgres
- pnpm test:multiplayer
- pnpm db:up
- pnpm db:down

Đọc package.json và README hiện tại để xác nhận phiên bản/lệnh.
Máy cũ dùng pnpm 10.34.5, Node yêu cầu >=20.20.2 và Docker/PostgreSQL 16.

Local stack từng dùng:

- Client/proxy: 127.0.0.1:5182
- Game server: 127.0.0.1:8788
- PostgreSQL: 127.0.0.1:55482
- Docker Compose project: rpg-core-local
- compose.local.yml và các script dev/local-env/server/serve.

Credentials local được tạo trong cache, không commit hoặc in ra.
Database local không tự đi theo Git.
Chỉ dùng database disposable của project để test; không dùng WoC/shared/production DB.
Không tự bật dev cheats trong production.
Không tự khởi chạy bot/email/wallet/platform integration tới dịch vụ bên ngoài.

9. Bằng chứng kiểm tra lịch sử

Trên máy cũ từng có:

- pnpm test:core: 993/993 tests pass.
- pnpm test:postgres: 47/47 tests pass trên PostgreSQL 16 local thực.
- Smoke test movement, jump, collider và resource disposal pass.
- Typecheck client/server/bot pass.
- Build client/server/editor/admin/headless/bot pass.
- E2E local REST + WS: visibility, movement, ownership rejection, reconnect/takeover và save/restart đã được kiểm tra.
- Login/realm/character/enterWorld qua browser thật đã chạy.

Giới hạn:

- Chưa build/verify Docker image hoàn chỉnh.
- Chưa build native apps.
- Chưa chạy đầy đủ nội dung gameplay gốc hoặc production load/security audit.
- Không mô tả mọi test upstream là pass: nhiều test phụ thuộc media/service đã bỏ.
- Một số independent review trước đây không hoàn thành do giới hạn dịch vụ; không được nhận là đã có review độc lập đầy đủ.
- Hãy chạy checks phù hợp với thay đổi mới thay vì coi số liệu cũ là kết quả hiện tại.

10. Art direction

Định hướng ban đầu lấy cảm hứng Silkroad Online, cho phép cả đồ họa hiện đại và fantasy giao thoa cổ điển–hiện đại.

Tuy nhiên tài liệu project đã có cập nhật mới hơn:

- Bối cảnh văn phòng hiện đại.
- Nhân vật 3D cách điệu vừa phải.
- Hướng mobile/web.
- Mục tiêu duy trì 60 FPS; cần đo trên thiết bị thực tế.
- Device baseline và số người chơi nhìn thấy đồng thời còn cần xác định.

Đọc docs/ART_DIRECTION.md và ưu tiên phần cập nhật đã duyệt mới nhất.
Không áp lại phong cách chibi hoặc thiết kế WoC làm yêu cầu mặc định.
Không suy luận đạt performance từ concept image.

11. Seating: tính năng đã khảo sát, chưa triển khai thêm

WoC có sẵn luồng ngồi ghế:

- src/world_api/seating.ts
- src/game/seat_interact.ts
- src/sim/seating.ts
- src/sim/seat_registry.ts
- src/sim/seat_anchor.ts
- src/render/seated_pose_core.ts
- src/render/characters/seat_clips.ts
- command sit_seat qua ClientWorld/server.

Có logic chọn ghế, đi tới vị trí, kiểm tra range/combat/occupancy, ngồi và đứng dậy.
Nhưng ghế built-in bị giới hạn cho world gốc; custom placeholder world chưa có seat anchors riêng.
Một chair GLB không tự có hành vi ngồi.
Cần anchor/collider data, rig và clip mapping phù hợp.
Placeholder chưa có SitDown/SitIdle/StandUp.
Thông số ghế/clip gốc có giả định tỷ lệ nhân vật cũ, cần chỉnh cho rig mới.
Tôi mới hỏi về khả năng và asset cần thiết; chưa yêu cầu triển khai ghế.

12. Blender và Tripo

- Blender có thể dùng làm model/material/rig/animation, xuất GLB để Three.js render.
- Tripo là công cụ authoring tùy chọn, không phải runtime dependency bắt buộc.
- Tôi hiểu có thể phát triển assets bằng Blender hoàn toàn.
- Không mặc định đã cài Blender, Blender MCP, img2threejs, Tripo API hoặc có API key.
- Không gọi paid services nếu chưa có ủy quyền phù hợp.
- WoC có tài liệu pipeline Tripo và animation Blender, nhưng không chứng minh mọi asset đều do hai công cụ đó tạo.
- Nếu hỏi giá/license Tripo, kiểm tra lại nguồn chính thức. Trước đây tài liệu chính thức có mâu thuẫn về commercial rights gói Free; chưa được xem là quyền thương mại rõ ràng.
- Chưa có yêu cầu cài/kết nối Blender hoặc Tripo.

13. Agent configuration đã thêm

Đã tạo trong rpg-core:

- AGENTS.md: quy tắc project và privacy.
- CLAUDE.md: hợp đồng engineering dùng chung.
- GEMINI.md: entry point.
- .codex/config.toml: guidance fallback, không ghim model/provider/permissions.
- .codex/agents/: 10 reviewer read-only.
- .claude/agents/: 13 reviewer.
- .agents/skills/: 10 Codex entry points, giữ prefix woc-.
- .claude/skills/: 16 shared workflows.
- docs/AGENT_SETUP.md
- docs/qa-gate.md
- docs/agent-config-provenance.json
- tools/agent-hooks/inactive/: hook nguồn để tham khảo.

Nhóm skill bao gồm:
extract-and-test, feature-plan, qa, review-pr, file-issue, write-game-tooltips,
image-to-glb, release-merge-audit, release-malware-audit, codex-audit,
asset-pipeline, blender-anim-pipeline, ci-triage, hunt-live-programs,
i18n-locale-fill và pr-screenshots.

Reviewer bao gồm:
simulation, parity, persistence, database performance, server hot paths,
security, frontend, test coverage, malware, official docs; phía Claude có thêm
GPU/render performance, content obligations, gate integrity và QA coordination.

Đã chỉnh workflow để không mặc định dùng lệnh QA, branch, GitHub repository,
wallet dependency hay production service của WoC.

Chỉ file cấu hình có mặt không chứng minh runtime đã tự nạp skill/reviewer.
Hãy kiểm tra khả năng của harness hiện tại và nói rõ reviewer nào thực sự chạy.
Không tự tạo subagent hàng loạt; chỉ dùng vai trò liên quan theo instruction và khả năng runtime.

14. Hooks: giữ INACTIVE

Tôi đã yêu cầu chưa kích hoạt hook.

- .codex/hooks.json: hooks rỗng.
- .claude/settings.json: hooks rỗng.
- Không thêm .githooks hoạt động.
- Không chạy ensure-hooks.sh.
- Không thay đổi Git core.hooksPath.
- Scripts lưu dưới tools/agent-hooks/inactive/ chỉ để đọc.

Không kích hoạt hook nếu tôi chưa có yêu cầu mới rõ ràng.

15. Tài liệu nên đọc theo nhiệm vụ

- AGENTS.md
- CLAUDE.md
- README.md
- docs/AGENT_SETUP.md
- docs/qa-gate.md
- docs/MULTIPLAYER_ARCHITECTURE.md
- docs/ART_DIRECTION.md
- ASSETS.md
- PROVENANCE.json
- VERIFICATION.md
- LICENSE và THIRD_PARTY_NOTICES.md khi liên quan licensing.

Đây là tài liệu kỹ thuật của project, không phải yêu cầu truy cập ghi chú cá nhân.

Hành động đầu tiên

Hãy xác nhận ngắn gọn bạn hiểu mục tiêu và các ranh giới trên.
Kiểm tra thư mục repository được cấp, đọc AGENTS.md, CLAUDE.md và tài liệu liên quan.
Đối chiếu context bàn giao với source hiện tại; chỉ báo những khác biệt quan trọng.
Chưa có yêu cầu triển khai tính năng mới: không tự thay code, cài công cụ, chạy stack,
bật hook hay deploy. Sau khi nắm context, chờ yêu cầu tiếp theo của tôi.
