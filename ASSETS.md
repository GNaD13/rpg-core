# Asset riêng

Quy chuẩn mỹ thuật của project: [Art Direction](docs/ART_DIRECTION.md).
Hướng hiện tại đã duyệt là văn phòng hiện đại và nhân vật 3D cách điệu vừa phải cho
mobile/web, mục tiêu duy trì 60 FPS (~16,7 ms cho toàn bộ frame). Ưu tiên độ mượt hơn
độ chân thực; tuân theo phần cập nhật mới nhất trong Art Direction và hợp đồng dưới đây.
Ngân sách asset phải được kiểm chứng trong game; chưa chốt thiết bị yếu nhất và số
nhân vật hiển thị đồng thời. Yêu cầu thay trang phục, tương tác ngồi, LOD và mức chất
lượng là mục tiêu phát triển, không có nghĩa adapter hiện tại đã hỗ trợ chúng.

Không cần khôi phục media WoC để chạy. Manifest mặc định trống dùng hình mẫu bằng code.

## Ví dụ

Đặt file vào `public/assets/`, rồi sửa `public/assets/manifest.json`:

```json
{
  "version": 1,
  "character": {
    "url": "/assets/hero.glb",
    "height": 2,
    "clips": { "idle": "Idle", "walk": "Walk", "run": "Run", "attack": "Attack", "death": "Death" }
  },
  "scenery": {
    "house": {
      "url": "/assets/house.glb",
      "height": 5.5,
      "collider": { "width": 6, "depth": 5, "height": 3.6 }
    }
  }
}
```

Đây là ví dụ cấu hình, chưa có `hero.glb`/`house.glb` trong repo.
Chỉ `idle` và `walk` bắt buộc. Run/attack thiếu dùng walk, death thiếu dùng idle.
Không khai báo clip không có trong GLB; game sẽ báo lỗi trước khi boot.
`character: null` dùng nhân vật mẫu. `scenery: {}` dùng scenery mẫu.
Các key scenery hỗ trợ: `tree`, `rock`, `house`, `chest`.

## Hợp đồng model

- glTF 2.0, dạng `.glb` tự chứa geometry, animation và texture PNG/JPEG.
  Bản starter chưa cấu hình decoder Draco/KTX2/Meshopt: xuất GLB không nén các định dạng đó.
- URL phải bắt đầu bằng `/assets/`, không URL từ xa, query, percent-encoding hay `..`.
  Dùng tên file chữ/số/gạch ngang/gạch dưới, không khoảng trắng.
- Y hướng lên. `height` là chiều cao cuối cùng trong world (yard theo quy ước WoC).
  Loader scale đồng đều, đưa chân xuống Y=0 và đưa tâm bounding box về X=Z=0.
  Model hướng chính diện theo +Z của adapter; nếu bị quay ngược hãy chỉnh orientation lúc export.
- Nhân vật: đặt animation clip tên duy nhất và mapping đúng manifest.
  Chuyển động đi bộ nên tại chỗ (in-place), không root motion; simulation điều khiển vị trí.
  Adapter dùng chung một model cho mọi nhân vật; chưa hỗ trợ ghép trang bị/hair/armor của WoC.
  Vóc dáng nhân vật nên khoảng 2 yard để phù hợp camera/capsule hiện tại.
- Scenery: `collider` là hộp va chạm đặt tại tâm X/Z, đáy nằm trên đất.
  Kích thước phải đo theo model **sau khi scale về `height`**, theo trục world X/Z.
  Nhà/đá/rương: hộp nên phủ khối đặc; cây: hộp chỉ phủ thân, tán có thể vươn ra ngoài.
  Không tự sinh collider từ toàn bộ bounding box vì tán cây/mái nhà thường không phải khối đặc.
  Hiện chưa có xoay scenery trong layout và chưa có compound/interior collider cho nhà rỗng.
- Nhà/rương vẫn là scenery đặc để testing. Model có cánh cửa/nắp không tự tạo logic mở/loot.
- Một GLB có lỗi hoặc clip sai sẽ chặn boot với thông báo cấu hình. Console có chi tiết.

Địa hình hiện tại là mesh sinh bằng code, không cần tải terrain asset. Đổi độ cao/map ở
`src/mit_test/world.ts`. Bộ terrain material/splat đẹp, skybox, audio và VFX cần registry
riêng khi sản phẩm cần; không trỏ lại media gốc.

## Quy trình

1. Xuất một GLB nhỏ và tự kiểm tra geometry/texture/clip trong phần mềm 3D.
2. Đưa file vào `public/assets`, khai báo một slot trong manifest.
3. `pnpm assets:check` kiểm tra file/schema; `pnpm dev` build và khởi động.
4. Kiểm tra animation, chân chạm đất, hướng nhìn, collider và camera trong game.
5. Sửa layout/collider và lặp lại; sau đó thay slot tiếp theo.

Kiểm tra transport bằng GLB tự tạo, không cần file ngoài:

```sh
pnpm build
node scripts/asset-fixture.mjs
pnpm preview
```

Fixture thay manifest **trong dist** bằng model hộp có Idle/Walk và PNG nhúng.
Manifest trong `public/assets` không đổi. Chạy lại `pnpm build` để trở về hình mẫu mặc định.
Không dùng fixture này làm art sản phẩm.

Ghi nguồn/tác giả/license cho từng asset riêng trong `public/assets/CREDITS.md` khi bắt đầu
thêm asset thật. Model, rig, animation, texture, font và âm thanh phải đều có quyền sử dụng phù hợp.

## Multiplayer

World và collider được build vào cả hai host. Khi thay collider trong manifest hoặc
địa hình/world layout, rebuild và restart cả server lẫn client. Loader đối chiếu
manifest runtime với collider đã build để ngăn lệch va chạm. Không chỉ chép GLB vào
server đang chạy rồi thay kích thước collider. Asset fixture hiện chỉ thay nhân vật,
giữ scenery/collider mặc định. Editor playtest không tự publish world vào realm.
