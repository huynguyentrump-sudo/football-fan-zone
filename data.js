/* =========================================================
   data.js — DỮ LIỆU MẪU của Football Fan Zone
   Muốn đổi tin tức / trận đấu / câu hỏi quiz: chỉ cần sửa file này.
   (Đây là dữ liệu mẫu phục vụ bài tập, không phải dữ liệu thật.)
   ========================================================= */

const FFZ_DATA = {
  /* ---------- ĐỘI BÓNG ---------- */
  teams: {
    MU:  { name: "Manchester United", color: "#DA291C", text: "#FFFFFF" },
    LIV: { name: "Liverpool",         color: "#C8102E", text: "#FFFFFF" },
    ARS: { name: "Arsenal",           color: "#EF0107", text: "#FFFFFF" },
    CHE: { name: "Chelsea",           color: "#034694", text: "#FFFFFF" },
    MCI: { name: "Manchester City",   color: "#6CABDD", text: "#111827" },
    TOT: { name: "Tottenham",         color: "#132257", text: "#FFFFFF" },
    NEW: { name: "Newcastle",         color: "#241F20", text: "#FFFFFF" },
    AVL: { name: "Aston Villa",       color: "#670E36", text: "#95BFE5" }
  },

  /* ---------- TIN TỨC (News feed) ----------
     category: Kết quả | Chuyển nhượng | Thông báo | Hậu trường
     image: để trống "" thì web tự vẽ ảnh thay thế; muốn dùng ảnh thật thì
            upload ảnh lên cùng chỗ với các file khác và ghi "ten-anh.jpg"            */
  news: [
    {
      id: 1, featured: true, category: "Kết quả", date: "2026-10-19", teams: ["MU", "LIV"], image: "",
      title: "MU thắng nghẹt thở Liverpool 2–1 trong trận derby nước Anh",
      summary: "Bàn thắng ở phút 88 giúp Quỷ Đỏ giữ lại 3 điểm trên sân nhà Old Trafford.",
      body: [
        "Trận cầu tâm điểm vòng 8 diễn ra đúng như kỳ vọng của người hâm mộ: tốc độ cao, nhiều pha va chạm và kết thúc đầy kịch tính.",
        "Manchester United mở tỉ số ở hiệp một, Liverpool gỡ hòa ngay đầu hiệp hai. Khi trận đấu tưởng như sẽ kết thúc với kết quả hòa, đội chủ nhà ghi bàn quyết định ở phút 88 từ một tình huống phản công nhanh.",
        "Vào trang Match để xem diễn biến chi tiết và bình chọn cầu thủ xuất sắc nhất trận!"
      ]
    },
    {
      id: 2, featured: true, category: "Kết quả", date: "2026-10-19", teams: ["MCI", "TOT"], image: "",
      title: "Man City đè bẹp Tottenham 3–0, áp sát ngôi đầu",
      summary: "Đội chủ sân Etihad kiểm soát bóng tới 64% và không cho đối thủ cơ hội nào rõ ràng.",
      body: [
        "Manchester City cho thấy sức mạnh quen thuộc với lối chơi kiểm soát bóng và pressing tầm cao.",
        "Ba bàn thắng được ghi ở các phút 12, 51 và 77. Tottenham chỉ có 2 cú sút trúng đích trong cả trận.",
        "Với chiến thắng này, Man City chỉ còn kém đội đầu bảng 1 điểm."
      ]
    },
    {
      id: 3, featured: false, category: "Kết quả", date: "2026-10-18", teams: ["ARS", "CHE"], image: "",
      title: "Arsenal và Chelsea chia điểm trong trận derby London",
      summary: "Hai đội cùng ghi bàn trong hiệp hai, thế trận cân bằng đến phút cuối.",
      body: [
        "Trận derby London diễn ra hấp dẫn với thế trận ăn miếng trả miếng.",
        "Arsenal vượt lên dẫn trước ở phút 56 nhưng Chelsea gỡ hòa chỉ 10 phút sau đó. Cả hai đội đều có cơ hội ghi bàn quyết định nhưng không tận dụng được."
      ]
    },
    {
      id: 4, featured: false, category: "Kết quả", date: "2026-10-18", teams: ["NEW", "AVL"], image: "",
      title: "Newcastle và Aston Villa rượt đuổi tỉ số mãn nhãn 2–2",
      summary: "4 bàn thắng, 2 lần dẫn trước và một kết quả hòa khiến cả hai đội tiếc nuối.",
      body: [
        "St James' Park chứng kiến một trận đấu cởi mở với 4 bàn thắng.",
        "Newcastle hai lần vượt lên dẫn trước nhưng Aston Villa đều tìm được bàn gỡ, trong đó có bàn ở phút bù giờ."
      ]
    },
    {
      id: 5, featured: false, category: "Thông báo", date: "2026-10-20", teams: ["LIV", "MCI"], image: "",
      title: "Lịch thi đấu vòng 9: tâm điểm Liverpool – Man City",
      summary: "Cuối tuần này có 4 trận đấu hấp dẫn. Bạn đã dự đoán tỉ số chưa?",
      body: [
        "Vòng 9 hứa hẹn nhiều bất ngờ với cuộc đọ sức giữa Liverpool và Man City trên sân Anfield.",
        "Hãy vào trang Match, chọn trận sắp đá và gửi dự đoán tỉ số để nhận +5 điểm trên Bảng xếp hạng fan."
      ]
    },
    {
      id: 6, featured: false, category: "Chuyển nhượng", date: "2026-10-17", teams: ["CHE", "ARS"], image: "",
      title: "Kỳ chuyển nhượng tháng 1: các ông lớn cần bổ sung vị trí nào?",
      summary: "Phân tích nhanh điểm mạnh, điểm yếu đội hình của các CLB top đầu.",
      body: [
        "Sau 8 vòng đấu, nhiều đội bóng đã lộ ra những vị trí cần gia cố.",
        "Hàng thủ là mối lo lớn với những đội để thủng lưới nhiều, trong khi một số đội khác cần thêm một tiền đạo cắm để tận dụng cơ hội tốt hơn.",
        "Kỳ chuyển nhượng mùa đông sẽ mở cửa vào ngày 1/1. Fan hãy chia sẻ mong muốn của mình ở trang Cộng đồng!"
      ]
    },
    {
      id: 7, featured: false, category: "Thông báo", date: "2026-10-21", teams: [], image: "",
      title: "Football Fan Zone ra mắt Quiz và Bảng xếp hạng fan",
      summary: "Chơi đố vui, dự đoán tỉ số, bình chọn để tích điểm và leo hạng.",
      body: [
        "Bạn nghĩ mình là fan cứng? Hãy chứng minh tại trang Quiz với 10 câu hỏi về cầu thủ, logo CLB và các sự kiện bóng đá.",
        "Điểm quiz cao nhất, điểm dự đoán tỉ số và điểm bình chọn sẽ được cộng dồn vào Bảng xếp hạng fan."
      ]
    },
    {
      id: 8, featured: false, category: "Hậu trường", date: "2026-10-16", teams: [], image: "",
      title: "Mẹo xem bóng đá đêm khuya mà sáng hôm sau vẫn tỉnh táo đi học",
      summary: "Ngủ bù trước trận, uống nước thay nước ngọt và xem lại highlight nếu trận quá muộn.",
      body: [
        "Nhiều trận Premier League diễn ra lúc 2–3 giờ sáng theo giờ Việt Nam. Đây là vài mẹo nhỏ cho fan học sinh:",
        "Ngủ sớm một giấc trước trận, uống nước lọc thay vì nước ngọt có ga, và nếu sáng hôm sau có bài kiểm tra thì… xem highlight là lựa chọn khôn ngoan nhất!"
      ]
    }
  ],

  /* ---------- TRẬN ĐẤU (Match Center) ----------
     status: "ft" = đã đá (Full Time), "upcoming" = sắp đá
     events: type = goal | yellow | red ; side = home | away                  */
  matches: [
    {
      id: 1, round: 8, date: "2026-10-19", time: "22:30", stadium: "Old Trafford",
      home: "MU", away: "LIV", status: "ft", score: [2, 1],
      stats: { possession: [48, 52], shots: [13, 11], onTarget: [6, 4], corners: [5, 6], fouls: [12, 10] },
      events: [
        { min: 31, side: "home", type: "goal",   who: "Số 8" },
        { min: 40, side: "away", type: "yellow", who: "Số 5" },
        { min: 49, side: "away", type: "goal",   who: "Số 11" },
        { min: 72, side: "home", type: "yellow", who: "Số 4" },
        { min: 88, side: "home", type: "goal",   who: "Số 10" }
      ],
      motm: ["Số 10 · MU", "Số 8 · MU", "Số 11 · LIV"]
    },
    {
      id: 2, round: 8, date: "2026-10-18", time: "23:30", stadium: "Emirates",
      home: "ARS", away: "CHE", status: "ft", score: [1, 1],
      stats: { possession: [55, 45], shots: [12, 9], onTarget: [4, 3], corners: [7, 3], fouls: [9, 13] },
      events: [
        { min: 23, side: "away", type: "yellow", who: "Số 6" },
        { min: 56, side: "home", type: "goal",   who: "Số 7" },
        { min: 66, side: "away", type: "goal",   who: "Số 20" },
        { min: 81, side: "home", type: "yellow", who: "Số 2" }
      ],
      motm: ["Số 7 · ARS", "Số 20 · CHE", "Số 1 · CHE"]
    },
    {
      id: 3, round: 8, date: "2026-10-19", time: "20:00", stadium: "Etihad",
      home: "MCI", away: "TOT", status: "ft", score: [3, 0],
      stats: { possession: [64, 36], shots: [18, 5], onTarget: [8, 2], corners: [9, 2], fouls: [7, 11] },
      events: [
        { min: 12, side: "home", type: "goal",   who: "Số 9" },
        { min: 37, side: "away", type: "yellow", who: "Số 4" },
        { min: 51, side: "home", type: "goal",   who: "Số 9" },
        { min: 77, side: "home", type: "goal",   who: "Số 17" }
      ],
      motm: ["Số 9 · MCI", "Số 17 · MCI", "Số 16 · MCI"]
    },
    {
      id: 4, round: 8, date: "2026-10-18", time: "21:00", stadium: "St James' Park",
      home: "NEW", away: "AVL", status: "ft", score: [2, 2],
      stats: { possession: [51, 49], shots: [15, 13], onTarget: [7, 5], corners: [6, 5], fouls: [10, 12] },
      events: [
        { min: 18, side: "home", type: "goal",   who: "Số 14" },
        { min: 44, side: "away", type: "goal",   who: "Số 11" },
        { min: 63, side: "home", type: "goal",   who: "Số 9" },
        { min: 70, side: "away", type: "red",    who: "Số 3" },
        { min: 90, side: "away", type: "goal",   who: "Số 10" }
      ],
      motm: ["Số 10 · AVL", "Số 14 · NEW", "Số 9 · NEW"]
    },
    { id: 5, round: 9, date: "2026-10-25", time: "23:30", stadium: "Anfield",
      home: "LIV", away: "MCI", status: "upcoming", fanVotes: [42, 21, 37] },
    { id: 6, round: 9, date: "2026-10-25", time: "21:00", stadium: "Stamford Bridge",
      home: "CHE", away: "MU", status: "upcoming", fanVotes: [38, 27, 35] },
    { id: 7, round: 9, date: "2026-10-26", time: "20:00", stadium: "Tottenham Hotspur Stadium",
      home: "TOT", away: "NEW", status: "upcoming", fanVotes: [45, 25, 30] },
    { id: 8, round: 9, date: "2026-10-26", time: "22:30", stadium: "Emirates",
      home: "ARS", away: "AVL", status: "upcoming", fanVotes: [58, 22, 20] }
  ],

  /* ---------- QUIZ ----------
     answer = vị trí đáp án đúng (0 = A, 1 = B, 2 = C, 3 = D)
     image: để "" thì hiện biểu tượng; có thể thay bằng "ten-anh.jpg"  */
  quiz: [
    { type: "Đoán cầu thủ", icon: "🇵🇹", image: "",
      question: "Cầu thủ này là ai?",
      clue: "Người Bồ Đào Nha, biệt danh CR7, từng khoác áo MU, Real Madrid và Juventus.",
      hint: "Ăn mừng bằng tiếng hô “Siuuu”.",
      options: ["Messi", "Ronaldo", "Neymar", "Mbappé"], answer: 1,
      explain: "Cristiano Ronaldo – biệt danh CR7, huyền thoại của Bồ Đào Nha." },
    { type: "Đoán cầu thủ", icon: "🇦🇷", image: "",
      question: "Cầu thủ này là ai?",
      clue: "Người Argentina, 8 lần giành Quả bóng vàng, vô địch World Cup 2022.",
      hint: "Gắn bó với Barcelona từ năm 13 tuổi.",
      options: ["Messi", "Di María", "Agüero", "Maradona"], answer: 0,
      explain: "Lionel Messi là cầu thủ giành nhiều Quả bóng vàng nhất lịch sử (8 lần)." },
    { type: "Đoán cầu thủ", icon: "🇫🇷", image: "",
      question: "Cầu thủ này là ai?",
      clue: "Người Pháp, vô địch World Cup 2018 khi mới 19 tuổi, chuyển tới Real Madrid năm 2024.",
      hint: "Từng thi đấu cho Monaco và PSG.",
      options: ["Griezmann", "Benzema", "Mbappé", "Pogba"], answer: 2,
      explain: "Kylian Mbappé vô địch World Cup 2018 cùng tuyển Pháp." },
    { type: "Đoán cầu thủ", icon: "🇻🇳", image: "",
      question: "Cầu thủ Việt Nam này là ai?",
      clue: "Trưởng thành từ Hà Nội FC, từng sang Pháp thi đấu cho Pau FC.",
      hint: "Mang áo số 19 ở tuyển Việt Nam.",
      options: ["Công Phượng", "Văn Hậu", "Quang Hải", "Tiến Linh"], answer: 2,
      explain: "Nguyễn Quang Hải từng chơi cho Pau FC (Pháp) mùa 2022–23." },
    { type: "Đoán logo", icon: "🔱", image: "",
      question: "Logo có hình con quỷ đỏ cầm cây đinh ba là của CLB nào?",
      clue: "CLB có biệt danh “Quỷ Đỏ”, sân nhà Old Trafford.",
      hint: "Thành phố Manchester.",
      options: ["Liverpool", "Manchester United", "Arsenal", "Man City"], answer: 1,
      explain: "Manchester United có biệt danh Red Devils – Quỷ Đỏ." },
    { type: "Đoán logo", icon: "💣", image: "",
      question: "Logo có hình khẩu pháo là của CLB nào?",
      clue: "CLB ở phía Bắc London, biệt danh “Pháo thủ”.",
      hint: "Sân nhà là Emirates.",
      options: ["Chelsea", "Tottenham", "Arsenal", "West Ham"], answer: 2,
      explain: "Arsenal – The Gunners (Pháo thủ)." },
    { type: "Đoán logo", icon: "🐓", image: "",
      question: "Logo có con gà trống đứng trên quả bóng là của CLB nào?",
      clue: "Đối thủ truyền kiếp của Arsenal ở London.",
      hint: "Biệt danh “Gà trống”.",
      options: ["Tottenham", "Chelsea", "Fulham", "Everton"], answer: 0,
      explain: "Tottenham Hotspur dùng biểu tượng gà trống từ hơn 100 năm nay." },
    { type: "Sự kiện bóng đá", icon: "🏆", image: "",
      question: "Đội tuyển nào vô địch World Cup 2022 tại Qatar?",
      clue: "Trận chung kết phải phân định bằng loạt sút luân lưu với Pháp.",
      hint: "Đội tuyển Nam Mỹ áo sọc xanh trắng.",
      options: ["Pháp", "Brazil", "Croatia", "Argentina"], answer: 3,
      explain: "Argentina thắng Pháp trên chấm luân lưu sau khi hòa 3–3." },
    { type: "Sự kiện bóng đá", icon: "🦊", image: "",
      question: "CLB nào tạo nên “cổ tích” khi vô địch Premier League mùa 2015–16?",
      clue: "Đầu mùa, nhà cái đánh giá cơ hội vô địch chỉ là 1 ăn 5000.",
      hint: "Biệt danh “Bầy cáo”.",
      options: ["Leicester City", "West Ham", "Southampton", "Everton"], answer: 0,
      explain: "Leicester City vô địch Premier League 2015–16 – một trong những bất ngờ lớn nhất lịch sử." },
    { type: "Sự kiện bóng đá", icon: "🌎", image: "",
      question: "World Cup 2026 được tổ chức ở những quốc gia nào?",
      clue: "Lần đầu tiên có 48 đội tham dự và 3 nước cùng đăng cai.",
      hint: "Đều ở Bắc Mỹ.",
      options: ["Mỹ, Canada, Mexico", "Mỹ, Brazil, Argentina", "Tây Ban Nha, Bồ Đào Nha, Maroc", "Anh, Pháp, Đức"], answer: 0,
      explain: "World Cup 2026 do Mỹ, Canada và Mexico đồng tổ chức." }
  ],

  /* ---------- BÀI ĐĂNG MẪU (Community) ---------- */
  samplePosts: [
    { id: "s1", author: "QuyDo_2007", tag: "Ủng hộ", time: "2026-10-19T23:55:00",
      content: "Bàn thắng phút 88 hôm qua đỉnh quá anh em ơi! Glory Glory Man United 🔴", likes: 24,
      comments: [{ author: "KopVN", text: "Trận sau gặp lại nhé 😤" }] },
    { id: "s2", author: "PhaoThuSG", tag: "Phê bình", time: "2026-10-19T08:10:00",
      content: "Arsenal dẫn trước mà vẫn để hòa, hàng thủ cần tập trung hơn ở những phút cuối.", likes: 11,
      comments: [] },
    { id: "s3", author: "FanMoi123", tag: "Câu hỏi", time: "2026-10-18T19:30:00",
      content: "Mình mới xem bóng đá, mọi người cho hỏi việt vị là gì vậy? 😅", likes: 7,
      comments: [{ author: "Coach_Tam", text: "Là khi cầu thủ tấn công đứng gần khung thành đối phương hơn cả bóng lẫn cầu thủ phòng ngự áp chót lúc đồng đội chuyền bóng." }] }
  ],

  /* ---------- FAN MẪU cho Bảng xếp hạng ---------- */
  sampleFans: [
    { name: "QuyDo_2007", points: 132 },
    { name: "KopVN", points: 118 },
    { name: "PhaoThuSG", points: 96 },
    { name: "CityzenHN", points: 84 },
    { name: "FanMoi123", points: 41 }
  ]
};
