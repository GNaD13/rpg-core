# Art Direction: văn phòng hiện đại, 3D cách điệu cho mobile/web

Phiên bản 0.2, ngày 2026-11-03. Áp dụng cho project mới dựa trên RPG Core.

## Quyết định cập nhật đã duyệt: mobile/web, mục tiêu 60 FPS

Phần này được chủ project chốt ngày 2026-11-03 và được ưu tiên khi khác với
định hướng fantasy ban đầu ở các phần bên dưới. Silkroad là tham chiếu lịch sử;
phạm vi hiện tại là một văn phòng hiện đại, không bắt buộc thêm yếu tố fantasy.

### Phong cách và phạm vi

- Dùng 3D cách điệu vừa phải, hình khối rõ, tỷ lệ người tự nhiên; ưu tiên khả năng
  đọc hình và phản hồi nhanh hơn độ chân thực. Hai concept mobile của nhân vật
  và văn phòng đã được duyệt về hướng hình ảnh, chưa phải model đã kiểm chứng hiệu năng.
- Nhân vật mẫu: nữ châu Á trưởng thành, cao 170 cm, số đo tham chiếu 100–65–105 cm;
  áo khoác xanh than, áo ngà, quần tối và boots. Tóc tạo thành cụm, ít nếp vải,
  không cần lỗ chân lông, từng sợi tóc hay chi tiết may nhỏ.
- Nhân vật có một bộ đồ mặc định; trang phục tương lai là asset riêng dùng chung
  skeleton, có skin weights và quy tắc ẩn phần cơ thể/quần áo bị che.
- Văn phòng dựa trên ảnh thực tế: bàn cam bo cong, phòng họp kính, bàn có vách thấp,
  ghế đen, thảm xám, gỗ và hệ đèn tròn/đèn thanh. Mặt bằng chưa có số đo là ước lượng.
- Bộ chuyển động cần có idle/walk/run và chuỗi ngồi xuống/ngồi nghỉ/đứng dậy.
  Ghế cần điểm ngồi, hướng và vị trí tiếp cận; tương tác ngồi cần tích hợp game.

### Quy tắc hiệu năng bắt buộc khi thiết kế

- Mục tiêu là duy trì 60 FPS trên mobile và web ở thiết bị tham chiếu được thống nhất;
  ngân sách tổng cho một frame khoảng 16,7 ms, gồm render, animation và logic client.
  Không dùng mục tiêu 30 FPS cũ làm tiêu chí nghiệm thu.
- Ưu tiên giảm chất lượng hình ảnh để bảo vệ độ mượt: model đơn giản, ít material,
  ít draw call, texture dùng chung/atlas khi phù hợp; giữ silhouette ở khoảng cách chơi.
- Bake ánh sáng tĩnh khi pipeline hỗ trợ; hạn chế đèn/bóng động, kính nhiều lớp,
  phản chiếu thời gian thực, hậu kỳ và hiệu ứng trong suốt gây overdraw.
- Tái sử dụng mesh/material cho nội thất; dùng instancing khi engine hỗ trợ.
  Thiết kế LOD, culling và giảm cập nhật animation cho nhân vật xa/ngoài tầm nhìn.
- Dùng chung skeleton; giới hạn xương phụ, tránh mô phỏng tóc/vải thời gian thực
  trên mức mobile mặc định. Kiểm tra xuyên đồ trong cả đi, chạy và ngồi.
- Có kế hoạch mức chất lượng và điều chỉnh độ phân giải render theo tải;
  đây là yêu cầu triển khai, không phải tính năng hiện đã có.
- Texture 512–1024 px và 15.000–25.000 tam giác cho nhân vật mặc đủ đồ chỉ là
  ngân sách thử ban đầu, không phải ngưỡng bảo đảm 60 FPS. Điều chỉnh theo phép đo.
- Nén geometry/texture chỉ được dùng sau khi loader hỗ trợ và được kiểm tra trên
  trình duyệt mục tiêu; hợp đồng GLB hiện tại trong ASSETS.md vẫn có hiệu lực.
- Đánh giá tốc độ tải riêng với FPS; file nhỏ không tự bảo đảm chơi mượt.

### Kiểm chứng trước khi duyệt asset sản phẩm

- Dựng cảnh mẫu có văn phòng, nhân vật mặc đồ và hành động ngồi; đo trên điện thoại
  thật và trình duyệt mục tiêu, gồm tình huống nhiều nhân vật cùng xuất hiện.
