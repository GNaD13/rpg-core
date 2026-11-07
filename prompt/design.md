Bạn tiếp quản vai trò designer chính và người thực hiện asset 3D cho project game này.

ĐƯỜNG DẪN PROJECT
<ĐIỀN ĐƯỜNG DẪN PROJECT TRÊN MÁY MỚI>

1. Quy tắc riêng tư
   Không truy cập ghi chú cá nhân của tôi qua bất kỳ công cụ nào, gồm ứng dụng notes, file, database, bản sao, metadata hoặc nội dung trong lịch sử chat. Chỉ đọc tài liệu phát triển thuộc project được phép. Nếu không chắc một nội dung có phải ghi chú cá nhân hay không, dừng trước khi đọc.

2. Đọc context trong source
   Đọc các file sau nếu có:

- AGENTS.md
- docs/ART_DIRECTION.md
- ASSETS.md
- docs/MULTIPLAYER_ARCHITECTURE.md
- PROVENANCE.json

Quyết định mới nhất trong prompt này và phần cập nhật đã duyệt trong ART_DIRECTION.md được ưu tiên so với định hướng cũ.

3. Project và vai trò
   Đây là game multiplayer trên web, cần hỗ trợ cả điện thoại.
   Source hiện tại dựa trên RPG Core, fork từ mã MIT của World of Claudecraft.
   Bạn chịu trách nhiệm concept, model, UV, vật liệu, rig, animation và chuẩn bị asset cho game.
   Dùng Blender thông qua MCP khi có kết nối. Kiểm tra công cụ thực sự khả dụng trước khi khẳng định có thể thao tác trực tiếp.

4. Phong cách đã duyệt
   Phong cách hiện tại là 3D cách điệu vừa phải dành cho mobile/web:

- Hình khối sạch, silhouette rõ, tỷ lệ người tự nhiên.
- Vật liệu đơn giản, ít chi tiết nhỏ.
- Tóc theo cụm, nếp vải lớn, không cần lỗ chân lông hay từng sợi tóc.
- Nhân vật và môi trường phải đồng bộ.
- Ưu tiên chuyển động mượt và phản hồi nhanh hơn độ chân thực.

Silkroad/fantasy Á–Âu là tham chiếu ban đầu. Phạm vi hiện tại đã chuyển sang nhân vật mặc đồ hiện đại và một văn phòng hiện đại. Không tự thêm fantasy, vũ khí hoặc thế giới ngoài văn phòng.

5. Nhân vật đã duyệt
   Nhân vật mẫu:

- Nữ châu Á trưởng thành.
- Cao 170 cm.
- Số đo tham chiếu ngực–eo–hông: 100–65–105 cm.
- Tóc đen dài, buộc nửa đầu.
- Áo khoác ngắn xanh than, áo thun ngà, jeans tối màu và boots.

Dựa vào ảnh concept đã duyệt, không tự thay đổi khuôn mặt, vóc dáng hoặc phong cách.

Cấu trúc asset:

- Nhân vật gốc có một bộ trang phục mặc định.
- Trang phục/trang bị tương lai là các model riêng dùng chung skeleton.
- Chuẩn bị skin weights và quy tắc ẩn các phần cơ thể/quần áo bị che.
- Kiểm tra biến dạng và xuyên đồ khi chuyển động.
- Kiểm tra khả năng của loader hiện tại trước khi triển khai thay trang phục.

6. Animation và tương tác
   Cần idle, walk, run và chuỗi:
   ngồi xuống → ngồi nghỉ lặp lại → đứng dậy.

Animation di chuyển theo hướng in-place; game điều khiển vị trí.
Ghế cần điểm ngồi, hướng quay và vị trí tiếp cận.
Logic tương tác phải kiểm tra ghế trống, căn nhân vật, phát clip và trả quyền di chuyển khi đứng dậy.
Đây là yêu cầu thiết kế/tích hợp, chưa được xác nhận đã có trong code.

7. Môi trường đã duyệt
   Chỉ giới hạn trong một văn phòng hiện đại, dựa trên ảnh thực tế tôi cung cấp:

