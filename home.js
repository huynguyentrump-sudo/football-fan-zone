/* =========================================================
   home.js — TRANG CHỦ
   Banner tin nổi bật · 2 tin nổi bật · trận đáng chú ý (tỉ số)
   · 4 nút đi tới các trang · trận sắp tới · top fan
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const D = FFZ_DATA;
  const el = document.getElementById("home");

  // Tin nổi bật: mới nhất trước
  const byDate = [...D.news].sort((a, b) => b.date.localeCompare(a.date));
  const featured = D.news.filter(n => n.featured);
  const banner = featured[0] || byDate[0];
  // ưu tiên tin có featured: true, sau đó tới tin mới nhất
  const hot = [...featured, ...byDate].filter((n, i, arr) => n.id !== banner.id && arr.indexOf(n) === i).slice(0, 2);

  // Trận đáng chú ý = trận đã đá gần nhất trong tin banner (nếu có), không thì trận đầu tiên đã đá
  const played = D.matches.filter(m => m.status === "ft");
  const bigMatch = played.find(m => banner.teams.includes(m.home) && banner.teams.includes(m.away)) || played[0];
  const upcoming = D.matches.filter(m => m.status === "upcoming").slice(0, 4);

  el.innerHTML = `
    <a class="hero" href="news.html?id=${banner.id}">
      ${FFZ.newsImage(banner)}
      <div class="hero-content">
        <span class="tag dark">NỔI BẬT</span>
        <h1>${banner.title}</h1>
        <p>${banner.summary}</p>
      </div>
    </a>

    <div class="section-title"><h2>Tin nổi bật</h2><a href="news.html">Xem tất cả →</a></div>
    <div class="hot-grid">
      ${hot.map(n => `
        <a class="card hot-card" href="news.html?id=${n.id}">
          ${FFZ.newsImage(n)}
          <div class="body"><span class="tag">${n.category}</span><h3>${n.title}</h3></div>
        </a>`).join("")}
    </div>

    <div class="section-title"><h2>Trận đáng chú ý</h2><a href="match.html">Lịch &amp; kết quả →</a></div>
    <a class="score-bar" href="match.html?id=${bigMatch.id}">
      <div class="side">${FFZ.teamBadge(bigMatch.home)} <span>${bigMatch.home}</span> <span class="full muted" style="font-size:13px;font-weight:400">${D.teams[bigMatch.home].name}</span></div>
      <div class="mid"><div class="score">${bigMatch.score[0]} – ${bigMatch.score[1]}</div><small>KẾT THÚC · VÒNG ${bigMatch.round}</small></div>
      <div class="side away"><span class="full muted" style="font-size:13px;font-weight:400">${D.teams[bigMatch.away].name}</span> <span>${bigMatch.away}</span> ${FFZ.teamBadge(bigMatch.away)}</div>
    </a>

    <div class="section-title"><h2>Khám phá</h2></div>
    <div class="quick-grid">
      <a class="card quick" href="news.html"><span class="ico">📰</span>NEWS<small>Tin tức mới</small></a>
      <a class="card quick" href="match.html"><span class="ico">📅</span>MATCH<small>Lịch &amp; kết quả</small></a>
      <a class="card quick" href="community.html"><span class="ico">💬</span>CỘNG ĐỒNG<small>Chia sẻ ý kiến</small></a>
      <a class="card quick" href="quiz.html"><span class="ico">❓</span>QUIZ<small>Đố vui &amp; BXH</small></a>
    </div>

    <div class="home-two">
      <div>
        <div class="section-title"><h2>Trận sắp tới</h2><a href="match.html">Dự đoán tỉ số →</a></div>
        <div class="card mini-list">
          ${upcoming.map(m => `
            <a class="mini-row" href="match.html?id=${m.id}">
              ${FFZ.teamBadge(m.home)} <b>${m.home}</b>
              <span class="grow muted" style="text-align:center">${FFZ.formatDate(m.date).slice(0, -5)} · ${m.time}</span>
              <b>${m.away}</b> ${FFZ.teamBadge(m.away)}
            </a>`).join("")}
        </div>
      </div>
      <div>
        <div class="section-title"><h2>Top fan</h2><a href="quiz.html">Bảng xếp hạng →</a></div>
        <div class="card mini-list" id="miniRank"></div>
      </div>
    </div>`;

  FFZ_Ranking.renderMini(document.getElementById("miniRank"));
});