- Ghi thiết bị, trình duyệt, độ phân giải, mức chất lượng, số nhân vật hiển thị,
  frame time CPU/GPU khi đo được, FPS và các lần khựng; chạy đủ lâu để kiểm tra
  ảnh hưởng nhiệt độ, không chỉ chụp FPS trong cảnh đứng yên.
- Chốt thiết bị yếu nhất và số nhân vật đồng thời trước khi xác lập ngân sách cuối.
  Hiện hai thông số này chưa được chủ project cung cấp.
- Không tuyên bố đạt 60 FPS dựa trên ảnh concept hoặc render Blender. Chỉ xác nhận
  khi đã đo trong game ở cấu hình và tình huống thử được ghi rõ.

## Định hướng ban đầu (tham khảo, áp dụng nếu không mâu thuẫn cập nhật)

### Những quyết định ban đầu đã được chủ project chốt

- Silkroad Online là tham chiếu mỹ thuật ban đầu.
- Cho phép cả chất lượng đồ họa hiện đại lẫn thiết kế/bối cảnh pha hiện đại.
- Thế giới là fantasy giao thoa cổ điển–hiện đại, không bị giới hạn trong một thời kỳ lịch sử.

Các bảng màu, tỷ lệ và ngân sách bên dưới là hướng triển khai ban đầu của art direction.
Chúng cần được kiểm chứng bằng concept và asset chạy trong game, chưa phải lựa chọn
chi tiết đã được chủ project duyệt riêng. Vùng văn hóa đầu tiên chưa được chốt.

## Định nghĩa hình ảnh

Một thế giới fantasy Á–Âu của những hành trình, giao thương, võ nghệ và phép thuật,
nơi di sản văn hóa cổ điển cùng tồn tại với thiết kế đương đại và công nghệ fantasy.
Nhân vật có tỷ lệ gần người thật, hình khối thanh thoát, phục trang có cấu trúc và
vũ khí dễ nhận diện. Vật liệu và ánh sáng có chiều sâu, giữ được vẻ giàu không khí
của một MMORPG và sự rõ ràng khi nhiều người cùng xuất hiện trên màn hình.

Silkroad là điểm xuất phát về cảm giác thẩm mỹ. Project phát triển thiết kế gốc,
nhận diện riêng và thư viện asset riêng. Tham chiếu không quyết định gameplay,
class, nghề nghiệp, bản đồ hoặc hệ thống thương mại của project.

## Ngôn ngữ tạo hình chung

| Thành phần | Quy chuẩn triển khai ban đầu |
| --- | --- |
| Nhân vật | Tỷ lệ cơ thể tự nhiên, khoảng 7.5 đến 8 đầu; silhouette rõ ở camera thứ ba; vẻ linh hoạt và có trọng lượng |
| Trang phục | Phối lớp vải, da, giáp và phụ kiện; võ phục, áo choàng, giáp lịch sử có thể kết hợp áo khoác may hiện đại, đai chức năng và giày đương đại |
| Vũ khí | Hình dáng nhận diện rõ; kết cấu, chất liệu và chi tiết trang trí cùng ngôn ngữ với phục trang; mức độ công nghệ được thể hiện có chủ ý |
| Kiến trúc | Tổ chức không gian và nhịp hình lấy cảm hứng Á Đông, Trung Á, châu Âu; có thể kết hợp kính, kim loại gia công và tiện ích hiện đại |
| Địa hình | Địa chất thuyết phục, mảng lớn đọc rõ; màu đất, đá, cây và dấu vết sinh hoạt gắn với từng vùng |
| Vật liệu | Bề mặt PBR có roughness, normal và mức độ hao mòn phù hợp; texture có tính mỹ thuật, phục vụ hình khối và khoảng cách camera |
| Ánh sáng | Phân cấp sáng rõ, ánh sáng môi trường mềm, có điểm nhấn dẫn mắt; nhân vật và dấu hiệu gameplay luôn đọc được |
| Animation | Chuyển động có trọng tâm, anticipation và follow-through; đòn đánh rõ nhịp, silhouette dễ đọc trong đám đông |
| VFX | Phép thuật và công nghệ có màu nhận diện theo chức năng; vùng ảnh hưởng, hướng đòn và thời điểm trúng rõ ràng |
| UI và icon | Bố cục đương đại, chữ dễ đọc; đường viền, họa tiết và vật liệu gợi ngôn ngữ của thế giới |

## Cách kết hợp cổ điển và hiện đại

Mỗi asset hoặc bộ asset cần có một ý tưởng thống nhất: công năng, nguồn gốc văn hóa,
vật liệu, phương pháp chế tạo và mức độ công nghệ. Chi tiết cổ điển và hiện đại cùng
giải thích được vì sao thiết kế có hình dáng đó.

