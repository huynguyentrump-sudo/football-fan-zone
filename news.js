/* =========================================================
   news.js — TRANG TIN TỨC (News feed)
   - Danh sách tin mới nhất trước
   - Lọc theo chuyên mục + ô tìm kiếm
   - Bấm vào tin → đọc bài chi tiết (news.html?id=...)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const news = [...FFZ_DATA.news].sort((a, b) => b.date.localeCompare(a.date));
  const listView = document.getElementById("newsListView");
  const articleView = document.getElementById("articleView");
  const listEl = document.getElementById("newsList");
  const filtersEl = document.getElementById("newsFilters");
  const searchEl = document.getElementById("newsSearch");

  const categories = ["Tất cả", ...new Set(news.map(n => n.category))];
  let currentCat = "Tất cả";

  /* ----- Danh sách tin ----- */
  function renderFilters() {
    filtersEl.innerHTML = categories.map(c =>
      `<button class="chip ${c === currentCat ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  }
  function renderList() {
    const q = searchEl.value.trim().toLowerCase();
    const shown = news.filter(n =>
      (currentCat === "Tất cả" || n.category === currentCat) &&
      (q === "" || (n.title + " " + n.summary + " " + n.teams.map(t => FFZ_DATA.teams[t].name).join(" ")).toLowerCase().includes(q))
    );
    listEl.innerHTML = shown.length ? shown.map(n => `
      <a class="card news-item" href="news.html?id=${n.id}" data-id="${n.id}">
        ${FFZ.newsImage(n)}
        <div>
          <div class="meta"><span class="tag">${n.category}</span>${FFZ.formatDate(n.date)}</div>
          <h3>${n.title}</h3>
          <p>${n.summary}</p>
        </div>
      </a>`).join("")
      : `<div class="card empty">Không tìm thấy tin nào phù hợp 😢</div>`;
  }
  filtersEl.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    currentCat = btn.dataset.cat;
    renderFilters(); renderList();
  });
  searchEl.addEventListener("input", renderList);

  /* ----- Bài chi tiết ----- */
  function showArticle(id) {
    const n = news.find(x => x.id === id);
    if (!n) { showList(); return; }
    const related = news.filter(x => x.id !== id && x.category === n.category).slice(0, 2);
    articleView.innerHTML = `
      <a href="news.html" class="btn ghost" id="backBtn">← Quay lại tin tức</a>
      <h1>${n.title}</h1>
      <div class="meta"><span class="tag">${n.category}</span>${FFZ.formatDate(n.date)}
        ${n.teams.map(t => FFZ.teamBadge(t)).join("")}</div>
      ${FFZ.newsImage(n)}
      <p><b>${n.summary}</b></p>
      ${n.body.map(p => `<p>${p}</p>`).join("")}
      ${related.length ? `<h3 style="margin-top:28px">Tin cùng chuyên mục</h3>
        ${related.map(r => `<p><a href="news.html?id=${r.id}" style="color:#15803D;font-weight:700">→ ${r.title}</a></p>`).join("")}` : ""}`;
    listView.classList.add("hidden");
    articleView.classList.remove("hidden");
    document.title = n.title + " – Football Fan Zone";
    window.scrollTo(0, 0);
  }
  function showList() {
    articleView.classList.add("hidden");
    listView.classList.remove("hidden");
    document.title = "Tin tức – Football Fan Zone";
  }

  const id = Number(new URLSearchParams(location.search).get("id"));
  renderFilters(); renderList();
  if (id) showArticle(id);
});
