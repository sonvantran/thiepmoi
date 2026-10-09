/* =====================================================================
   config.js — TOÀN BỘ nội dung & cài đặt có thể chỉnh nằm ở đây.
   Muốn đổi ngày giờ, địa chỉ, ảnh, thứ tự sự kiện... chỉ cần sửa file này.
   ===================================================================== */

/* ---------- Cài đặt chung ---------- */
const CONFIG = {
  // Mốc đếm ngược
  weddingDate: '2026-11-28T17:00:00+07:00',

  // Link Web App Google Apps Script (lưu lời chúc + RSVP vào Google Sheet).
  // Để trống '' = chỉ lưu tạm trên máy khách.
  wishApiUrl: 'https://script.google.com/macros/s/AKfycby2DXcEe7qkWXJfGBPH61DBa3fZYCd7G1i-xV7mEpmznA1Xq2t6Ovy0XkdCyUEpTcVxew/exec',

  wishRefreshMs: 10000,        // tải lại lời chúc mới từ Google Sheet
  bubbleGapMs: [3000, 5000],   // khoảng cách giữa 2 bong bóng lời chúc
  bubbleLifeMs: [5000, 7000],  // thời gian mỗi bong bóng hiển thị
  petalCount: 15,              // số trái tim rơi

  // Cuộn phim mở đầu: số thứ tự ảnh (anhXX.jpg) và thời lượng (ms)
  filmReel: { photos: [10, 1, 4, 7, 2, 9, 12], durationMs: 9300 },
};

/* ---------- Thông tin hai bên gia đình ----------
   Chỉnh ảnh đại diện:
   - photoPosition: phần nào của ảnh được giữ lại trong khung vuông ('X% Y%', mặc định '50% 50%')
   - photoZoom:     mức phóng to (mặc định 1 = không zoom)
   - photoFocus:    tâm zoom — chỉ có tác dụng khi photoZoom lớn hơn 1 */
const FAMILIES = [
  {
    role: 'Chú Rể',
    name: 'Trần Văn Sơn',
    bio: 'Chàng trai hiền lành, chu đáo và luôn đong đầy yêu thương.',
    photo: 'images/chure.jpg',
    photoAlt: 'Chú rể Văn Sơn',
    photoPosition: '50% 45%',
    photoFocus: '30% 0%',
    cupid: { side: 'l', img: 'images/thien-than-nu.png' },
    familyLabel: 'Nhà Trai',
    father: 'Ông Trần Văn Thanh',
    mother: 'Bà Tạ Thị Thạnh',
    address: 'Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, HN',
  },
  {
    role: 'Cô Dâu',
    name: 'Nguyễn Thị Thanh Nhàn',
    bio: 'Cô gái dịu dàng, tinh tế và đầy nhiệt huyết.',
    photo: 'images/codau1.jpg',
    photoAlt: 'Cô dâu Thanh Nhàn',
    photoPosition: '50% 90%',
    photoFocus: '59% 31%',
    cupid: { side: 'r', img: 'images/thien-than-nam.png' },
    familyLabel: 'Nhà Gái',
    father: 'Ông Nguyễn Văn Thắng',
    mother: 'Bà Nguyễn Thị Hương',
    address: 'Xóm Phú Cường, xã Phú Thịnh, Thái Nguyên',
  },
];

/* ---------- Sự kiện ----------
   accent: 'burgundy' | 'rosegold' (màu viền trái + icon)
   badgeClass: class Tailwind của nhãn nhỏ phía trên
   Thứ tự trong mảng = thứ tự hiển thị trên trang. */
const EVENTS = [
  {
    badge: 'Tiệc Cưới',
    badgeClass: 'bg-red-100 text-burgundy',
    icon: 'fa-heart',
    accent: 'burgundy',
    title: 'Tiệc Cưới Nhà Trai',
    time: '17h Ngày 28 tháng 11 năm 2026',
    place: 'Nhà trai - Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, HN',
    mapUrl: 'https://maps.app.goo.gl/FQakk4ESac3irEr37',
  },
  {
    badge: 'Lễ Vu Quy',
    badgeClass: 'bg-softrose/40 text-burgundy',
    icon: 'fa-heart',
    accent: 'burgundy',
    title: 'Lễ Ăn Hỏi & Đón Dâu Nhà Gái',
    time: '7h Ngày 29 tháng 11 năm 2026',
    place: 'Nhà gái - Xóm Phú Cường, xã Phú Thịnh, Thái Nguyên',
    mapUrl: 'https://maps.app.goo.gl/BWRFewJQF7EShqdD8',
  },
  {
    badge: 'Lễ Thành Hôn',
    badgeClass: 'bg-champagne text-rosegold',
    icon: 'fa-glass-cheers',
    accent: 'rosegold',
    title: 'Lễ Thành Hôn Nhà Trai',
    time: '11h Ngày 29 tháng 11 năm 2026',
    place: 'Nhà trai - Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, HN',
    mapUrl: 'https://maps.app.goo.gl/FQakk4ESac3irEr37',
  },
];

/* ---------- Album ảnh ----------
   spans[i] = [cột PC, hàng PC, cột mobile, hàng mobile] của ảnh thứ i
   (đã chia sẵn để 12 ảnh lấp đầy lưới, không để trống). */
const GALLERY = {
  images: Array.from({ length: 12 }, (_, i) => `images/anh${String(i + 1).padStart(2, '0')}.jpg`),
  spans: [
    [3, 6, 2, 4], [3, 3, 1, 3], [3, 3, 1, 3], [2, 3, 1, 3], [2, 3, 1, 3], [2, 3, 2, 3],
    [4, 3, 1, 3], [2, 3, 1, 3], [2, 3, 2, 4], [4, 3, 2, 3], [3, 4, 1, 3], [3, 4, 1, 3],
  ],
  defaultSpan: [2, 3, 1, 3],

  // Chỉnh phần ảnh nào được giữ lại trong ô (ảnh luôn bị cắt cho vừa ô). Định dạng 'X% Y%':
  //   Y: 0% = giữ phần trên của ảnh, 100% = giữ phần dưới   (kéo ảnh "lên/xuống")
  //   X: 0% = giữ phần bên trái, 100% = giữ phần bên phải   (kéo ảnh "trái/phải")
  // Ảnh không khai báo thì mặc định '50% 50%' (cắt ở giữa). Khóa là đường dẫn ảnh nên đổi thứ tự vẫn đúng.
  focus: {
     'images/anh02.jpg': '50% 25%',
     'images/anh03.jpg': '50% 15%',
     'images/anh04.jpg': '50% 40%',
     'images/anh05.jpg': '50% 80%',
     'images/anh06.jpg': '50% 100%',
     'images/anh07.jpg': '50% 45%',
     'images/anh08.jpg': '50% 100%',
     'images/anh09.jpg': '50% 90%',
     'images/anh10.jpg': '50% 5%',
     'images/anh11.jpg': '50% 85%',
     'images/anh12.jpg': '50% 35%',
  },
};

/* ---------- Lời chúc mẫu (hiện khi chưa có dữ liệu thật) ---------- */
const INITIAL_WISHES = [
  { name: 'Em Dũng', role: 'Đồng Nghiệp', message: 'Chúc hai anh chị trăm năm hạnh phúc, sớm đón quý tử nhé!', time: '' },
  { name: 'Thành', role: 'Bạn Chú Rể', message: 'Mừng ngày chung đôi của đôi vợ chồng trẻ! Chúc hai bạn luôn tràn ngập nụ cười.', time: '' },
];