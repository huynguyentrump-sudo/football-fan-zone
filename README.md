# ⚽ Football Fan Zone (FFZ)

Website dành cho người yêu bóng đá: cập nhật tin tức, xem lịch & kết quả, giao lưu với fan khác và chơi quiz để leo bảng xếp hạng.

**Nhóm:** Football Fan Zone · **Lớp:** 12.2 · **Thành viên:** Huy, Tâm, Nguyên, Khoa, Hiển
**Công nghệ:** HTML + CSS + JavaScript thuần (không cần máy chủ, không cần cơ sở dữ liệu)

---

## 1. Cấu trúc thư mục

Tất cả file nằm chung một thư mục (không có thư mục con) để upload lên GitHub dễ dàng:

```
index.html · news.html · match.html · community.html · quiz.html   (5 trang)
style.css        Giao diện chung (màu, font, bản điện thoại)
data.js          DỮ LIỆU MẪU: tin tức, trận đấu, câu hỏi quiz, bài đăng mẫu
common.js        Dùng chung: menu, chân trang, lưu trữ, tên fan, tính điểm
home.js / news.js / match.js / community.js / quiz.js / ranking.js   Code từng trang
```

## 2. Tính năng & file tương ứng (dùng để chia phần demo)

| Tính năng | Loại | Trang | File chính | Demo gì trong video |
|---|---|---|---|---|
| Trang chủ + menu chung | – | index.html | `home.js`, `common.js`, `style.css` | Banner, tin nổi bật, trận đáng chú ý, 4 nút khám phá, menu ☰ trên điện thoại |
| News feed | Must-have | news.html | `news.js` | Lọc chuyên mục, gõ tìm "Arsenal", bấm đọc 1 bài, quay lại |
| Match Center | Must-have | match.html | `match.js` | Lọc Đã đá / Sắp đá / theo đội, mở chi tiết trận MU–LIV: diễn biến, thống kê |
| Bình chọn & dự đoán | Nice-to-have | match.html | `match.js` | Bình chọn cầu thủ xuất sắc (+2đ), dự đoán tỉ số trận sắp đá (+5đ) |
| Fan Community | Must-have | community.html | `community.js` | Đăng bài, thích, bình luận, lọc chủ đề, xoá bài của mình, F5 vẫn còn |
| Football Quiz | Nice-to-have | quiz.html | `quiz.js` | Chọn đáp án → Kiểm tra, dùng gợi ý, xem kết quả cuối |
| Fan Ranking | Nice-to-have | quiz.html + trang chủ | `ranking.js` | Lưu điểm, thấy tên mình nhảy hạng, điểm trên góc phải menu tăng |
| Dữ liệu mẫu | – | tất cả | `data.js` | Sửa 1 tin/1 câu hỏi trong data.js → web đổi theo |

> **Lưu ý:** Mỗi bạn phải demo phần mình làm. Nhóm chốt ai phụ trách dòng nào trong bảng trên, rồi **mỗi bạn đọc kỹ file của mình** để giải thích được code chạy thế nào khi thầy/cô vấn đáp.

## 3. Chạy thử trên máy

Cách nhanh nhất: mở file `index.html` bằng Chrome (nhấp đúp).
Nếu dùng VS Code: cài extension **Live Server** → chuột phải `index.html` → *Open with Live Server*.

## 4. Đưa web lên mạng bằng Vercel (link dạng `ten-du-an.vercel.app`)

**Bước 1. Đưa code lên GitHub** (cũng dùng làm nơi lưu source code)
1. Vào https://github.com → đăng nhập/đăng ký.
2. Bấm **New repository** → đặt tên `football-fan-zone` → chọn **Public** → **Create repository**.
3. Bấm **uploading an existing file** → chọn **tất cả 15 file** trong thư mục (Cmd+A / Ctrl+A) kéo vào → **Commit changes**.

**Bước 2. Triển khai trên Vercel**
1. Vào https://vercel.com → **Sign Up** → chọn **Continue with GitHub**.
2. Bấm **Add New… → Project** → chọn repo `football-fan-zone` → **Import**.
3. *Framework Preset* để **Other**, không cần sửa gì thêm → **Deploy**.
4. Chờ khoảng 30 giây → nhận link `football-fan-zone.vercel.app` (hoặc tên tương tự nếu trùng).

