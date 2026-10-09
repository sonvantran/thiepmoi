/* =====================================================================
   app.js — logic của trang thiệp. Dữ liệu nằm ở js/config.js.
   Mục lục:
   1. Helpers & state      6. Album + Lightbox
   2. Templates (HTML)     7. Hộp mừng cưới
   3. Toast & Google Sheet 8. RSVP
   4. Bìa thiệp + hiệu ứng 9. Lời chúc + bong bóng
   5. Đếm ngược           10. Khởi tạo & điều phối sự kiện
   ===================================================================== */
(() => {
  'use strict';

  /* ---------- 1. Helpers & state ---------- */
  const $ = (id) => document.getElementById(id);
  const pad2 = (n) => String(n).padStart(2, '0');
  const rnd = ([min, max]) => min + Math.random() * (max - min);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC_MAP[c]);

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* bỏ qua nếu bị chặn */ }
    },
  };

  const state = {
    opened: false,       // khách đã mở bìa thiệp chưa
    lightboxIndex: 0,
    wishes: [],
    bubbleQueue: [],
  };

  /* ---------- 2. Templates (HTML) ---------- */
  const ACCENT = {
    burgundy: { border: 'border-burgundy', text: 'text-burgundy' },
    rosegold: { border: 'border-rosegold', text: 'text-rosegold' },
  };

  const BOW_SVG = `<svg viewBox="0 0 64 40" class="bow-svg" aria-hidden="true"><path d="M32 20 C22 2 2 2 2 14 C2 28 22 28 32 20Z" fill="#8EC3F0"/><path d="M32 20 C42 2 62 2 62 14 C62 28 42 28 32 20Z" fill="#8EC3F0"/><path d="M32 20 L16 38 L24 38 L32 26 L40 38 L48 38Z" fill="#6FAEE6"/><path d="M32 20 C24 8 10 8 10 14 C10 22 24 24 32 20Z" fill="#B9DBF8" opacity=".7"/><rect x="26" y="13" width="12" height="14" rx="5" fill="#3F7FC4"/></svg>`;

  const familyCardHTML = (f) => `
    <div class="tilt-in bg-white p-8 rounded-2xl shadow-xl border border-softrose/30 text-center relative">
      <div class="cupid cupid-${f.cupid.side}" aria-hidden="true">
        <img src="${f.cupid.img}" alt="">
        ${[0, 1, 2].map((i) => `<i class="fas fa-heart cupid-heart" style="--i:${i}"></i>`).join('')}
      </div>
      <div class="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-200 shadow-md">
        <img src="${f.photo}" alt="${f.photoAlt}" class="w-full h-full object-cover" style="object-position:${f.photoPosition ?? '50% 50%'};transform:scale(${f.photoZoom ?? 1});transform-origin:${f.photoFocus}">
      </div>
      <h3 class="font-dancing text-4xl font-bold text-burgundy mb-2">${f.name}</h3>
      <p class="text-xs font-semibold text-rosegold uppercase tracking-wider mb-4">${f.role}</p>
      <p class="text-gray-600 text-sm leading-relaxed mb-6">${f.bio}</p>
      <div class="border-t border-gray-100 pt-4 text-xs text-gray-500 space-y-1">
        <p class="font-bold text-gray-700">${f.familyLabel}:</p>
        <p>Thân phụ: ${f.father}</p>
        <p>Thân mẫu: ${f.mother}</p>
        <p class="text-gray-400 italic">${f.address}</p>
      </div>
    </div>`;

  const eventCardHTML = (e) => {
    const a = ACCENT[e.accent] ?? ACCENT.burgundy;
    return `
    <div class="bg-white rounded-2xl p-8 shadow-lg border-l-4 ${a.border} flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start mb-4">
          <span class="${e.badgeClass} font-semibold text-xs px-3 py-1 rounded-full uppercase">${e.badge}</span>
          <i class="fas ${e.icon} ${a.text} text-xl"></i>
        </div>
        <h3 class="font-playfair text-2xl font-bold text-gray-800 mb-2">${e.title}</h3>
        <p class="text-sm text-gray-600 mb-4"><i class="far fa-clock ${a.text} mr-2"></i> ${e.time}</p>
        <p class="text-sm text-gray-600 mb-6"><i class="fas fa-map-marker-alt ${a.text} mr-2"></i> ${e.place}</p>
      </div>
      <div class="flex gap-3 pt-4 border-t border-gray-100">
        <a href="${e.mapUrl}" target="_blank" rel="noopener" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center text-xs py-2.5 rounded-lg font-medium transition">
          <i class="fas fa-map-marked-alt mr-1"></i> Xem Bản Đồ
        </a>
        <button data-action="open-rsvp" class="flex-1 bg-burgundy hover:bg-rose-900 text-amber-100 text-xs py-2.5 rounded-lg font-medium transition">
          <i class="fas fa-check-circle mr-1"></i> Xác Nhận
        </button>
      </div>
    </div>`;
  };

  const galleryTileHTML = (src, i) => {
    const [dc, dr, mc, mr] = GALLERY.spans[i] ?? GALLERY.defaultSpan;
    const seal = i % 2 ? `<div class="seal bow">${BOW_SVG}</div>` : `<div class="seal"><i class="fas fa-heart"></i></div>`;
    return `
    <div class="letter g-tile group" style="--dc:${dc};--dr:${dr};--mc:${mc};--mr:${mr}" data-action="open-lightbox" data-index="${i}">
      <div class="env"></div>
      <div class="photo">
        <img src="${src}" alt="Ảnh cưới ${i + 1}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" style="object-position:${GALLERY.focus?.[src] ?? '50% 50%'}">
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
          <i class="fas fa-search-plus text-2xl"></i>
        </div>
      </div>
      <div class="flap"></div>
      ${seal}
    </div>`;
  };

  const wishCardHTML = (w) => `
    <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="font-bold text-sm text-burgundy">${esc(w.name)}</span>
          <span class="text-[10px] bg-softrose/30 text-burgundy px-2 py-0.5 rounded-full font-medium">${esc(w.role)}</span>
        </div>
        <p class="text-xs text-gray-600 leading-relaxed">${esc(w.message)}</p>
      </div>
      ${w.time ? `<span class="text-[10px] text-gray-400 self-end mt-2">${esc(w.time)}</span>` : ''}
    </div>`;

  const renderList = (id, items, templateFn) => { $(id).innerHTML = items.map(templateFn).join(''); };

  /* ---------- 3. Toast & Google Sheet ---------- */
  let toastTimer;
  function showToast(msg) {
    const toast = $('toast');
    $('toastMsg').textContent = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none'), 3000);
  }

  // Gửi dữ liệu (lời chúc / RSVP) lên Google Apps Script. Trả về true nếu có gửi.
  async function postToSheet(payload) {
    if (!CONFIG.wishApiUrl) return false;
    try {
      await fetch(CONFIG.wishApiUrl, {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload),
      });
      return true;
    } catch { return false; }
  }

  /* ---------- 4. Bìa thiệp + hiệu ứng mở đầu ---------- */
  const audio = () => $('weddingAudio');

  function setMusicUI(playing) {
    $('musicToggleBtn').classList.toggle('spin-music', playing);
    $('musicIcon').className = playing ? 'fas fa-compact-disc text-lg' : 'fas fa-music text-lg';
  }

  function toggleMusic(forcePlay = false) {
    const a = audio();
    if (forcePlay || a.paused) {
      a.play().then(() => setMusicUI(true)).catch(() => console.log('Trình duyệt chặn tự phát nhạc'));
    } else {
      a.pause();
      setMusicUI(false);
    }
  }

  function createPetals() {
    const box = $('petalsContainer');
    for (let i = 0; i < CONFIG.petalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal text-softrose/60';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = Math.random() * 5 + 5 + 's';
      petal.style.animationDelay = Math.random() * 5 + 's';
      petal.innerHTML = '<i class="fas fa-heart text-xs"></i>';
      box.appendChild(petal);
    }
  }

  // Dải phim chạy ngang rồi mờ dần để lộ ảnh đầu trang. onDone chỉ chạy 1 lần.
  function playFilmReel(onDone) {
    let finished = false;
    const finish = () => { if (!finished) { finished = true; onDone(); } };
    if (reducedMotion) return finish();

    const holes = '<div class="film-holes"></div>';
    const frames = CONFIG.filmReel.photos
      .map((n) => `<img src="images/anh${pad2(n)}.jpg" alt="">`).join('');
    const reel = document.createElement('div');
    reel.className = 'filmreel';
    reel.innerHTML = `<div class="film-strip">${holes}<div class="film-frames">${frames}</div>${holes}</div>`;
    reel.addEventListener('click', () => { reel.classList.add('done'); finish(); });
    $('hero').appendChild(reel);

    setTimeout(() => { reel.classList.add('done'); finish(); }, CONFIG.filmReel.durationMs);
    setTimeout(() => reel.remove(), CONFIG.filmReel.durationMs + 1200);
  }

  function openInvitation() {
    state.opened = true;
    $('envelopeCover').classList.add('opacity-0', 'pointer-events-none');
    playFilmReel(() => $('hero').classList.add('play'));
    toggleMusic(true);
    createPetals();
  }

  // Hiệu ứng khi cuộn tới: thêm class .seen cho phần tử khớp selector
  function observeReveal(selector) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('seen'); io.unobserve(en.target); }
    }), { threshold: .15 });
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 120 + 'ms';
      el.style.setProperty('--d', (i % 2) * 150 + 'ms');
      io.observe(el);
    });
  }

  /* ---------- 5. Đếm ngược ---------- */
  function startCountdown() {
    const target = new Date(CONFIG.weddingDate).getTime();
    const units = { days: $('days'), hours: $('hours'), minutes: $('minutes'), seconds: $('seconds') };

    const tick = () => {
      const left = target - Date.now();
      if (left < 0) {
        $('countdown').innerHTML = "<p class='col-span-4 text-white font-bold text-xl'>Lễ cưới đã diễn ra!</p>";
        clearInterval(timer);
        return;
      }
      const s = 1000, m = 60 * s, h = 60 * m, d = 24 * h;
      units.days.textContent = pad2(Math.floor(left / d));
      units.hours.textContent = pad2(Math.floor((left % d) / h));
      units.minutes.textContent = pad2(Math.floor((left % h) / m));
      units.seconds.textContent = pad2(Math.floor((left % m) / s));
    };
    const timer = setInterval(tick, 1000);
    tick();
  }

  /* ---------- 6. Album + Lightbox ---------- */
  function showLightboxImage(index) {
    const n = GALLERY.images.length;
    state.lightboxIndex = (index + n) % n;
    $('lightboxImg').src = GALLERY.images[state.lightboxIndex];
  }
  const openLightbox = (i) => { showLightboxImage(i); $('lightboxModal').classList.remove('hidden'); };
  const closeLightbox = () => $('lightboxModal').classList.add('hidden');

  /* ---------- 7. Hộp mừng cưới ---------- */
  function toggleGift() {
    const box = $('giftQr');
    const open = box.classList.toggle('open');
    $('giftBtn').classList.toggle('opened', open);
    $('giftBtn').setAttribute('aria-expanded', open);
    box.setAttribute('aria-hidden', !open);
  }

  // Ảnh QR chưa có / lỗi tải -> hiện khung "Chưa có ảnh QR"
  function setupQrFallback() {
    const showMissing = (img) => {
      const div = document.createElement('div');
      div.className = 'qr-missing';
      div.textContent = 'Chưa có ảnh QR';
      img.replaceWith(div);
    };
    document.querySelectorAll('.qr-img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) showMissing(img);
      else img.addEventListener('error', () => showMissing(img), { once: true });
    });
  }

  /* ---------- 8. RSVP ---------- */
  const openRsvp = () => $('rsvpModal').classList.remove('hidden');
  const closeRsvp = () => $('rsvpModal').classList.add('hidden');

  async function handleRsvpSubmit(e) {
    e.preventDefault();
    await postToSheet({
      type: 'rsvp',
      name: $('rsvpName').value.trim(),
      phone: $('rsvpPhone').value.trim(),
      status: $('rsvpStatus').value,
      count: $('rsvpCount').value,
    });
    closeRsvp();
    showToast('Cảm ơn bạn đã xác nhận tham dự!');
    $('rsvpForm').reset();
  }

  /* ---------- 9. Lời chúc + bong bóng ---------- */
  async function fetchWishes() {
    if (CONFIG.wishApiUrl) {
      try {
        const res = await fetch(CONFIG.wishApiUrl, { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) return data;
      } catch { /* rơi xuống localStorage */ }
    }
    return store.get('weddingWishes', INITIAL_WISHES);
  }

  async function loadWishes() {
    state.wishes = await fetchWishes();
    renderList('wishesContainer', state.wishes, wishCardHTML);
  }

  async function handleWishSubmit(e) {
    e.preventDefault();
    const wish = {
      name: $('wishName').value.trim(),
      role: $('wishRole').value,
      message: $('wishMessage').value.trim(),
    };
    if (CONFIG.wishApiUrl) {
      await postToSheet(wish);
    } else {
      store.set('weddingWishes', [wish, ...store.get('weddingWishes', INITIAL_WISHES)]);
    }
    state.wishes = [wish, ...state.wishes];
    renderList('wishesContainer', state.wishes, wishCardHTML);
    spawnBubble(wish);
    $('wishForm').reset();
    showToast('Cảm ơn bạn đã gửi lời chúc mừng!');
  }

  function spawnBubble(wish) {
    const life = rnd(CONFIG.bubbleLifeMs);
    const bubble = document.createElement('div');
    bubble.className = 'wish-bubble';
    bubble.style.left = 2 + Math.random() * 40 + 'vw';
    bubble.style.animationDuration = life + 'ms';
    bubble.innerHTML = `<b>${esc(wish.name)}</b><span>${esc(wish.message)}</span>`;
    $('bubbleLayer').appendChild(bubble);
    setTimeout(() => bubble.remove(), life + 100);
  }

  function bubbleLoop() {
    if (state.opened && state.wishes.length) {
      if (!state.bubbleQueue.length) state.bubbleQueue = [...state.wishes].sort(() => Math.random() - .5);
      spawnBubble(state.bubbleQueue.pop());
    }
    setTimeout(bubbleLoop, rnd(CONFIG.bubbleGapMs));
  }

  /* ---------- 10. Khởi tạo & điều phối sự kiện ---------- */
  // Mỗi nút trong HTML khai báo data-action="<tên>"; thêm hành động mới chỉ cần thêm 1 dòng ở đây.
  const ACTIONS = {
    'open-invitation': openInvitation,
    'toggle-music': () => toggleMusic(),
    'open-rsvp': openRsvp,
    'close-rsvp': closeRsvp,
    'open-lightbox': (el) => openLightbox(Number(el.dataset.index)),
    'close-lightbox': closeLightbox,
    'prev-image': () => showLightboxImage(state.lightboxIndex - 1),
    'next-image': () => showLightboxImage(state.lightboxIndex + 1),
    'toggle-gift': toggleGift,
  };

  function init() {
    // Dựng giao diện từ dữ liệu
    renderList('familyCards', FAMILIES, familyCardHTML);
    renderList('eventCards', EVENTS, eventCardHTML);
    renderList('galleryGrid', GALLERY.images, galleryTileHTML);
    observeReveal('#familyCards .tilt-in');
    observeReveal('#galleryGrid .letter');
    setupQrFallback();

    // Sự kiện
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-action]');
      if (el) ACTIONS[el.dataset.action]?.(el);
    });
    $('wishForm').addEventListener('submit', handleWishSubmit);
    $('rsvpForm').addEventListener('submit', handleRsvpSubmit);

    // Tác vụ nền
    startCountdown();
    loadWishes();
    setTimeout(bubbleLoop, 2000);
    setInterval(() => { if (CONFIG.wishApiUrl && !document.hidden) loadWishes(); }, CONFIG.wishRefreshMs);
  }

  document.addEventListener('DOMContentLoaded', init);
})();