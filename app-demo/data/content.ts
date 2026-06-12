// ============================================================
// MOCK DATA — Y Viện Toplink demo
// Dữ liệu tĩnh để demo giao diện. Chưa kết nối database.
// ============================================================

export type ServiceLevel = "co-ban" | "nang-cao" | "chuyen-sau";

export interface Service {
  slug: string;
  name: string;
  level: ServiceLevel;
  levelLabel: string;
  short: string;
  duration: string;
  priceFrom: string;
  suitableFor: string[];
  cautions: string[];
  steps: string[];
  feeling: string;
  needs: string[]; // need keys this service answers
}

export const LEVELS: { key: ServiceLevel; label: string; desc: string }[] = [
  { key: "co-ban", label: "Dịch vụ cơ bản", desc: "Thư giãn, chăm sóc nhẹ nhàng mỗi ngày" },
  { key: "nang-cao", label: "Dịch vụ nâng cao", desc: "Trị liệu vùng căng mỏi, dưỡng sinh khí huyết" },
  { key: "chuyen-sau", label: "Dịch vụ chuyên sâu", desc: "Liệu trình cá nhân hóa Thân – Tâm – Trí" },
];

export const SERVICES: Service[] = [
  {
    slug: "goi-dau-duong-sinh",
    name: "Gội đầu dưỡng sinh",
    level: "co-ban",
    levelLabel: "Cơ bản",
    short: "Gội đầu thảo dược kết hợp bấm huyệt đầu – cổ – vai, hỗ trợ thư giãn và dễ ngủ.",
    duration: "60 phút",
    priceFrom: "250.000đ",
    suitableFor: ["Người căng thẳng đầu óc", "Khó ngủ nhẹ", "Hay đau đầu do stress"],
    cautions: ["Da đầu đang tổn thương", "Vừa phẫu thuật vùng đầu cổ"],
    steps: [
      "Tiếp nhận và lắng nghe nhu cầu",
      "Làm sạch tóc với thảo dược ấm",
      "Bấm huyệt đầu – cổ – vai",
      "Thư giãn và sấy tạo kiểu nhẹ",
    ],
    feeling: "Đầu nhẹ, vai mềm, tinh thần thư thái như vừa ngủ một giấc sâu.",
    needs: ["thu-gian", "ngu-ngon", "giam-cang-thang", "co-vai-gay"],
  },
  {
    slug: "ngam-chan-thao-duoc",
    name: "Ngâm chân thảo dược",
    level: "co-ban",
    levelLabel: "Cơ bản",
    short: "Ngâm chân nước thảo dược ấm kết hợp xoa bóp bàn chân, hỗ trợ lưu thông khí huyết.",
    duration: "45 phút",
    priceFrom: "180.000đ",
    suitableFor: ["Người hay lạnh chân tay", "Đứng/ngồi nhiều", "Khó ngủ"],
    cautions: ["Vết thương hở ở chân", "Giãn tĩnh mạch nặng"],
    steps: [
      "Pha nước thảo dược theo thể trạng",
      "Ngâm ấm và làm mềm cơ",
      "Xoa bóp bàn chân – bắp chân",
      "Ủ ấm và nghỉ ngơi",
    ],
    feeling: "Chân ấm, người nhẹ, dễ đi vào giấc ngủ hơn.",
    needs: ["thu-gian", "ngu-ngon", "phuc-hoi"],
  },
  {
    slug: "xong-hoi-thu-gian",
    name: "Xông hơi thư giãn",
    level: "co-ban",
    levelLabel: "Cơ bản",
    short: "Xông hơi thảo dược giúp giãn cơ, hỗ trợ đào thải và thư giãn sâu.",
    duration: "40 phút",
    priceFrom: "200.000đ",
    suitableFor: ["Người mệt mỏi", "Căng cơ sau vận động"],
    cautions: ["Huyết áp không ổn định", "Phụ nữ mang thai"],
    steps: ["Chuẩn bị phòng xông ấm", "Xông thảo dược", "Nghỉ ngơi bù nước", "Lau khô giữ ấm"],
    feeling: "Cơ thể nhẹ nhõm, hơi thở sâu và dễ chịu.",
    needs: ["thu-gian", "phuc-hoi", "giam-cang-thang"],
  },
  {
    slug: "tri-lieu-co-vai-gay",
    name: "Trị liệu cổ vai gáy",
    level: "nang-cao",
    levelLabel: "Nâng cao",
    short: "Trị liệu chuyên sâu vùng cổ – vai – gáy bằng tay nghề và nhiệt thảo dược.",
    duration: "75 phút",
    priceFrom: "390.000đ",
    suitableFor: ["Dân văn phòng", "Hay mỏi cổ vai gáy", "Ngồi máy tính nhiều"],
    cautions: ["Thoát vị đĩa đệm nặng", "Chấn thương cột sống cổ"],
    steps: [
      "Đánh giá vùng căng mỏi",
      "Làm ấm cơ bằng nhiệt thảo dược",
      "Trị liệu day ấn giải tỏa",
      "Kéo giãn nhẹ và dặn dò tư thế",
    ],
    feeling: "Cổ vai gáy giãn ra, cảm giác căng cứng giảm rõ rệt.",
    needs: ["co-vai-gay", "giam-cang-thang", "phuc-hoi"],
  },
  {
    slug: "tri-lieu-lung-eo",
    name: "Trị liệu lưng eo",
    level: "nang-cao",
    levelLabel: "Nâng cao",
    short: "Hỗ trợ vùng lưng – thắt lưng căng mỏi do ngồi nhiều, vận động sai tư thế.",
    duration: "75 phút",
    priceFrom: "390.000đ",
    suitableFor: ["Đau mỏi lưng do tư thế", "Lái xe đường dài", "Mẹ sau sinh (đã ổn định)"],
    cautions: ["Đau lưng cấp", "Loãng xương nặng"],
    steps: ["Đánh giá vùng lưng eo", "Làm ấm và giãn cơ", "Trị liệu giải tỏa", "Hướng dẫn vận động nhẹ"],
    feeling: "Lưng mềm hơn, dễ vận động, giảm cảm giác nặng nề.",
    needs: ["lung-eo", "phuc-hoi", "giam-cang-thang"],
  },
  {
    slug: "duong-sinh-khi-huyet",
    name: "Dưỡng sinh khí huyết",
    level: "nang-cao",
    levelLabel: "Nâng cao",
    short: "Liệu pháp Đông y dưỡng sinh hỗ trợ lưu thông khí huyết, cân bằng cơ thể.",
    duration: "90 phút",
    priceFrom: "450.000đ",
    suitableFor: ["Người hay mệt", "Tuần hoàn kém", "Muốn dưỡng sinh định kỳ"],
    cautions: ["Đang sốt", "Bệnh lý nền cần theo dõi"],
    steps: ["Bắt mạch, lắng nghe thể trạng", "Làm ấm cơ thể", "Day ấn theo kinh lạc", "Dưỡng và nghỉ ngơi"],
    feeling: "Cơ thể ấm áp, tràn năng lượng, tinh thần sáng rõ.",
    needs: ["duong-sinh", "phuc-hoi", "tu-van"],
  },
  {
    slug: "lieu-trinh-than-tam-tri",
    name: "Liệu trình Thân – Tâm – Trí",
    level: "chuyen-sau",
    levelLabel: "Chuyên sâu",
    short: "Liệu trình cá nhân hóa kết hợp trị liệu cơ thể, thư giãn tâm trí và thiền dưỡng.",
    duration: "120 phút",
    priceFrom: "750.000đ",
    suitableFor: ["Người căng thẳng kéo dài", "Mất cân bằng thân tâm", "Cần phục hồi sâu"],
    cautions: ["Cần tư vấn trước với chuyên viên"],
    steps: [
      "Tư vấn và đánh giá tổng thể",
      "Làm ấm – xông – ngâm",
      "Trị liệu cơ thể chuyên sâu",
      "Thiền dưỡng và phục hồi tâm trí",
    ],
    feeling: "Thân – tâm – trí được cân bằng, sâu lắng và tĩnh tại.",
    needs: ["giam-cang-thang", "phuc-hoi", "duong-sinh", "tu-van"],
  },
  {
    slug: "lieu-trinh-nong-lanh",
    name: "Liệu trình nóng – lạnh",
    level: "chuyen-sau",
    levelLabel: "Chuyên sâu",
    short: "Liệu pháp luân phiên nóng – lạnh hỗ trợ phục hồi và đánh thức năng lượng cơ thể.",
    duration: "90 phút",
    priceFrom: "650.000đ",
    suitableFor: ["Người cần phục hồi nhanh", "Vận động viên nghiệp dư"],
    cautions: ["Tim mạch không ổn định", "Huyết áp cao"],
    steps: ["Đánh giá thể trạng", "Làm nóng cơ thể", "Chuyển lạnh có kiểm soát", "Cân bằng và nghỉ ngơi"],
    feeling: "Tỉnh táo, sảng khoái, cơ thể như được tái khởi động.",
    needs: ["phuc-hoi", "duong-sinh"],
  },
];

