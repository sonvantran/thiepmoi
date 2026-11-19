// js/i18n.js — chọn ngôn ngữ qua ?ngonngu=en | kr (không có = tiếng Việt)
const LANG = (() => {
  let l = (new URLSearchParams(location.search).get('ngonngu') || 'vi').toLowerCase();
  if (l === 'kr') l = 'ko';
  if (l === 'cn' || l === 'zh-cn') l = 'zh';
  return ['vi', 'en', 'ko', 'zh'].includes(l) ? l : 'vi';
})();

// 'Chữ tiếng Việt gốc': ['English', '한국어']

const T = {
  // ---- Bìa & header ----
  'Save The Date': ['Save The Date', '날짜를 기억해 주세요'],
  '"Trân trọng kính mời quý vị tới tham dự lễ thành hôn của chúng tôi"': ['"We warmly invite you to join us in celebrating our wedding"', '"저희 두 사람의 결혼식에 귀한 걸음 하시어 자리를 빛내 주시면 감사하겠습니다"'],
  'Kính mời': ['Dear', '초대 손님'],
  'CHẠM ĐỂ MỞ THIỆP': ['TAP TO OPEN', '터치하여 청첩장 열기'],
  'Cặp Đôi': ['Couple', '신랑·신부'],
  'Sự Kiện': ['Events', '행사 안내'],
  'Album Ảnh': ['Gallery', '앨범'],
  'Mừng Cưới': ['Gifts', '축의금'],
  'Sổ Lưu Bút': ['Guestbook', '방명록'],
  'Xác Nhận Tham Dự': ['RSVP', '참석 여부 확인'],
  // ---- Hero ----
  'Chúng Tôi Sắp Kết Hôn': ["We're Getting Married", '저희 결혼합니다'],
  'Hành trình yêu thương bước sang trang mới rực rỡ và đong đầy hạnh phúc.': ['Our journey of love turns to a new, radiant chapter filled with happiness.', '사랑의 여정이 찬란하고 행복 가득한 새 장을 맞이합니다.'],
  'Ngày': ['Days', '일'], 'Giờ': ['Hours', '시간'], 'Phút': ['Minutes', '분'], 'Giây': ['Seconds', '초'],
  // ---- Gia đình ----
  'Chú Rể & Cô Dâu': ['Groom & Bride', '신랑 & 신부'],
  'Thông Tin Hai Bên Gia Đình': ['Our Families', '양가 가족 소개'],
  'Chú Rể': ['Groom', '신랑'], 'Cô Dâu': ['Bride', '신부'],
  'Chàng trai hiền lành, chu đáo và luôn đong đầy yêu thương.': ['A gentle, thoughtful man, always full of love.', '다정하고 배려 깊으며 사랑이 넘치는 사람입니다.'],
  'Cô gái dịu dàng, tinh tế và đầy nhiệt huyết.': ['A gentle, graceful and passionate woman.', '온화하고 섬세하며 열정 가득한 사람입니다.'],
  'Nhà Trai': ["Groom's Family", '신랑 측 가족'], 'Nhà Gái': ["Bride's Family", '신부 측 가족'],
  'Thân phụ': ['Father', '아버지'], 'Thân mẫu': ['Mother', '어머니'],
  'Ông Trần Văn Thanh': ['Mr. Trần Văn Thanh', 'Trần Văn Thanh'],
  'Bà Tạ Thị Thạnh': ['Mrs. Tạ Thị Thạnh', 'Tạ Thị Thạnh'],
  'Ông Nguyễn Văn Thắng': ['Mr. Nguyễn Văn Thắng', 'Nguyễn Văn Thắng'],
  'Bà Nguyễn Thị Hương': ['Mrs. Nguyễn Thị Hương', 'Nguyễn Thị Hương'],
  'Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội': ['No. 531, TL 421B Road, Dong Ha Hamlet, Phu Cat Commune, Hanoi, Vietnam', '베트남 하노이 · No. 531, TL 421B Road, Dong Ha Hamlet, Phu Cat Commune'],
  'Xóm Phú Cường, xã Phú Thịnh, Thái Nguyên': ['Phu Cuong Hamlet, Phu Thinh Commune, Thai Nguyen, Vietnam', '베트남 타이응우옌 · Phu Cuong Hamlet, Phu Thinh Commune'],
  // ---- Sự kiện ----
  'Lịch Trình': ['Schedule', '일정'],
  'Sự Kiện Trọng Đại': ['Wedding Events', '결혼식 행사'],
  'Tiệc Cưới': ['Reception', '피로연'],
  'Lễ Vu Quy': ['Vu Quy Ceremony', '출가 의식 (Vu Quy)'],
  'Lễ Thành Hôn': ['Wedding Ceremony', '결혼식'],
  'Tiệc Cưới Nhà Trai': ["Groom's Family Reception", '신랑 측 피로연'],
  'Tiệc Cưới Nhà Gái': ["Bride's Family Reception", '신부 측 피로연'],
  'Lễ Ăn Hỏi & Đón Dâu Nhà Gái': ["Betrothal & Bride Pick-up Ceremony (at the Bride's home)", '약혼 예식 및 신부 맞이 (신부 측 자택)'],
  'Lễ Thành Hôn Nhà Trai': ["Wedding Ceremony at the Groom's home", '신랑 측 결혼식'],
  '17h Ngày 28 tháng 11 năm 2026': ['5:00 PM, November 28, 2026', '2026년 11월 28일 오후 5시'],
  '7h Ngày 29 tháng 11 năm 2026': ['7:00 AM, November 29, 2026', '2026년 11월 29일 오전 7시'],
  '11h Ngày 29 tháng 11 năm 2026': ['11:00 AM, November 29, 2026', '2026년 11월 29일 오전 11시'],
  'Nhà trai - Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội': ["Groom's home – No. 531, TL 421B Road, Dong Ha Hamlet, Phu Cat Commune, Hanoi", '신랑 측 자택 – No. 531, TL 421B Road, Dong Ha Hamlet, Phu Cat Commune, Hanoi'],
  'Nhà gái - Xóm Phú Cường, xã Phú Thịnh, Thái Nguyên': ["Bride's home – Phu Cuong Hamlet, Phu Thinh Commune, Thai Nguyen", '신부 측 자택 – Phu Cuong Hamlet, Phu Thinh Commune, Thai Nguyen'],
  'Xem Bản Đồ': ['View Map', '지도 보기'],
  'Xác Nhận': ['Confirm', '참석 확인'],
  // ---- Album, quà, lưu bút ----
  'Kỷ Niệm': ['Memories', '추억'],
  'Album Ảnh Cưới': ['Wedding Album', '웨딩 앨범'],
  'Hộp Mừng Cưới': ['Wedding Gift Box', '축하 선물함'],
  'Cảm ơn tất cả các tình cảm mà mọi người đã dành cho vợ chồng em': ['Thank you for all the love and kindness you have shown us.', '저희에게 보내주신 따뜻한 마음에 진심으로 감사드립니다.'],
  'Chạm vào hộp quà': ['Tap the gift box', '선물 상자를 터치해 주세요'],
  'Chú Rể Văn Sơn': ['Groom Văn Sơn', '신랑 Văn Sơn'],
  'Cô Dâu Thanh Nhàn': ['Bride Thanh Nhàn', '신부 Thanh Nhàn'],
  'Chưa có ảnh QR': ['QR code not available yet', 'QR 코드 준비 중입니다'],
  'Gửi Lời Chúc': ['Send Your Wishes', '축하 메시지 보내기'],
  'Sổ Lưu Bút Online': ['Online Guestbook', '온라인 방명록'],
  'Tên của bạn *': ['Your name *', '이름 *'],
  'Mối quan hệ': ['Relationship', '관계'],
  'Bạn Chú Rể': ["Groom's friend", '신랑 친구'],
  'Bạn Cô Dâu': ["Bride's friend", '신부 친구'],
  'Người Thân': ['Family / Relative', '가족·친척'],
  'Đồng Nghiệp': ['Colleague', '직장 동료'],
  'Lời chúc mừng *': ['Your message *', '축하 메시지 *'],
  'Nhập tên...': ['Enter your name...', '이름을 입력해 주세요...'],
  'Gửi những lời chúc tốt đẹp nhất...': ['Send us your best wishes...', '따뜻한 축하의 말씀을 남겨 주세요...'],
  // ---- RSVP ----
  'Vui lòng phản hồi trước ngày 25/11/2026 để chuẩn bị đón tiếp chu đáo nhất.': ['Please reply by 25 November 2026 so we can prepare to welcome you properly.', '정성껏 맞이할 수 있도록 2026년 11월 25일까지 회신 부탁드립니다.'],
  'Họ và Tên *': ['Full name *', '성함 *'],
  'Số Điện Thoại': ['Phone number', '전화번호'],
  'Xác nhận tham dự': ['Attendance', '참석 여부'],
  'Sẽ tham dự tiệc': ['I will attend', '참석하겠습니다'],
  'Rất tiếc không thể tham dự': ["Sorry, I can't attend", '아쉽게도 참석하지 못합니다'],
  'Số người tham dự': ['Number of guests', '참석 인원'],
  'Gửi Phản Hồi': ['Submit', '회신 보내기'],
  // ---- Thông báo ----
  'Cảm ơn bạn đã xác nhận tham dự!': ['Thank you for your RSVP!', '참석 여부를 알려주셔서 감사합니다!'],
  'Cảm ơn bạn đã gửi lời chúc mừng!': ['Thank you for your wishes!', '축하 메시지 감사합니다!'],
  'Lễ cưới đã diễn ra!': ['The wedding has taken place!', '결혼식이 진행되었습니다!'],
  // ---- aria-label / title ----
  'Bật/tắt nhạc': ['Toggle music', '음악 켜기/끄기'],
  'Đóng': ['Close', '닫기'], 'Ảnh trước': ['Previous', '이전'], 'Ảnh sau': ['Next', '다음'],
  'Bấm để mở hộp quà': ['Tap to open the gift box', '선물 상자를 열어 보세요'],
  'Thiệp Cưới Văn Sơn & Thanh Nhàn': ['Wedding Invitation – Văn Sơn & Thanh Nhàn', '청첩장 – Văn Sơn & Thanh Nhàn'],
};
// Tiếng Trung giản thể: 'Chữ tiếng Việt gốc': '中文'
const ZH = {
  'Save The Date': '请记住这一天',
  '"Trân trọng kính mời quý vị tới tham dự lễ thành hôn của chúng tôi"': '“诚挚邀请您莅临我们的婚礼，与我们共同见证幸福时刻”',
  'Kính mời': '敬邀',
  'CHẠM ĐỂ MỞ THIỆP': '点击打开请柬',
  'Cặp Đôi': '新人',
  'Sự Kiện': '活动',
  'Album Ảnh': '相册',
  'Mừng Cưới': '礼金',
  'Sổ Lưu Bút': '留言簿',
  'Xác Nhận Tham Dự': '确认出席',
  'Chúng Tôi Sắp Kết Hôn': '我们要结婚了',
  'Hành trình yêu thương bước sang trang mới rực rỡ và đong đầy hạnh phúc.': '爱的旅程翻开崭新而灿烂的一页，充满幸福。',
  'Ngày': '天', 'Giờ': '时', 'Phút': '分', 'Giây': '秒',
  'Chú Rể & Cô Dâu': '新郎 & 新娘',
  'Thông Tin Hai Bên Gia Đình': '双方家庭',
  'Chú Rể': '新郎', 'Cô Dâu': '新娘',
  'Chàng trai hiền lành, chu đáo và luôn đong đầy yêu thương.': '温和体贴，心中永远充满爱的男孩。',
  'Cô gái dịu dàng, tinh tế và đầy nhiệt huyết.': '温柔细腻、充满热情的女孩。',
  'Nhà Trai': '男方家庭', 'Nhà Gái': '女方家庭',
  'Thân phụ': '父亲', 'Thân mẫu': '母亲',
  'Ông Trần Văn Thanh': 'Trần Văn Thanh 先生',
  'Bà Tạ Thị Thạnh': 'Tạ Thị Thạnh 女士',
  'Ông Nguyễn Văn Thắng': 'Nguyễn Văn Thắng 先生',
  'Bà Nguyễn Thị Hương': 'Nguyễn Thị Hương 女士',
  'Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội': '越南河内 · No. 531, TL 421B Road, Dong Ha Hamlet, Phu Cat Commune',
  'Xóm Phú Cường, xã Phú Thịnh, Thái Nguyên': '越南太原省 · Phu Cuong Hamlet, Phu Thinh Commune',
  'Lịch Trình': '日程',
  'Sự Kiện Trọng Đại': '婚礼活动',
  'Tiệc Cưới': '婚宴',
  'Lễ Vu Quy': '出嫁仪式 (Vu Quy)',
  'Lễ Thành Hôn': '婚礼仪式',
  'Tiệc Cưới Nhà Trai': '男方婚宴',
  'Tiệc Cưới Nhà Gái': '女方婚宴',
  'Lễ Ăn Hỏi & Đón Dâu Nhà Gái': '订婚仪式及迎亲（女方家）',
  'Lễ Thành Hôn Nhà Trai': '男方家婚礼仪式',
  '17h Ngày 28 tháng 11 năm 2026': '2026年11月28日 下午5点',
  '7h Ngày 29 tháng 11 năm 2026': '2026年11月29日 上午7点',
  '11h Ngày 29 tháng 11 năm 2026': '2026年11月29日 上午11点',
  'Nhà trai - Số nhà 531, đường TL 421B, thôn Đông Hạ, xã Phú Cát, Hà Nội': '男方家 – No. 531, TL 421B Road, Dong Ha Hamlet, Phu Cat Commune, Hanoi',
  'Nhà gái - Xóm Phú Cường, xã Phú Thịnh, Thái Nguyên': '女方家 – Phu Cuong Hamlet, Phu Thinh Commune, Thai Nguyen',
  'Xem Bản Đồ': '查看地图',
  'Xác Nhận': '确认出席',
  'Kỷ Niệm': '回忆',
  'Album Ảnh Cưới': '婚纱相册',
  'Hộp Mừng Cưới': '礼金盒',
  'Cảm ơn tất cả các tình cảm mà mọi người đã dành cho vợ chồng em': '感谢大家对我们的关爱与祝福。',
  'Chạm vào hộp quà': '点击礼盒',
  'Chú Rể Văn Sơn': '新郎 Văn Sơn',
  'Cô Dâu Thanh Nhàn': '新娘 Thanh Nhàn',
  'Chưa có ảnh QR': '二维码暂未提供',
  'Gửi Lời Chúc': '送上祝福',
  'Sổ Lưu Bút Online': '线上留言簿',
  'Tên của bạn *': '您的姓名 *',
  'Mối quan hệ': '关系',
  'Bạn Chú Rể': '新郎的朋友',
  'Bạn Cô Dâu': '新娘的朋友',
  'Người Thân': '亲属',
  'Đồng Nghiệp': '同事',
  'Lời chúc mừng *': '祝福留言 *',
  'Nhập tên...': '请输入姓名...',
  'Gửi những lời chúc tốt đẹp nhất...': '写下您最美好的祝福...',
  'Vui lòng phản hồi trước ngày 25/11/2026 để chuẩn bị đón tiếp chu đáo nhất.': '请于2026年11月25日前回复，以便我们周到地接待您。',
  'Họ và Tên *': '姓名 *',
  'Số Điện Thoại': '电话号码',
  'Xác nhận tham dự': '是否出席',
  'Sẽ tham dự tiệc': '我会出席',
  'Rất tiếc không thể tham dự': '很遗憾无法出席',
  'Số người tham dự': '出席人数',
  'Gửi Phản Hồi': '提交回复',
  'Cảm ơn bạn đã xác nhận tham dự!': '感谢您的出席回复！',
  'Cảm ơn bạn đã gửi lời chúc mừng!': '感谢您的祝福！',
  'Lễ cưới đã diễn ra!': '婚礼已圆满举行！',
  'Bật/tắt nhạc': '开关音乐',
  'Đóng': '关闭', 'Ảnh trước': '上一张', 'Ảnh sau': '下一张',
  'Bấm để mở hộp quà': '点击打开礼盒',
  'Thiệp Cưới Văn Sơn & Thanh Nhàn': '婚礼请柬 – Văn Sơn & Thanh Nhàn',
};

// Dịch 1 chuỗi (không có trong từ điển thì giữ nguyên)
function tr(s) {
  if (LANG === 'vi') return s;
  const key = String(s ?? '').trim();
  if (LANG === 'zh') return ZH[key] ?? s;
  const hit = T[key];
  return hit ? hit[LANG === 'en' ? 0 : 1] : s;
}

// Dịch phần chữ tĩnh của index.html
function applyStaticI18n() {
  if (LANG === 'vi') return;
  document.title = tr(document.title);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((n) => {
    const tag = n.parentElement && n.parentElement.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE') return;
    const key = n.nodeValue.trim();
    if (!key) return;
    const out = tr(key);
    if (out !== key) n.nodeValue = n.nodeValue.replace(key, () => out);
  });

  document.querySelectorAll('[placeholder],[aria-label],[title]').forEach((el) => {
    ['placeholder', 'aria-label', 'title'].forEach((a) => {
      if (el.hasAttribute(a)) el.setAttribute(a, tr(el.getAttribute(a)));
    });
  });
}

document.documentElement.lang = LANG === 'zh' ? 'zh-CN' : LANG;
document.addEventListener('DOMContentLoaded', applyStaticI18n);