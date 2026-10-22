/* =========================================================
   ranking.js — FAN RANKING (Bảng xếp hạng fan)
   Điểm của bạn = điểm Quiz cao nhất
                + 5 điểm mỗi trận đã dự đoán tỉ số
                + 2 điểm mỗi lượt bình chọn cầu thủ xuất sắc (MOTM)
   Bảng gồm các fan mẫu + bạn (lưu trên trình duyệt).
   ========================================================= */

const FFZ_Ranking = (function () {
  // Gộp fan mẫu với người dùng hiện tại rồi sắp xếp giảm dần
  function getTable() {
    const list = FFZ_DATA.sampleFans.map(f => ({ ...f, me: false }));
    const name = FFZ.getName();
    const pts = FFZ.getPoints().total;
    if (name) {
      const same = list.find(f => f.name.toLowerCase() === name.toLowerCase());
      if (same) { same.points = Math.max(same.points, pts); same.me = true; }
      else list.push({ name, points: pts, me: true });
    }
    list.sort((a, b) => b.points - a.points);
    return list;
  }

  function medal(i) { return ["🥇", "🥈", "🥉"][i] || i + 1; }

  // Bảng đầy đủ (trang Quiz)
  function renderFull(el) {
    const table = getTable();
    const p = FFZ.getPoints();
    const myRank = table.findIndex(f => f.me);
    el.innerHTML = `
      <h3>🏆 Bảng xếp hạng fan</h3>
      ${FFZ.getName()
        ? `<p class="muted" style="margin:0">Bạn đang hạng <b style="color:#111827">#${myRank + 1}</b> với <b style="color:#15803D">${p.total} điểm</b></p>
           <div class="my-points">
             <div><b>${p.quizBest}</b>Quiz cao nhất</div>
             <div><b>${p.predictions}</b>Trận dự đoán</div>
             <div><b>${p.votes}</b>Lượt bình chọn</div>
           </div>`
        : `<p class="muted">Đặt tên fan và chơi quiz để có tên trên bảng!</p>`}
      <table class="rank-table">
        ${table.map((f, i) => `
          <tr class="${f.me ? "me" : ""}">
            <td>${medal(i)}</td>
            <td>${FFZ.escapeHTML(f.name)}${f.me ? " (bạn)" : ""}</td>
            <td>${f.points}</td>
          </tr>`).join("")}
      </table>
      <ul class="rank-rules">
        <li>Quiz: lấy điểm cao nhất của bạn (tối đa 100)</li>
        <li>Dự đoán tỉ số trận sắp đá: +${FFZ.POINTS.prediction} điểm/trận</li>
        <li>Bình chọn cầu thủ xuất sắc trận: +${FFZ.POINTS.vote} điểm/trận</li>
      </ul>`;
  }

  // Bảng rút gọn top 5 (trang chủ)
  function renderMini(el) {
    const table = getTable().slice(0, 5);
    el.innerHTML = table.map((f, i) => `
      <div class="mini-row" ${f.me ? 'style="background:#DCFCE7"' : ""}>
        <span class="rank">${medal(i)}</span>
        <span class="grow">${FFZ.escapeHTML(f.name)}${f.me ? " (bạn)" : ""}</span>
        <b>${f.points}đ</b>
      </div>`).join("");
  }

  return { getTable, renderFull, renderMini };
})();
