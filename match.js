/* =========================================================
   match.js — TRANG TRẬN ĐẤU (Match Center)
   - Danh sách trận theo vòng, lọc Đã đá / Sắp đá, lọc theo đội
   - Bấm 1 trận → cửa sổ chi tiết:
       + Trận đã đá: diễn biến, thống kê, bình chọn cầu thủ xuất sắc (MOTM, +2đ)
       + Trận sắp đá: dự đoán tỉ số (+5đ), xem fan dự đoán thế nào
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const D = FFZ_DATA;
  const listEl = document.getElementById("matchList");
  const filtersEl = document.getElementById("matchFilters");
  const teamEl = document.getElementById("teamFilter");

  const FILTERS = [["all", "Tất cả"], ["ft", "Đã đá"], ["upcoming", "Sắp đá"]];
  let currentFilter = "all";

  teamEl.innerHTML = `<option value="">Tất cả đội</option>` +
    Object.entries(D.teams).map(([code, t]) => `<option value="${code}">${t.name}</option>`).join("");

  /* ----- Danh sách trận ----- */
  function renderFilters() {
    filtersEl.innerHTML = FILTERS.map(([k, label]) =>
      `<button class="chip ${k === currentFilter ? "active" : ""}" data-f="${k}">${label}</button>`).join("");
  }

  function matchRow(m) {
    const preds = FFZ.load("predictions", {});
    const center = m.status === "ft"
      ? `<span class="status ft">FT</span><div class="score">${m.score[0]} – ${m.score[1]}</div>`
      : `<span class="status up">${m.time}</span><div class="score" style="font-size:18px">VS</div>
         <small>${preds[m.id] ? `<span class="pred-flag">✓ Bạn đoán ${preds[m.id][0]}–${preds[m.id][1]}</span>` : FFZ.formatDate(m.date)}</small>`;
    return `
      <div class="card match-row" data-id="${m.id}" tabindex="0">
        <div class="team">${FFZ.teamBadge(m.home)}<span>${m.home}</span><span class="full muted">${D.teams[m.home].name}</span></div>
        <div class="center">${center}</div>
        <div class="team away"><span class="full muted">${D.teams[m.away].name}</span><span>${m.away}</span>${FFZ.teamBadge(m.away)}</div>
      </div>`;
  }

  function renderList() {
    const team = teamEl.value;
    const shown = D.matches.filter(m =>
      (currentFilter === "all" || m.status === currentFilter) &&
      (!team || m.home === team || m.away === team));
    if (!shown.length) { listEl.innerHTML = `<div class="card empty">Không có trận nào phù hợp.</div>`; return; }
    // Gom theo vòng đấu, vòng mới nhất lên trên
    const rounds = [...new Set(shown.map(m => m.round))].sort((a, b) => b - a);
    listEl.innerHTML = rounds.map(r => {
      const ms = shown.filter(m => m.round === r);
      const label = ms[0].status === "ft" ? "Kết quả" : "Lịch thi đấu";
      return `<div class="round-title">Vòng ${r} · ${label}</div><div class="match-list">${ms.map(matchRow).join("")}</div>`;
    }).join("");
  }

  filtersEl.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    currentFilter = b.dataset.f;
    renderFilters(); renderList();
  });
  teamEl.addEventListener("change", renderList);
  listEl.addEventListener("click", e => {
    const row = e.target.closest(".match-row");
    if (row) openDetail(Number(row.dataset.id));
  });
  listEl.addEventListener("keydown", e => {
    const row = e.target.closest(".match-row");
    if (row && e.key === "Enter") openDetail(Number(row.dataset.id));
  });

  /* ----- Cửa sổ chi tiết trận ----- */
  function openDetail(id) {
    const m = D.matches.find(x => x.id === id);
    if (!m) return;
    const wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.innerHTML = `<div class="modal"><button class="modal-close" aria-label="Đóng">✕</button><div id="md"></div></div>`;
    document.body.appendChild(wrap);
    const close = () => { wrap.remove(); history.replaceState(null, "", "match.html"); renderList(); };
    wrap.querySelector(".modal-close").onclick = close;
    wrap.addEventListener("click", e => { if (e.target === wrap) close(); });
    history.replaceState(null, "", "match.html?id=" + id);
    const box = wrap.querySelector("#md");
    if (m.status === "ft") renderFinished(m, box); else renderUpcoming(m, box);
  }

  function header(m, middle) {
    return `
      <div class="md-head">
        <div class="t">${FFZ.teamBadge(m.home, "lg")}${D.teams[m.home].name}</div>
        <div>${middle}</div>
        <div class="t">${FFZ.teamBadge(m.away, "lg")}${D.teams[m.away].name}</div>
      </div>
      <p class="muted" style="text-align:center;font-size:13px;margin:10px 0 0">Vòng ${m.round} · ${FFZ.formatDate(m.date)} · ${m.time} · Sân ${m.stadium}</p>`;
  }

  // Trận đã đá
  function renderFinished(m, box) {
    const icon = e => e.type === "goal" ? "⚽" : `<span class="card-ico ${e.type}"></span>`;
    const statNames = { possession: "Kiểm soát bóng (%)", shots: "Cú sút", onTarget: "Sút trúng đích", corners: "Phạt góc", fouls: "Phạm lỗi" };
    const votes = FFZ.load("motmVotes", {});
    const myVote = votes[m.id];

    box.innerHTML = header(m, `<span class="status ft">KẾT THÚC</span><div class="score">${m.score[0]} – ${m.score[1]}</div>`) + `
      <div class="md-sec">
        <h4>Diễn biến</h4>
        <ul class="timeline">
          ${m.events.map(e => `
            <li>
              <span class="home-ev">${e.side === "home" ? `${e.who} ${icon(e)}` : ""}</span>
              <span class="min">${e.min}'</span>
              <span>${e.side === "away" ? `${icon(e)} ${e.who}` : ""}</span>
            </li>`).join("")}
        </ul>
      </div>
      <div class="md-sec">
        <h4>Thống kê</h4>
        ${Object.entries(m.stats).map(([k, [h, a]]) => `
          <div class="stat">
            <div class="labels"><span>${h}</span><span>${statNames[k]}</span><span>${a}</span></div>
            <div class="bar"><i style="width:${(h / (h + a || 1)) * 100}%"></i><i style="width:${(a / (h + a || 1)) * 100}%"></i></div>
          </div>`).join("")}
      </div>
      <div class="md-sec">
        <h4>⭐ Bình chọn cầu thủ xuất sắc nhất trận</h4>
        <div class="vote-list">
          ${m.motm.map(p => `<button class="vote-opt ${myVote === p ? "chosen" : ""}" data-p="${p}" ${myVote ? "disabled" : ""}>
             <span>${p}</span><span>${myVote === p ? "✓ Bạn đã chọn" : myVote ? "" : "Chọn"}</span></button>`).join("")}
        </div>
        <p class="muted" style="font-size:13px">${myVote ? "Cảm ơn bạn đã bình chọn!" : `Bình chọn để nhận +${FFZ.POINTS.vote} điểm fan.`}</p>
      </div>`;

    box.querySelectorAll(".vote-opt:not(:disabled)").forEach(btn => {
      btn.onclick = () => FFZ.ensureName(() => {
        const v = FFZ.load("motmVotes", {});
        v[m.id] = btn.dataset.p;
        FFZ.save("motmVotes", v);
        FFZ.renderUserChip();
        FFZ.toast(`Đã bình chọn ${btn.dataset.p} · +${FFZ.POINTS.vote} điểm`);
        renderFinished(m, box);
      });
    });
  }

  // Trận sắp đá
  function renderUpcoming(m, box) {
    const preds = FFZ.load("predictions", {});
    const mine = preds[m.id];
    const [h, d, a] = m.fanVotes;
    box.innerHTML = header(m, `<span class="status up">SẮP ĐÁ</span><div class="score" style="font-size:28px">${m.time}</div>`) + `
      <div class="md-sec">
        <h4>🔮 Dự đoán tỉ số của bạn</h4>
        ${mine ? `<div class="note">Bạn đã dự đoán: ${m.home} ${mine[0]} – ${mine[1]} ${m.away}. Có thể sửa lại bên dưới.</div>` : ""}
        <form id="predForm">
          <div class="predict-box">
            ${FFZ.teamBadge(m.home)}
            <input type="number" id="pH" min="0" max="20" required value="${mine ? mine[0] : ""}" aria-label="Bàn thắng ${m.home}">
            <span class="dash">–</span>
            <input type="number" id="pA" min="0" max="20" required value="${mine ? mine[1] : ""}" aria-label="Bàn thắng ${m.away}">
            ${FFZ.teamBadge(m.away)}
          </div>
          <button class="btn block" type="submit">${mine ? "Cập nhật dự đoán" : `Gửi dự đoán (+${FFZ.POINTS.prediction} điểm)`}</button>
        </form>
      </div>
      <div class="md-sec">
        <h4>📊 Fan dự đoán thế nào?</h4>
        <div class="fanbar">
          <div style="width:${h}%;background:${D.teams[m.home].color};color:${D.teams[m.home].text}">${h}%</div>
          <div style="width:${d}%;background:#6B7280">${d}%</div>
          <div style="width:${a}%;background:${D.teams[m.away].color};color:${D.teams[m.away].text}">${a}%</div>
        </div>
        <div class="fanbar-legend"><span>${m.home} thắng</span><span>Hòa</span><span>${m.away} thắng</span></div>
      </div>`;

    box.querySelector("#predForm").onsubmit = e => {
      e.preventDefault();
      const ph = parseInt(box.querySelector("#pH").value, 10);
      const pa = parseInt(box.querySelector("#pA").value, 10);
      if (isNaN(ph) || isNaN(pa) || ph < 0 || pa < 0) { FFZ.toast("Hãy nhập tỉ số hợp lệ"); return; }
      FFZ.ensureName(() => {
        const p = FFZ.load("predictions", {});
        const isNew = !p[m.id];
        p[m.id] = [ph, pa];
        FFZ.save("predictions", p);
        FFZ.renderUserChip();
        FFZ.toast(isNew ? `Đã lưu dự đoán · +${FFZ.POINTS.prediction} điểm` : "Đã cập nhật dự đoán");
        renderUpcoming(m, box);
      });
    };
  }

  renderFilters(); renderList();
  const startId = Number(new URLSearchParams(location.search).get("id"));
  if (startId) openDetail(startId);
});