Ví dụ thiết kế phù hợp để khám phá:

- Chiến binh mặc áo khoác cắt may hiện đại trên võ phục, giáp kim loại có hoa văn cùng hệ.
- Trạm giao thương có mái ngói, chân tường đá, mái che kim loại và bảng chỉ dẫn phát sáng.
- Thương nhân dùng trang phục nhiều lớp, túi chức năng và thiết bị định vị fantasy.
- Lưỡi kiếm truyền thống kết hợp lõi năng lượng hoặc cơ cấu gia công hiện đại.

Mức độ hiện đại được chốt theo vùng/faction/bộ trang bị để giữ tính nhất quán.
Súng, phương tiện, robot hoặc thiết bị khác có thể được nghiên cứu về concept;
việc đưa chúng thành tính năng chơi cần quyết định gameplay và tích hợp vào core riêng.

## Bảng màu khởi điểm, cần thử trên concept

| Vai trò | Màu gợi ý | Hex |
| --- | --- | --- |
| Nền đất và kiến trúc ấm | Cát sa thạch | `#B99A73` |
| Khối tối và kim loại | Xanh than | `#263440` |
| Vải sáng và điểm nghỉ | Ngà ấm | `#D9D0BB` |
| Điểm nhấn văn hóa | Đỏ son | `#9E4238` |
| Trang trí và kim loại quý | Đồng vàng | `#AF8949` |
| Phép thuật/công nghệ | Lam ngọc | `#4BA6AE` |
| Cây và vật liệu tự nhiên | Xanh ngọc trầm | `#4E7569` |

Đây là palette để thử sự hòa hợp, không phải bảng màu bắt buộc cho mọi biome hay
faction. Màu nhấn có diện tích và độ sáng được kiểm soát; giá trị sáng/tối vẫn phải
phân biệt nhân vật, nền, mục tiêu và tín hiệu chiến đấu.

## Quy chuẩn khi phát triển asset

Mỗi asset cần có brief ghi rõ vùng/faction, công năng, silhouette, vật liệu, palette,
chi tiết cổ điển, chi tiết hiện đại và khoảng cách camera dự kiến. Kèm nguồn gốc,
tác giả và license theo quy trình ở ASSETS.md.

Chất lượng hiện đại cần được thể hiện ở tỷ lệ, topology, texture, vật liệu và ánh sáng.
Mức polygon, số material, kích thước texture, LOD và số đèn được đo trên game web
multiplayer thực tế. Chưa đặt một ngân sách cố định trước khi có asset và máy tham chiếu.
Chi tiết nhỏ ưu tiên bake vào texture; silhouette và tín hiệu gameplay được giữ ở LOD xa.

Hợp đồng kỹ thuật hiện tại tiếp tục theo ASSETS.md: GLB, Y-up, clip mapping,
animation in-place và collider thống nhất giữa server/client. Thay art direction
không thay simulation, auth, networking hay persistence của WoC.

## Bộ mẫu để kiểm chứng hướng đi

Sau khi chốt vùng văn hóa mở đầu, tạo một bộ mẫu đồng nhất gồm:

1. Một nhân vật có một bộ trang phục giao thoa cổ điển–hiện đại.
2. Một vũ khí hoặc phụ kiện mang cùng ngôn ngữ tạo hình.
3. Một công trình nhỏ với một chi tiết hiện đại dễ nhận diện.
4. Một cụm địa hình, cây/đá và vật dụng để kiểm tra sự hòa hợp.
5. Một hiệu ứng phép thuật/công nghệ nhỏ.

Duyệt cả concept và cảnh chạy trong game: tỷ lệ, silhouette, màu, vật liệu, ánh sáng,
animation, va chạm và hiệu năng khi có nhiều bản sao. Bộ này trở thành mẫu chuẩn
để mở rộng catalog sau khi chủ project duyệt hình ảnh.

## Tham chiếu và trạng thái

- Tham chiếu do chủ project chọn: Silkroad Online, tạm hiểu là bản PC cổ điển.
- [Trang chính thức Silkroad Online](https://www.joymax.com/silkroad/).
- [Trang multimedia của nhà phát hành Gamegami](https://silkroad.gamegami.com/multimedia.php).
- Các quy chuẩn và palette trong tài liệu này là đề xuất cho project mới, không phải
  mô tả chính thức về mỹ thuật Silkroad hoặc bằng chứng đã duyệt asset cụ thể.
- Chưa tạo hoặc thay model/texture, chỉnh renderer hay thay gameplay trong lần chốt này.
