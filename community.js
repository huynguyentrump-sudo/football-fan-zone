/* =========================================================
   community.js — TRANG CỘNG ĐỒNG (Fan Community)
   - Viết bài (chọn chủ đề), đăng → hiện ngay đầu danh sách
   - Thích, bình luận, xoá bài của chính mình
   - Lọc theo chủ đề, sắp xếp Mới nhất / Nhiều thích nhất
   Bài viết lưu trên trình duyệt (localStorage) nên F5 vẫn còn.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  const contentEl = document.getElementById("postContent");
  const tagEl = document.getElementById("postTag");
  const countEl = document.getElementById("postCount");
  const listEl = document.getElementById("postList");
  const filtersEl = document.getElementById("postFilters");
  const sortEl = document.getElementById("postSort");

  const TAGS = ["Tất cả", "Bình luận", "Câu hỏi", "Ủng hộ", "Phê bình"];
  let currentTag = "Tất cả";
  const openComments = new Set();

  // Lần đầu mở trang: chép bài mẫu vào bộ nhớ
  let posts = FFZ.load("posts", null);
  if (!posts) { posts = JSON.parse(JSON.stringify(FFZ_DATA.samplePosts)); FFZ.save("posts", posts); }
  const liked = new Set(FFZ.load("liked", []));

  function persist() { FFZ.save("posts", posts); FFZ.save("liked", [...liked]); }

  // Màu avatar cố định theo tên
  function avatarColor(name) {
    const colors = ["#22C55E", "#111827", "#2563EB", "#DC2626", "#9333EA", "#EA580C", "#0891B2"];
    let s = 0; for (const ch of name) s += ch.charCodeAt(0);
    return colors[s % colors.length];
  }

  function renderFilters() {
    filtersEl.innerHTML = TAGS.map(t =>
      `<button class="chip ${t === currentTag ? "active" : ""}" data-t="${t}">${t}</button>`).join("");
  }

  function render() {
    const me = FFZ.getName();
    let shown = posts.filter(p => currentTag === "Tất cả" || p.tag === currentTag);
    shown = shown.sort(sortEl.value === "hot"
      ? (a, b) => b.likes - a.likes
      : (a, b) => b.time.localeCompare(a.time));

    listEl.innerHTML = shown.length ? shown.map(p => `
      <div class="card post" data-id="${p.id}">
        <div class="post-head">
          <div class="avatar" style="background:${avatarColor(p.author)}">${FFZ.escapeHTML(p.author.charAt(0).toUpperCase())}</div>
          <div class="who"><b>${FFZ.escapeHTML(p.author)}</b><span class="muted" style="font-size:13px">${FFZ.timeAgo(p.time)}</span></div>
          <span class="tag">${p.tag}</span>
        </div>
        <div class="post-content">${FFZ.escapeHTML(p.content)}</div>
        <div class="post-actions">
          <button class="act ${liked.has(p.id) ? "liked" : ""}" data-act="like">❤️ ${p.likes}</button>
          <button class="act" data-act="toggle">💬 Bình luận (${p.comments.length})</button>
          ${p.mine && p.author === me ? `<button class="act del" data-act="delete">🗑 Xoá</button>` : ""}
        </div>
        <div class="comments ${openComments.has(p.id) ? "" : "hidden"}">
          ${p.comments.map(c => `<div class="comment"><b>${FFZ.escapeHTML(c.author)}:</b> ${FFZ.escapeHTML(c.text)}</div>`).join("")}
          <form class="comment-form">
            <input maxlength="200" placeholder="Viết bình luận..." required>
            <button class="btn" type="submit">Gửi</button>
          </form>
        </div>
      </div>`).join("")
      : `<div class="card empty" style="margin-top:14px">Chưa có bài nào trong chủ đề này. Hãy là người đầu tiên!</div>`;
  }

  /* ----- Đăng bài ----- */
  contentEl.addEventListener("input", () => { countEl.textContent = contentEl.value.length + "/500"; });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = contentEl.value.trim();
    if (text.length < 3) { FFZ.toast("Bài viết cần ít nhất 3 ký tự"); return; }
    FFZ.ensureName(name => {
      posts.push({ id: "p" + Date.now(), author: name, tag: tagEl.value, time: new Date().toISOString(),
                   content: text, likes: 0, comments: [], mine: true });
      persist();
      contentEl.value = ""; countEl.textContent = "0/500";
      currentTag = "Tất cả"; sortEl.value = "new";
      renderFilters(); render();
      FFZ.toast("Đã đăng bài!");
    });
  });

  /* ----- Thích / bình luận / xoá ----- */
  listEl.addEventListener("click", e => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const id = btn.closest(".post").dataset.id;
    const p = posts.find(x => x.id === id);
    if (btn.dataset.act === "like") {
      if (liked.has(id)) { liked.delete(id); p.likes--; } else { liked.add(id); p.likes++; }
      persist(); render();
    } else if (btn.dataset.act === "toggle") {
      openComments.has(id) ? openComments.delete(id) : openComments.add(id);
      render();
      if (openComments.has(id)) listEl.querySelector(`[data-id="${id}"] .comment-form input`).focus();
    } else if (btn.dataset.act === "delete") {
      btn.textContent = "Bấm lần nữa để xoá";
      if (btn.dataset.confirm) {
        posts = posts.filter(x => x.id !== id);
        persist(); render(); FFZ.toast("Đã xoá bài");
      }
      btn.dataset.confirm = "1";
    }
  });
  listEl.addEventListener("submit", e => {
    if (!e.target.classList.contains("comment-form")) return;
    e.preventDefault();
    const id = e.target.closest(".post").dataset.id;
    const input = e.target.querySelector("input");
    const text = input.value.trim();
    if (!text) return;
    FFZ.ensureName(name => {
      posts.find(x => x.id === id).comments.push({ author: name, text });
      persist(); render();
    });
  });

  filtersEl.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    currentTag = b.dataset.t; renderFilters(); render();
  });
  sortEl.addEventListener("change", render);

  renderFilters(); render();
});