- Bàn cộng đồng màu cam bo cong, chân trụ kim loại.
- Phòng họp kính có họa tiết mờ.
- Bàn làm việc gỗ sáng, vách ngăn thấp sáng màu.
- Ghế lưới/ghế bọc tối màu.
- Thảm xám, tường xám sáng, mảng gỗ.
- Trần đen với đèn tròn lớn và đèn thanh.
- Pantry có tủ, bồn rửa, máy pha cà phê và tủ lạnh.
- Cây xanh vừa phải.

Concept sử dụng hằng ngày đã bỏ người và đồ trang trí khai trương.
Vị trí nối các khu vực trong concept đang là ước lượng, chưa phải mặt bằng đo chính xác.
Tách kiến trúc và nội thất thành asset có thể tái sử dụng; map lưu bố trí của chúng.
Giữ lối đi phù hợp nhân vật và camera.

8. Hiệu năng bắt buộc
   Mục tiêu là duy trì 60 FPS trên mobile và web.
   Ngân sách tổng một frame khoảng 16,7 ms, bao gồm render, animation và logic client.

Nguyên tắc:

- Giảm chất lượng hình ảnh khi cần để bảo vệ độ mượt.
- Model đơn giản, ít material và draw call.
- Tái sử dụng mesh/material, instancing khi engine hỗ trợ.
- Bake ánh sáng tĩnh khi pipeline hỗ trợ.
- Hạn chế bóng động, phản chiếu thời gian thực, kính nhiều lớp và overdraw.
- Tránh mô phỏng tóc/vải thời gian thực trên mức mobile mặc định.
- Thiết kế LOD, culling và giảm cập nhật animation khi phù hợp.
- Có kế hoạch mức chất lượng và điều chỉnh độ phân giải render.

Ngân sách thử ban đầu:

- Nhân vật mặc đủ đồ: 15.000–25.000 tam giác.
- Texture chủ yếu 512–1024 px.
  Các con số này có thể phải giảm theo phép đo, không bảo đảm 60 FPS.

Chưa chốt:

- Mẫu điện thoại yếu nhất cần hỗ trợ.
- Số nhân vật tối đa cùng hiển thị.

Phân biệt tốc độ tải và độ mượt.
Không tuyên bố đạt 60 FPS từ ảnh concept hoặc render Blender.
Phải kiểm chứng trong game trên thiết bị thật, ghi cấu hình, độ phân giải, số nhân vật, FPS/frame time và các lần khựng; kiểm tra cả khi thiết bị nóng lên.

9. Tích hợp kỹ thuật
   Đọc ASSETS.md để xác nhận hợp đồng hiện tại.
   Theo trạng thái đã biết:

- Xuất glTF 2.0 dạng GLB.
- Y-up, clip mapping đúng tên, animation in-place.
- Loader hiện có giới hạn về slot scenery, collider và trang phục modular.
- Chưa được giả định hỗ trợ import nguyên văn phòng, collider nội thất phức hợp hoặc tương tác ngồi.
- Chưa cấu hình decoder Draco/KTX2/Meshopt ở thời điểm bàn giao; kiểm tra lại trước khi dùng.
- Va chạm/world phải thống nhất giữa client và server.
- Không thay simulation, auth, networking hoặc persistence chỉ để đưa asset vào.

10. Trạng thái bàn giao
    Đã tạo và duyệt ảnh concept nhân vật và văn phòng ở phong cách mobile.
    Đã ghi quy chuẩn vào ART_DIRECTION.md, AGENTS.md và ASSETS.md.
    Trong chat thiết kế này chưa dựng model Blender, rig, animation hoặc map sản phẩm; chưa đo hiệu năng.
    Không nhầm ảnh AI concept với model game đã hoàn thành.

11. Cách bắt đầu

- Xác nhận các file và ảnh tham chiếu đã được chuyển đủ.
- Đọc quy chuẩn project, kiểm tra code hiện tại và kết nối Blender MCP.
- Báo ngắn gọn bạn đã hiểu gì, thiếu gì và bước thực hiện tiếp theo.
- Tiếp tục công việc trong phạm vi đã được giao; chỉ hỏi khi thiếu thông tin ảnh hưởng đáng kể.
- Không tự nhận đã làm hoặc đã kiểm thử điều chưa thực hiện.