export interface Need {
  key: string;
  label: string;
  emoji: string;
}

export const NEEDS: Need[] = [
  { key: "thu-gian", label: "Thư giãn", emoji: "🍃" },
  { key: "ngu-ngon", label: "Ngủ ngon hơn", emoji: "🌙" },
  { key: "co-vai-gay", label: "Cổ vai gáy", emoji: "💆" },
  { key: "lung-eo", label: "Lưng eo", emoji: "🧘" },
  { key: "giam-cang-thang", label: "Giảm căng thẳng", emoji: "🌿" },
  { key: "phuc-hoi", label: "Phục hồi năng lượng", emoji: "✨" },
  { key: "duong-sinh", label: "Dưỡng sinh định kỳ", emoji: "☯️" },
  { key: "tu-van", label: "Tư vấn liệu trình", emoji: "💬" },
];

export const PROCESS_STEPS = [
  { title: "Tiếp nhận tình trạng", desc: "Lắng nghe và ghi nhận tình trạng cơ thể của chị/anh." },
  { title: "Lắng nghe nhu cầu", desc: "Hiểu cơ thể đang cần gì để gợi ý đúng hướng." },
  { title: "Tư vấn liệu trình", desc: "Đề xuất liệu trình phù hợp, minh bạch và an toàn." },
  { title: "Làm ấm cơ thể", desc: "Xông, ngâm thảo dược giúp cơ thể sẵn sàng trị liệu." },
  { title: "Trị liệu chính", desc: "Thực hiện trị liệu bởi kỹ thuật viên được đào tạo bài bản." },
  { title: "Thư giãn phục hồi", desc: "Nghỉ ngơi, dưỡng và cân bằng sau trị liệu." },
  { title: "Dặn dò sau trị liệu", desc: "Hướng dẫn chăm sóc và vận động tại nhà." },
  { title: "Hẹn lịch chăm sóc", desc: "Lên kế hoạch chăm sóc định kỳ phù hợp." },
];

