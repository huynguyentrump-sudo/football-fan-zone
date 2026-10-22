/* =========================================================
   common.js — phần DÙNG CHUNG cho mọi trang
   - Menu (header) + chân trang (footer)
   - Lưu dữ liệu vào trình duyệt (localStorage)
   - Tên fan (nickname) + hệ thống điểm cho Bảng xếp hạng
   ========================================================= */

const FFZ = (function () {
  /* ---------- 1. LƯU TRỮ (localStorage) ---------- */
  const memory = {}; // dự phòng khi trình duyệt chặn localStorage
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem("ffz_" + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return key in memory ? memory[key] : fallback;
    }
  }
  function save(key, value) {
    memory[key] = value;
    try { localStorage.setItem("ffz_" + key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
  }

  /* ---------- 2. HÀM TIỆN ÍCH ---------- */
  // Chống chèn mã HTML khi hiển thị chữ người dùng nhập
  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function formatDate(iso) {
    const d = new Date(iso);
    const thu = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()];
    return `${thu}, ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  }
  function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return "vừa xong";
    if (diff < 3600) return Math.floor(diff / 60) + " phút trước";
    if (diff < 86400) return Math.floor(diff / 3600) + " giờ trước";
    if (diff < 86400 * 30) return Math.floor(diff / 86400) + " ngày trước";
    return formatDate(iso);
  }
  // Huy hiệu đội bóng (vòng tròn màu + tên viết tắt) – không dùng logo thật
  function teamBadge(code, size) {
    const t = FFZ_DATA.teams[code];
    return `<span class="badge ${size || ""}" style="background:${t.color};color:${t.text}" title="${t.name}">${code}</span>`;
  }
  // Ảnh tin tức: có ảnh thật thì dùng, không có thì vẽ khối màu theo đội bóng
  function newsImage(item, extraClass) {
    if (item.image) return `<img class="news-img ${extraClass || ""}" src="${item.image}" alt="${escapeHTML(item.title)}">`;
    const t = item.teams.map(c => FFZ_DATA.teams[c].color);
    const bg = t.length >= 2 ? `linear-gradient(135deg, ${t[0]} 0 50%, ${t[1]} 50% 100%)`
             : t.length === 1 ? t[0] : "linear-gradient(135deg,#111827,#22C55E)";
    const icon = { "Kết quả": "⚽", "Chuyển nhượng": "🔁", "Thông báo": "📣", "Hậu trường": "🎬" }[item.category] || "⚽";
    return `<div class="news-img placeholder ${extraClass || ""}" style="background:${bg}"><span>${icon}</span></div>`;
  }

  /* ---------- 3. TÊN FAN ---------- */
  function getName() { return load("name", ""); }
  function setName(n) { save("name", n); renderUserChip(); }

  // Hỏi tên fan nếu chưa có, xong thì gọi callback(name)
  function ensureName(callback) {
    const name = getName();
    if (name) { callback(name); return; }
    openNameModal(callback);
  }
  function openNameModal(callback) {
    const wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.innerHTML = `
      <form class="modal small" id="nameForm">
        <h3>Bạn tên gì, fan ơi? 👋</h3>
        <p class="muted">Tên này dùng khi đăng bài và lên Bảng xếp hạng.</p>
        <input id="nameInput" maxlength="20" placeholder="VD: QuyDo_2007" value="${escapeHTML(getName())}" required>
        <div class="modal-actions">
          <button type="button" class="btn ghost" id="nameCancel">Để sau</button>
          <button type="submit" class="btn">Lưu tên</button>
        </div>
      </form>`;
    document.body.appendChild(wrap);
    const input = wrap.querySelector("#nameInput");
    input.focus();
    wrap.querySelector("#nameCancel").onclick = () => wrap.remove();
    wrap.querySelector("#nameForm").onsubmit = e => {
      e.preventDefault();
      const n = input.value.trim();
      if (!n) return;
      setName(n);
      wrap.remove();
      if (callback) callback(n);
    };
  }

  /* ---------- 4. ĐIỂM FAN (dùng cho Bảng xếp hạng) ----------
     quizBest: điểm quiz cao nhất | predictions: {matchId: [h, a]} (+5/trận)
     motmVotes: {matchId: "tên"} (+2/lượt)                                    */
  const POINTS = { prediction: 5, vote: 2 };
  function getPoints() {
    const quizBest = load("quizBest", 0);
    const predictions = Object.keys(load("predictions", {})).length;
    const votes = Object.keys(load("motmVotes", {})).length;
    return {
      quizBest, predictions, votes,
      total: quizBest + predictions * POINTS.prediction + votes * POINTS.vote
    };
  }

  /* ---------- 5. MENU + CHÂN TRANG ---------- */
  const PAGES = [
    { href: "index.html",     label: "Trang chủ" },
    { href: "news.html",      label: "Tin tức" },
    { href: "match.html",     label: "Trận đấu" },
    { href: "community.html", label: "Cộng đồng" },
    { href: "quiz.html",      label: "Quiz & BXH" }
  ];
  function currentPage() {
    const file = location.pathname.split("/").pop() || "index.html";
    return file.includes(".") ? file : file + ".html"; // Vercel có thể bỏ đuôi .html
  }
  function renderHeader() {
    const now = currentPage();
    const links = PAGES.map(p =>
      `<a href="${p.href}" class="${p.href === now ? "active" : ""}">${p.label}</a>`).join("");
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="container header-inner">
        <a href="index.html" class="logo">FFZ<span>.</span></a>
        <nav class="nav" id="nav">${links}</nav>
        <div class="header-right">
          <button class="user-chip" id="userChip" type="button"></button>
          <button class="menu-btn" id="menuBtn" type="button" aria-label="Mở menu">☰</button>
        </div>
      </div>`;
    document.body.prepend(header);
    header.querySelector("#menuBtn").onclick = () => header.querySelector("#nav").classList.toggle("open");
    header.querySelector("#userChip").onclick = () => openNameModal();
    renderUserChip();
  }
  function renderUserChip() {
    const chip = document.getElementById("userChip");
    if (!chip) return;
    const n = getName();
    chip.innerHTML = n ? `👤 ${escapeHTML(n)} · <b>${getPoints().total}đ</b>` : "👤 Đặt tên fan";
  }
  function renderFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="logo small">FOOTBALL FAN ZONE</div>
        <p>Website dành cho người yêu bóng đá · Nhóm Football Fan Zone · Lớp 12.2</p>
        <p class="muted">Tin tức và tỉ số trên trang là dữ liệu mẫu phục vụ học tập.</p>
      </div>`;
    document.body.appendChild(footer);
  }

  // Thông báo nhỏ góc màn hình
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2200);
  }

  document.addEventListener("DOMContentLoaded", () => { renderHeader(); renderFooter(); });

  return { load, save, escapeHTML, formatDate, timeAgo, teamBadge, newsImage,
           getName, ensureName, getPoints, POINTS, renderUserChip, toast };
})();
