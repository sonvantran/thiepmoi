
const CONFIG = {
  weddingDate: '2026-11-29T07:00:00+07:00',
  wishApiUrl: 'https://script.google.com/macros/s/AKfycby2DXcEe7qkWXJfGBPH61DBa3fZYCd7G1i-xV7mEpmznA1Xq2t6Ovy0XkdCyUEpTcVxew/exec',

  wishRefreshMs: 10000,
  bubbleGapMs: [3000, 5000],
  bubbleLifeMs: [5000, 7000],
  petalCount: 15,

  filmReel: { photos: [5, 1, 7, 4, 9, 2, 11], durationMs: 9300 },
};

const FAMILIES = [
  {
    role: 'Chú Rể',
    name: 'Trần Văn Sơn',
    bio: 'Chàng trai hiền lành, chu đáo và luôn đong đầy yêu thương.',
    photo: 'images/thumb/chure.JPG',
    photoAlt: 'Chú rể Văn Sơn',
    photoPosition: '50% 45%',
    photoFocus: '30% 0%',
    cupid: { side: 'l', img: 'images/thien-than-nu.png' },
    familyLabel: 'Nhà Trai',
    father: 'Ông Trần Văn Thanh',
    mother: 'Bà Tạ Thị Thạnh',
    address: 'Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội',
  },
  {
    role: 'Cô Dâu',
    name: 'Nguyễn Thị Thanh Nhàn',
    bio: 'Cô gái dịu dàng, tinh tế và đầy nhiệt huyết.',
    photo: 'images/thumb/codau1.JPG',
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

const SIDE = new URLSearchParams(location.search).get('ben') === 'gai' ? 'gai' : 'trai';

const EVENTS_BY_SIDE = {
  trai: [
    {
      badge: 'Tiệc Cưới',
      badgeClass: 'bg-red-100 text-burgundy',
      icon: 'fa-heart',
      accent: 'burgundy',
      title: 'Tiệc Cưới Nhà Trai',
      time: '17h Ngày 28 tháng 11 năm 2026',
      place: 'Nhà trai - Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội',
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
      place: 'Nhà trai - Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội',
      mapUrl: 'https://maps.app.goo.gl/FQakk4ESac3irEr37',
    },
  ],

  gai: [
    {
      badge: 'Tiệc Cưới',
      badgeClass: 'bg-red-100 text-burgundy',
      icon: 'fa-heart',
      accent: 'burgundy',
      title: 'Tiệc Cưới Nhà Gái',
      time: '17h Ngày 28 tháng 11 năm 2026',
      place: 'Nhà gái - Xóm Phú Cường, xã Phú Thịnh, Thái Nguyên',
      mapUrl: 'https://maps.app.goo.gl/BWRFewJQF7EShqdD8',
    },
    {
      badge: 'Lễ Vu Quy',
      badgeClass: 'bg-softrose/40 text-burgundy',
      icon: 'fa-heart',
      accent: 'burgundy',
      title: 'Lễ Vu Quy',
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
      place: 'Nhà trai - Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội',
      mapUrl: 'https://maps.app.goo.gl/FQakk4ESac3irEr37',
    },
  ],
};

const EVENTS = EVENTS_BY_SIDE[SIDE];

const GALLERY = {
  images: Array.from({ length: 12 }, (_, i) => `images/anh${String(i + 1).padStart(2, '0')}.JPG`)
  .map((src, i) => (i === 9 ? 'images/anh13.JPG' : src)),
  spans: [
    [3, 6, 2, 4], [3, 3, 1, 3], [3, 3, 1, 3], [2, 3, 1, 3], [2, 3, 1, 3], [2, 3, 2, 3],
    [2, 3, 1, 3], [2, 3, 1, 3], [2, 3, 2, 3], [6, 4, 2, 3], [3, 5, 1, 3], [3, 5, 1, 3],
  ],
  defaultSpan: [2, 3, 1, 3],

  focus: {
     'images/anh02.JPG': '50% 25%',
     'images/anh03.JPG': '50% 15%',
     'images/anh04.JPG': '50% 40%',
     'images/anh05.JPG': '50% 80%',
     'images/anh06.JPG': '50% 100%',
     'images/anh07.JPG': '50% 25%',
     'images/anh08.JPG': '50% 100%',
     'images/anh09.JPG': '50% 90%',
     'images/anh13.JPG': '50% 70%',
     'images/anh11.JPG': '50% 55%',
     'images/anh12.JPG': '50% 25%',
  },

  focusMobile: {
     'images/anh01.JPG': '50% 10%',
     'images/anh03.JPG': '50% 0%',
     'images/anh06.JPG': '50% 90%',
     'images/anh09.JPG': '50% 50%',
  },
};

const INITIAL_WISHES = [
  { name: 'Em Dũng', role: 'Đồng Nghiệp', message: 'Chúc hai anh chị trăm năm hạnh phúc, sớm đón quý tử nhé!', time: '' },
  { name: 'Thành', role: 'Bạn Chú Rể', message: 'Mừng ngày chung đôi của đôi vợ chồng trẻ! Chúc hai bạn luôn tràn ngập nụ cười.', time: '' },
];