export const SPACES = [
  {
    floor: "Tầng 1 – Tĩnh",
    desc: "Tiếp khách, lễ tân, check-in, tủ dược liệu. Không gian mở đầu hành trình tĩnh tại.",
    tone: "bg-crimson-800",
  },
  {
    floor: "Tầng 2 – Thông",
    desc: "Gội dưỡng sinh, trị liệu, ngâm chân. Khơi thông khí huyết và giải tỏa căng mỏi.",
    tone: "bg-wood-500",
  },
  {
    floor: "Tầng 3 – Dưỡng",
    desc: "Xông, ngâm bồn, thư giãn phục hồi. Nuôi dưỡng cơ thể trong sự ấm áp.",
    tone: "bg-jade-600",
  },
  {
    floor: "Tầng 4 – Tỉnh",
    desc: "Trà, thiền, cộng đồng, chia sẻ sức khỏe. Tỉnh thức và kết nối.",
    tone: "bg-crimson-600",
  },
];

// ---- Công nghệ & thiết bị chăm sóc sức khỏe ----

export interface Technology {
  name: string;
  effect: string;
  benefit: string;
  forWhom: string;
}

export const TECHNOLOGIES: Technology[] = [
  {
    name: "Nhiệt trị liệu thảo dược",
    effect: "Làm ấm sâu, kích thích lưu thông khí huyết.",
    benefit: "Giảm cảm giác nặng mỏi, thư giãn cơ sau ngày dài.",
    forWhom: "Người hay lạnh, tuần hoàn kém, căng cơ.",
  },
  {
    name: "Xông hơi & ngâm bồn dược liệu",
    effect: "Giãn nở lỗ chân lông, hỗ trợ đào thải, làm mềm cơ.",
    benefit: "Cơ thể nhẹ nhõm, hơi thở sâu, dễ ngủ hơn.",
    forWhom: "Người mệt mỏi, căng thẳng kéo dài.",
  },
  {
    name: "Trị liệu cơ sâu thủ công",
    effect: "Day ấn theo kinh lạc bởi kỹ thuật viên được đào tạo.",
    benefit: "Giải tỏa vùng cổ vai gáy – lưng eo căng cứng.",
    forWhom: "Dân văn phòng, người ngồi nhiều.",
  },
  {
    name: "Liệu pháp nóng – lạnh phục hồi",
    effect: "Luân phiên nhiệt có kiểm soát, đánh thức năng lượng.",
    benefit: "Tỉnh táo, sảng khoái, cơ thể như được tái khởi động.",
    forWhom: "Người cần phục hồi nhanh, vận động viên nghiệp dư.",
  },
];

