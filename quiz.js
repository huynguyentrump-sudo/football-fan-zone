/* =========================================================
   quiz.js — TRANG QUIZ (Football Quiz)
   - 10 câu: đoán cầu thủ, đoán logo, sự kiện bóng đá
   - Chọn đáp án → bấm KIỂM TRA → hiện đúng/sai + giải thích
   - Đúng: +10 điểm · dùng gợi ý rồi mới đúng: +5 điểm
   - Kết thúc: xem điểm, lưu điểm cao nhất vào Bảng xếp hạng (ranking.js)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("quizBox");
  const rankBox = document.getElementById("rankBox");
  const QUESTIONS = FFZ_DATA.quiz;
  const LETTERS = ["A", "B", "C", "D"];

  let state; // trạng thái lượt chơi hiện tại

  function newGame() {
    state = { i: 0, score: 0, selected: null, checked: false, usedHint: false, history: [] };
    renderQuestion();
  }

  function renderQuestion() {
    const q = QUESTIONS[state.i];
    const visual = q.image
      ? `<img src="${q.image}" alt="Hình gợi ý">`
      : `<div class="big">${q.icon}</div>`;
    box.innerHTML = `
      <div class="quiz-top"><span>Câu ${state.i + 1}/${QUESTIONS.length} · <span class="tag">${q.type}</span></span><span>Điểm: <b style="color:#15803D">${state.score}</b></span></div>
      <div class="progress"><i style="width:${(state.i / QUESTIONS.length) * 100}%"></i></div>
      <div class="quiz-visual">${visual}<div class="clue">${q.clue}</div></div>
      <h3 class="quiz-q">${q.question}</h3>
      <div class="options">
        ${q.options.map((o, k) => `<button class="opt" data-k="${k}">${LETTERS[k]}. ${o}</button>`).join("")}
      </div>
      <div class="hint-text" id="hintText">${state.usedHint ? "💡 " + q.hint : ""}</div>
      <div class="quiz-actions">
        <button class="btn ghost" id="hintBtn" ${state.usedHint ? "disabled" : ""}>💡 Gợi ý</button>
        <button class="btn dark" id="checkBtn" disabled>KIỂM TRA</button>
      </div>
      <div id="feedback"></div>`;

    box.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => {
        if (state.checked) return;
        state.selected = Number(btn.dataset.k);
        box.querySelectorAll(".opt").forEach(b => b.classList.toggle("selected", b === btn));
        box.querySelector("#checkBtn").disabled = false;
      };
    });
    box.querySelector("#hintBtn").onclick = () => {
      state.usedHint = true;
      box.querySelector("#hintText").textContent = "💡 " + q.hint;
      box.querySelector("#hintBtn").disabled = true;
    };
    box.querySelector("#checkBtn").onclick = checkAnswer;
  }

  function checkAnswer() {
    const q = QUESTIONS[state.i];
    if (state.checked) { nextQuestion(); return; }
    if (state.selected === null) return;
    state.checked = true;
    const correct = state.selected === q.answer;
    const gained = correct ? (state.usedHint ? 5 : 10) : 0;
    state.score += gained;
    state.history.push({ q: q.question, clue: q.clue, correct, answer: q.options[q.answer] });

    box.querySelectorAll(".opt").forEach(b => {
      const k = Number(b.dataset.k);
      b.disabled = true;
      b.classList.remove("selected");
      if (k === q.answer) b.classList.add("correct");
      else if (k === state.selected) b.classList.add("wrong");
    });
    box.querySelector("#hintBtn").disabled = true;
    box.querySelector("#feedback").innerHTML = `
      <div class="feedback ${correct ? "ok" : "no"}">
        <b>${correct ? `✅ Chính xác! +${gained} điểm` : `❌ Chưa đúng. Đáp án: ${q.options[q.answer]}`}</b><br>${q.explain}
      </div>`;
    const btn = box.querySelector("#checkBtn");
    btn.textContent = state.i < QUESTIONS.length - 1 ? "CÂU TIẾP →" : "XEM KẾT QUẢ";
    box.querySelector(".quiz-top b").textContent = state.score;
  }

  function nextQuestion() {
    state.i++;
    state.selected = null; state.checked = false; state.usedHint = false;
    if (state.i < QUESTIONS.length) renderQuestion(); else showResult();
  }

  function showResult() {
    const right = state.history.filter(h => h.correct).length;
    const best = FFZ.load("quizBest", 0);
    const msg = state.score >= 90 ? "Fan cứng thực thụ! 🔥" : state.score >= 60 ? "Khá lắm, sắp thành chuyên gia rồi! 💪"
              : state.score >= 30 ? "Cũng được đó, chơi lại để tăng điểm nhé!" : "Xem thêm tin tức rồi thử lại nhé 😄";
    box.innerHTML = `
      <div class="result">
        <div class="progress"><i style="width:100%"></i></div>
        <p class="muted" style="margin:0">Điểm của bạn</p>
        <div class="big-score">${state.score}<span style="font-size:24px;color:#6B7280">/${QUESTIONS.length * 10}</span></div>
        <p><b>${msg}</b><br>Đúng ${right}/${QUESTIONS.length} câu · Điểm cao nhất trước đó: ${best}</p>
        <div class="result-list">
          ${state.history.map((h, k) => `<div>${h.correct ? "✅" : "❌"} Câu ${k + 1}: ${h.clue.split(",")[0]}… → <b>${h.answer}</b></div>`).join("")}
        </div>
        <div class="quiz-actions">
          <button class="btn ghost" id="againBtn">↻ Chơi lại</button>
          <button class="btn" id="saveBtn">🏆 Lưu điểm lên BXH</button>
        </div>
      </div>`;
    box.querySelector("#againBtn").onclick = newGame;
    box.querySelector("#saveBtn").onclick = () => FFZ.ensureName(() => {
      if (state.score > best) {
        FFZ.save("quizBest", state.score);
        FFZ.toast(`Kỷ lục mới: ${state.score} điểm! 🎉`);
      } else {
        FFZ.toast(`Điểm cao nhất của bạn vẫn là ${best}`);
      }
      FFZ.renderUserChip();
      FFZ_Ranking.renderFull(rankBox);
      const sb = box.querySelector("#saveBtn");
      sb.disabled = true; sb.textContent = "✓ Đã lưu";
    });
  }

  newGame();
  FFZ_Ranking.renderFull(rankBox);
});