**Bước 3. Kiểm tra (bắt buộc theo hướng dẫn nộp bài)**
- Mở link trong **cửa sổ ẩn danh** (Ctrl+Shift+N) và trên **điện thoại**.
- Bấm thử tất cả tính năng sẽ demo trong video, trên chính link này.

**Sửa code sau khi đã deploy:** sửa file trên GitHub (bấm biểu tượng ✏️) → Commit → Vercel tự cập nhật sau khoảng 30 giây.

**Phương án dự phòng:** vào https://app.netlify.com/drop → kéo thả thư mục `football-fan-zone` → có link ngay.

## 5. Link Drive source code

Tải file `football-fan-zone.zip` lên Google Drive → Chia sẻ → **Bất kỳ ai có đường liên kết** → Người xem → copy link nộp.

## 6. Sửa nội dung

Mọi nội dung nằm trong `js/data.js`:
- **Thêm tin:** chép một khối `{ id: ..., title: ..., ... }` trong `news`, đổi `id` thành số mới.
- **Thêm câu quiz:** chép một khối trong `quiz`. `answer` là vị trí đáp án đúng: 0 = A, 1 = B, 2 = C, 3 = D.
- **Dùng ảnh thật:** upload ảnh lên cùng chỗ với các file khác, rồi ghi `image: "ten-anh.jpg"` (tên file viết thường, không dấu, không khoảng trắng, vì Vercel phân biệt chữ hoa/thường).

## 7. Cách lưu dữ liệu (để trả lời khi vấn đáp)

- Bài đăng, bình luận, lượt thích, tên fan, điểm quiz, dự đoán… được lưu bằng **localStorage** của trình duyệt. Tải lại trang (F5) vẫn còn.
- Mỗi máy/trình duyệt có dữ liệu riêng: bài bạn đăng trên máy bạn thì máy thầy/cô **không thấy**. Đây là giới hạn của web tĩnh không có máy chủ.
- Muốn bắt đầu lại từ đầu (VD: trước khi quay video): mở **cửa sổ ẩn danh** mới.

## 8. Gợi ý kịch bản video (tối đa 8 phút)

| Phần | Thời lượng | Nội dung |
|---|---|---|
| Mở đầu | ~45 giây | Cả nhóm chào. Nêu: nhóm Football Fan Zone, lớp 12.2, người dùng mục tiêu là học sinh/fan bóng đá muốn xem tin, tỉ số và giao lưu ở một nơi gọn gàng, không rối như các trang lớn. |
| Từng thành viên | ~1 phút/bạn | Họ tên + vai trò → mình làm trang/tính năng nào → demo trên link Vercel → **1 điều AI giúp được + 1 chỗ AI làm sai mà mình đã phát hiện và sửa** (tự ghi lại trong lúc làm, đừng bịa). |
| Luồng chính | ~1 phút | Trang chủ → bấm tin nổi bật đọc bài → sang Trận đấu xem MU 2–1 LIV, bình chọn MOTM → dự đoán trận sắp đá → sang Cộng đồng đăng bình luận → sang Quiz chơi và lưu điểm → thấy tên mình trên BXH. |
| Kết | ~45 giây | Hạn chế + kế hoạch cuối kì (xem mục 9), cảm ơn. |

## 9. Hạn chế hiện tại & hướng phát triển đến cuối kì

- Tin tức và tỉ số là dữ liệu mẫu, chưa cập nhật tự động → cuối kì có thể dùng API bóng đá.
- Bài đăng chỉ lưu trên từng trình duyệt → cuối kì có thể dùng Firebase để mọi người thấy bài của nhau.
- Bảng xếp hạng gồm fan mẫu + bạn → cần máy chủ để xếp hạng thật giữa nhiều người.
- Trận "sắp đá" chưa tự chấm điểm dự đoán đúng/sai.

## 10. Checklist trước khi nộp

- [ ] Link Vercel mở được trong cửa sổ ẩn danh và trên điện thoại
- [ ] Mọi tính năng demo trong video chạy trên đúng link đã nộp
- [ ] Video ≤ 8 phút, đủ 5 bạn hiện mặt và tự nói, mp4 ≥ 720p
- [ ] Tên video: `12.2_N?_FootballFanZone` (điền số nhóm)
- [ ] Link video & link Drive source code mở được khi chưa đăng nhập
- [ ] Bảng nộp bài mục C: đủ họ tên, nhiệm vụ, mốc thời gian nói trong video