export const REVIEWS = [
  {
    name: "Chị Lan Hương",
    role: "Khách hàng thân thiết",
    text: "Không gian rất tĩnh và sạch. Sau buổi trị liệu cổ vai gáy mình ngủ ngon hơn hẳn.",
  },
  {
    name: "Anh Minh Đức",
    role: "Nhân viên văn phòng",
    text: "Mình hay mỏi lưng vì ngồi nhiều. Liệu trình lưng eo ở đây làm rất kỹ và đúng nhu cầu.",
  },
  {
    name: "Cô Thanh Mai",
    role: "Dưỡng sinh định kỳ",
    text: "Mỗi tuần mình đến gội đầu dưỡng sinh, cảm giác như được chăm sóc thật sự chứ không vội vàng.",
  },
];

export const FAQS = [
  {
    q: "Tôi chưa biết chọn dịch vụ nào thì sao?",
    a: "Chị/anh chỉ cần chọn nhu cầu chính hoặc bấm “Để Toplink tư vấn”. Chuyên viên sẽ gọi lại và gợi ý liệu trình phù hợp với thể trạng.",
  },
  {
    q: "Trị liệu ở Toplink có thay thế khám chữa bệnh không?",
    a: "Các liệu trình tại Y Viện Toplink hỗ trợ thư giãn, lưu thông khí huyết và cân bằng thân – tâm – trí, không thay thế tư vấn y khoa chuyên môn.",
  },
  {
    q: "Lần đầu đến cần chuẩn bị gì?",
    a: "Chị/anh chỉ cần đến đúng giờ hẹn, mặc thoải mái. Mọi vật dụng trị liệu Y Viện đều chuẩn bị sẵn.",
  },
  {
    q: "Có thể đặt lịch theo gói định kỳ không?",
    a: "Có. Toplink có các gói liệu trình theo buổi, giúp chăm sóc đều đặn với chi phí ưu đãi hơn.",
  },
];

export const BRANCHES = [
  {
    slug: "co-so-trung-tam",
    name: "Y Viện Toplink — Cơ sở Trung tâm",
    address: "123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh",
    phone: "0968 824 386",
    hours: "08:00 – 21:00 hằng ngày",
  },
  {
    slug: "co-so-2",
    name: "Y Viện Toplink — Cơ sở 2",
    address: "45 Đường Dưỡng Sinh, Quận 3, TP. Hồ Chí Minh",
    phone: "0968 824 387",
    hours: "08:00 – 21:00 hằng ngày",
  },
];

export const PRODUCTS = [
  { slug: "tra-duong-sinh", name: "Trà dưỡng sinh thảo mộc", group: "Thảo dược", priceFrom: "120.000đ", desc: "Hỗ trợ thư giãn, dễ ngủ." },
  { slug: "tui-chuom-thao-duoc", name: "Túi chườm thảo dược", group: "Hỗ trợ tại nhà", priceFrom: "180.000đ", desc: "Chườm ấm vùng cổ vai gáy." },
  { slug: "goi-ngam-chan", name: "Gói ngâm chân thảo dược", group: "Thảo dược", priceFrom: "150.000đ", desc: "Ngâm chân ấm tại nhà." },
  { slug: "may-massage-co", name: "Máy massage cổ vai gáy", group: "Máy sức khỏe", priceFrom: "890.000đ", desc: "Thư giãn vùng cổ vai." },
];

export const POSTS = [
  { slug: "cham-soc-co-vai-gay", title: "5 thói quen giúp cổ vai gáy bớt căng mỏi", cat: "Kiến thức sức khỏe", excerpt: "Những điều chỉnh nhỏ trong ngày làm việc giúp vùng cổ vai gáy nhẹ nhõm hơn." },
  { slug: "ngu-ngon-tu-nhien", title: "Dưỡng sinh Đông y cho giấc ngủ sâu", cat: "Đông y dưỡng sinh", excerpt: "Vì sao ngâm chân và gội đầu dưỡng sinh hỗ trợ giấc ngủ tự nhiên." },
  { slug: "quy-trinh-tri-lieu", title: "Một buổi trị liệu tại Y Viện diễn ra thế nào?", cat: "Quy trình trị liệu", excerpt: "Hành trình 8 bước từ lúc tiếp nhận đến khi hẹn lịch chăm sóc tiếp theo." },
];

export const CONTACT = {
  hotline: "0968 824 386",
  zalo: "https://zalo.me",
  mapsQuery: "Y+Vien+Toplink",
};
