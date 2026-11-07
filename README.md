# RPG Core

Nền phát triển **multiplayer RPG** độc lập dựa trên MIT source của WoC 0.45.6.
Giữ authoritative server, simulation, networking, auth, database và persistence gốc;
client dùng hình khối mẫu tự tạo, không cần repo WoC hoặc bộ media gốc.

Định hướng hình ảnh chính thức: **fantasy Á–Âu giao thoa cổ điển–hiện đại**, lấy
Silkroad Online làm tham chiếu và cho phép đồ họa cùng thiết kế hiện đại.
Xem [Art Direction](docs/ART_DIRECTION.md) trước khi phát triển asset mới.

## Chạy local server và client

Cần Node 20.20.2 trở lên, pnpm 10.34.5 và Docker đang chạy.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Lệnh này tạo `.cache/local.env` với mật khẩu ngẫu nhiên, khởi động PostgreSQL 16 riêng,
build và chạy cả hai process. Mở **http://127.0.0.1:5182/play**:
Play -> đăng ký/đăng nhập -> chọn RPGLocal -> tạo nhân vật -> Enter World.
Dùng hai tài khoản trên hai browser profile/private window để test hai người chơi
(trình duyệt cùng profile chia sẻ session, nên hai tab thường không đủ để tách tài khoản).

- Client/proxy: `127.0.0.1:5182`.
- Game server thật: `127.0.0.1:8788`.
- PostgreSQL riêng: `127.0.0.1:55482`, Compose project `rpg-core-local`.
- Ctrl+C yêu cầu game server lưu và shutdown; database volume được giữ lại.
- `pnpm db:down` dừng database, không xóa volume. Không chạy `down -v` nếu muốn giữ dữ liệu.
- Chưa có hot reload: đổi source/world/collider thì dừng và chạy lại.
- Offline tùy chọn: http://127.0.0.1:5182/?offline=1.

Nếu chỉ muốn chạy từng phần: `pnpm db:up`, `pnpm server`, `pnpm dev:client`
trong các terminal riêng. `pnpm server` ưu tiên env do deployment cấp, nếu chưa có
DATABASE_URL thì dùng env local đã tạo trong `.cache`.

## Kiểm tra và build

```sh
pnpm assets:check
pnpm test
pnpm test:core
pnpm test:postgres
pnpm test:multiplayer
pnpm typecheck
pnpm typecheck:server
pnpm build:all
```

`test:postgres` chỉ dùng PostgreSQL riêng ở cổng 55482 và tạo/xóa database fixture riêng.
`test:multiplayer` tạo tài khoản/nhân vật test trên server local đang chạy, không chạy trên production.
Thông tin test nằm trong `.cache`, không commit. Để kiểm tra restart: chạy test, dừng/khởi động
lại game server, rồi `pnpm test:multiplayer --verify-restart` trước khi di chuyển nhân vật đó.
Bộ tests gốc đã được đưa sang; `test:core` là nhóm regression multiplayer được chọn.
Test media/catalog upstream cần media gốc nên không được coi là gate cho bộ art mới.

`build:all` build client, server, editor, admin, headless và Discord bot.
Editor: `/editor`, admin: `/admin`. Build không có nghĩa mọi tính năng editor/admin
đã được kiểm thử end-to-end. Headless dùng `pnpm env`; bot không tự khởi động.

## Giữ gì, thay gì

- Toàn bộ simulation giữ nguyên. `server/game.ts`, `server/db.ts`, `server/ws_auth.ts`
  và `src/net/online.ts` cũng giữ nguyên. Xem `PROVENANCE.json` và `upstream/RESTORED_FILES.json`.
- Giữ auth/account/character, movement, interest/snapshot, reconnect, lease, autosave,
  shutdown, social, economy, moderation và schema/migration có sẵn.
- Adapter mới chỉ nối world/spawn, asset riêng, bootstrap và lệnh chạy/proxy.
- Không sao chép bộ media, world placement cũ hay private implementation chưa có quyền MIT.
  Những script chuyên dựng mỹ thuật và media trong tài liệu không được nhập tự động.
- `upstream/` lưu package/build/deployment/docs tham khảo, **không phải cấu hình để chạy nguyên trạng**.
  Không dùng domain, channel, store identity hay cloud resources của WoC cho sản phẩm mới.
- Source native shells đã đưa sang để phát triển tiếp, chưa cài/build toàn bộ SDK native.

Các luồng và điểm mở rộng: [docs/MULTIPLAYER_ARCHITECTURE.md](docs/MULTIPLAYER_ARCHITECTURE.md).
Hướng dẫn asset: [ASSETS.md](ASSETS.md). Kết quả kiểm chứng: [VERIFICATION.md](VERIFICATION.md).

## World và asset riêng

`src/mit_test/world.ts` là world mẫu dùng chung; `scenery_layout.ts` định vị scenery.
`public/assets/manifest.json` khai báo GLB riêng. Các slot thiếu dùng hình mẫu bằng code.
Địa hình hiện tại được sinh bằng code. Khi sửa manifest collider/world, build lại cả
server và client. Asset chỉ đổi phần nhìn; map/NPC/quest cần nội dung/hành vi tương ứng.
Tên module `mit_test` được giữ từ giai đoạn thử để tránh đổi đường dẫn không cần thiết.

## Production và license

Đã có core multiplayer chạy được local, chưa phải một lần xác nhận sẵn sàng production.
Dockerfile mới build các target của fork; chưa kiểm thử build container hoàn chỉnh.
`.env.example` là cấu hình khung, không chứa secret thật. Cần cấu hình auth guards,
TLS, proxy/CDN, backup/monitoring, email/OAuth, brand và catalog riêng trước khi phát hành.
Static host/proxy hiện dùng để phát triển và tạo icon fallback cho URL media legacy.
Các dịch vụ wallet, payment, Discord, Steam/Epic cần cấu hình/quyền riêng và không được bật tự động.

Giữ MIT copyright Levy Street cho code gốc; adapter và hình mẫu mới có MIT, copyright gnad.
Dependency có license riêng trong `THIRD_PARTY_NOTICES.md` và `third_party/licenses`.
Không đồng nhất MIT source với quyền dùng mọi asset hoặc thương hiệu WoC.
Không có Git history/remote upstream trong folder. `.gitignore` loại dependencies,
build, cache, credentials và database test khỏi repo mới.
