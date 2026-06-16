// ============================================================
// MOCK DATA · Y Viện Toplink demo
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
  image?: string; // ảnh "trang sách" lộ qua khe bìa
}

export const LEVELS: { key: ServiceLevel; label: string; desc: string }[] = [
  { key: "co-ban", label: "Dịch vụ cơ bản", desc: "Thư giãn, chăm sóc nhẹ nhàng mỗi ngày" },
  { key: "nang-cao", label: "Dịch vụ nâng cao", desc: "Trị liệu vùng căng mỏi, dưỡng sinh khí huyết" },
  { key: "chuyen-sau", label: "Dịch vụ chuyên sâu", desc: "Liệu trình cá nhân hóa Thân · Tâm · Trí" },
];

export const SERVICES: Service[] = [
  {
    slug: "goi-dau-duong-sinh",
    name: "Gội đầu dưỡng sinh",
    level: "co-ban",
    levelLabel: "Cơ bản",
    short: "Gội đầu thảo dược kết hợp bấm huyệt đầu · cổ · vai, hỗ trợ thư giãn và dễ ngủ.",
    duration: "60 phút",
    priceFrom: "250.000đ",
    suitableFor: ["Người căng thẳng đầu óc", "Khó ngủ nhẹ", "Hay đau đầu do stress"],
    cautions: ["Da đầu đang tổn thương", "Vừa phẫu thuật vùng đầu cổ"],
    steps: [
      "Tiếp nhận và lắng nghe nhu cầu",
      "Làm sạch tóc với thảo dược ấm",
      "Bấm huyệt đầu · cổ · vai",
      "Thư giãn và sấy tạo kiểu nhẹ",
    ],
    feeling: "Đầu nhẹ, vai mềm, tinh thần thư thái như vừa ngủ một giấc sâu.",
    needs: ["thu-gian", "ngu-ngon", "giam-cang-thang", "co-vai-gay"],
    image: "/images/services/goi-dau.jpg",
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
      "Xoa bóp bàn chân · bắp chân",
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
    short: "Trị liệu chuyên sâu vùng cổ · vai · gáy bằng tay nghề và nhiệt thảo dược.",
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
    image: "/images/services/tri-lieu.jpg",
  },
  {
    slug: "tri-lieu-lung-eo",
    name: "Trị liệu lưng eo",
    level: "nang-cao",
    levelLabel: "Nâng cao",
    short: "Hỗ trợ vùng lưng · thắt lưng căng mỏi do ngồi nhiều, vận động sai tư thế.",
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
    name: "Liệu trình Thân · Tâm · Trí",
    level: "chuyen-sau",
    levelLabel: "Chuyên sâu",
    short: "Liệu trình cá nhân hóa kết hợp trị liệu cơ thể, thư giãn tâm trí và thiền dưỡng.",
    duration: "120 phút",
    priceFrom: "750.000đ",
    suitableFor: ["Người căng thẳng kéo dài", "Mất cân bằng thân tâm", "Cần phục hồi sâu"],
    cautions: ["Cần tư vấn trước với chuyên viên"],
    steps: [
      "Tư vấn và đánh giá tổng thể",
      "Làm ấm · xông · ngâm",
      "Trị liệu cơ thể chuyên sâu",
      "Thiền dưỡng và phục hồi tâm trí",
    ],
    feeling: "Thân · tâm · trí được cân bằng, sâu lắng và tĩnh tại.",
    needs: ["giam-cang-thang", "phuc-hoi", "duong-sinh", "tu-van"],
  },
  {
    slug: "lieu-trinh-nong-lanh",
    name: "Liệu trình nóng · lạnh",
    level: "chuyen-sau",
    levelLabel: "Chuyên sâu",
    short: "Liệu pháp luân phiên nóng · lạnh hỗ trợ phục hồi và đánh thức năng lượng cơ thể.",
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
    floor: "Tầng 1 · Tĩnh",
    desc: "Tiếp khách, lễ tân, check-in, tủ dược liệu. Không gian mở đầu hành trình tĩnh tại.",
    tone: "bg-crimson-800",
    image: "/images/spaces/tang-1-tinh.jpg",
  },
  {
    floor: "Tầng 2 · Thông",
    desc: "Gội dưỡng sinh, trị liệu, ngâm chân. Khơi thông khí huyết và giải tỏa căng mỏi.",
    tone: "bg-wood-500",
    image: "/images/spaces/tang-2-thong.jpg",
  },
  {
    floor: "Tầng 3 · Dưỡng",
    desc: "Xông, ngâm bồn, thư giãn phục hồi. Nuôi dưỡng cơ thể trong sự ấm áp.",
    tone: "bg-jade-600",
    image: "/images/spaces/tang-3-duong.jpg",
  },
  {
    floor: "Tầng 4 · Tỉnh",
    desc: "Trà, thiền, cộng đồng, chia sẻ sức khỏe. Tỉnh thức và kết nối.",
    tone: "bg-crimson-600",
    image: "/images/spaces/tang-4-tinh.jpg",
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
    benefit: "Giải tỏa vùng cổ vai gáy · lưng eo căng cứng.",
    forWhom: "Dân văn phòng, người ngồi nhiều.",
  },
  {
    name: "Liệu pháp nóng · lạnh phục hồi",
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
    a: "Các liệu trình tại Y Viện Toplink hỗ trợ thư giãn, lưu thông khí huyết và cân bằng thân · tâm · trí, không thay thế tư vấn y khoa chuyên môn.",
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
    name: "Y Viện Toplink · Cơ sở Trung tâm",
    address: "123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh",
    phone: "0968 824 386",
    hours: "08:00 đến 21:00 hằng ngày",
  },
];

export const PRODUCTS = [
  { slug: "tra-duong-sinh", name: "Trà dưỡng sinh thảo mộc", group: "Thảo dược", priceFrom: "120.000đ", desc: "Hỗ trợ thư giãn, dễ ngủ.", image: "/images/products/tra-duong-sinh.jpg" },
  { slug: "tui-chuom-thao-duoc", name: "Túi chườm thảo dược", group: "Hỗ trợ tại nhà", priceFrom: "180.000đ", desc: "Chườm ấm vùng cổ vai gáy.", image: "/images/products/tui-chuom-thao-duoc.jpg" },
  { slug: "goi-ngam-chan", name: "Gói ngâm chân thảo dược", group: "Thảo dược", priceFrom: "150.000đ", desc: "Ngâm chân ấm tại nhà.", image: "/images/products/goi-ngam-chan.jpg" },
  { slug: "may-massage-co", name: "Máy massage cổ vai gáy", group: "Máy sức khỏe", priceFrom: "890.000đ", desc: "Thư giãn vùng cổ vai.", image: "/images/products/may-massage-co.jpg" },
];

export interface Post {
  slug: string;
  title: string;
  cat: string;
  date: string;
  excerpt: string;
  body: string[];
  image: string;
  readTime: string;
  author?: string;
}

export const POSTS: Post[] = [
  {
    slug: "cham-soc-co-vai-gay",
    title: "5 thói quen giúp cổ vai gáy bớt căng mỏi",
    cat: "Kiến thức sức khỏe",
    date: "2026-05-28",
    excerpt: "Những điều chỉnh nhỏ trong ngày làm việc giúp vùng cổ vai gáy nhẹ nhõm hơn.",
    image: "/images/blog/blog-1.jpg",
    readTime: "5 phút đọc",
    author: "Đội ngũ Y Viện Toplink",
    body: [
      "Cổ vai gáy là vùng chịu áp lực lớn nhất với người làm việc văn phòng. Ngồi lâu một tư thế, màn hình đặt sai tầm mắt và ít vận động khiến khí huyết vùng này lưu thông kém, lâu dần thành căng cứng và đau mỏi.",
      "Thói quen đầu tiên là điều chỉnh tư thế: giữ màn hình ngang tầm mắt, vai thả lỏng, hai bàn chân chạm sàn. Một thay đổi nhỏ về độ cao ghế cũng giúp giảm tải đáng kể cho vùng gáy.",
      "Thứ hai, cứ mỗi 45 đến 60 phút hãy đứng dậy vận động nhẹ, xoay vai và kéo giãn cổ trong 1 đến 2 phút. Đây là cách đơn giản nhất để khí huyết được khơi thông trở lại.",
      "Thứ ba, giữ ấm vùng cổ vai gáy. Theo Đông y, vùng này dễ nhiễm phong hàn; một chiếc khăn mỏng khi ngồi điều hòa giúp hạn chế co cứng cơ.",
      "Thứ tư, kết hợp các liệu trình dưỡng sinh định kỳ như trị liệu cổ vai gáy với nhiệt thảo dược để giải tỏa vùng căng sâu mà các bài tập tại nhà khó chạm tới.",
      "Cuối cùng, ngủ đủ và đúng tư thế. Gối quá cao hay quá thấp đều khiến cổ làm việc cả đêm. Khi cơ thể được nghỉ ngơi đúng cách, vùng cổ vai gáy sẽ phục hồi tự nhiên.",
    ],
  },
  {
    slug: "ngu-ngon-tu-nhien",
    title: "Dưỡng sinh Đông y cho giấc ngủ sâu",
    cat: "Đông y dưỡng sinh",
    date: "2026-05-15",
    excerpt: "Vì sao ngâm chân và gội đầu dưỡng sinh hỗ trợ giấc ngủ tự nhiên.",
    image: "/images/blog/blog-2.jpg",
    readTime: "4 phút đọc",
    author: "Đội ngũ Y Viện Toplink",
    body: [
      "Giấc ngủ sâu là nền tảng của sức khỏe. Khi tâm trí căng thẳng và khí huyết không điều hòa, ta thường khó vào giấc hoặc ngủ chập chờn. Đông y dưỡng sinh tiếp cận giấc ngủ từ việc làm dịu hệ thần kinh và khơi thông tuần hoàn.",
      "Ngâm chân thảo dược ấm trước khi ngủ giúp khí huyết dồn về phần dưới cơ thể, làm ấm bàn chân và tạo cảm giác thư giãn lan tỏa. Nhiều người chỉ cần 15 đến 20 phút ngâm chân là đã thấy dễ ngủ hơn.",
      "Gội đầu dưỡng sinh kết hợp bấm huyệt vùng đầu · cổ · vai giúp giải tỏa căng thẳng tích tụ, làm dịu tâm trí. Cảm giác sau buổi gội thường là đầu nhẹ, vai mềm, tinh thần thư thái.",
      "Bên cạnh trị liệu, hãy duy trì nhịp sinh hoạt đều đặn: hạn chế màn hình điện thoại trước khi ngủ, giữ phòng tối và yên tĩnh, đi ngủ và thức dậy vào khung giờ ổn định.",
      "Khi thân được thư giãn và tâm được tĩnh tại, giấc ngủ sâu sẽ đến một cách tự nhiên, không cần ép buộc.",
    ],
  },
  {
    slug: "quy-trinh-tri-lieu",
    title: "Một buổi trị liệu tại Y Viện diễn ra thế nào?",
    cat: "Quy trình trị liệu",
    date: "2026-04-30",
    excerpt: "Hành trình 8 bước từ lúc tiếp nhận đến khi hẹn lịch chăm sóc tiếp theo.",
    image: "/images/blog/blog-3.jpg",
    readTime: "6 phút đọc",
    author: "Đội ngũ Y Viện Toplink",
    body: [
      "Tại Y Viện Toplink, mỗi buổi trị liệu đều đi theo một quy trình bài bản để chị/anh cảm thấy an tâm và được chăm sóc đúng nhu cầu, không vội vàng.",
      "Bắt đầu bằng việc tiếp nhận và lắng nghe tình trạng cơ thể. Chuyên viên sẽ trò chuyện để hiểu vùng đang căng mỏi, thói quen sinh hoạt và mong muốn của chị/anh.",
      "Tiếp đến là tư vấn liệu trình phù hợp, minh bạch về thời lượng và chi phí. Nếu chưa biết chọn gì, chị/anh hoàn toàn có thể để Toplink đề xuất.",
      "Trước khi trị liệu chính, cơ thể được làm ấm bằng xông hoặc ngâm thảo dược để cơ giãn ra và sẵn sàng. Phần trị liệu chính được thực hiện bởi kỹ thuật viên được đào tạo bài bản.",
      "Sau trị liệu là thời gian thư giãn phục hồi, dưỡng và cân bằng. Chuyên viên sẽ dặn dò cách chăm sóc, vận động nhẹ tại nhà và gợi ý lịch chăm sóc định kỳ phù hợp.",
      "Toàn bộ hành trình hướng tới một mục tiêu: để cơ thể được lắng nghe và chăm sóc đúng cách, cân bằng thân · tâm · trí.",
    ],
  },
  {
    slug: "thao-duoc-duong-sinh-bon-mua",
    title: "Thảo dược dưỡng sinh theo bốn mùa",
    cat: "Đông y dưỡng sinh",
    date: "2026-04-12",
    excerpt: "Mỗi mùa một cách dưỡng thân: gợi ý thảo dược và thói quen thuận theo tự nhiên.",
    image: "/images/blog/blog-4.jpg",
    readTime: "5 phút đọc",
    author: "Lương y Trần Minh Khang",
    body: [
      "Đông y quan niệm cơ thể con người vận hành thuận theo trời đất. Dưỡng sinh đúng cách là biết điều chỉnh sinh hoạt và thảo dược theo từng mùa trong năm.",
      "Mùa xuân chủ về can, nên dưỡng gan và lưu thông khí huyết bằng các loại trà thanh mát, vận động nhẹ nhàng vào buổi sáng.",
      "Mùa hè chủ về tâm, cần thanh nhiệt và giữ tâm an. Trà hoa cúc, lá sen hỗ trợ làm dịu cơ thể trong những ngày oi bức.",
      "Mùa thu chủ về phế, nên dưỡng ẩm và bảo vệ đường hô hấp. Mùa đông chủ về thận, là thời điểm tốt để bồi bổ, giữ ấm và nghỉ ngơi nhiều hơn.",
      "Hiểu nhịp bốn mùa giúp ta chăm sóc cơ thể chủ động, phòng bệnh từ gốc thay vì chỉ xử lý khi đã mệt mỏi.",
    ],
  },
  {
    slug: "thien-va-hoi-tho-duong-sinh",
    title: "Thiền và hơi thở trong dưỡng sinh hằng ngày",
    cat: "Kiến thức sức khỏe",
    date: "2026-03-26",
    excerpt: "Vài phút điều tức mỗi ngày giúp tâm trí tĩnh lại và khí huyết điều hòa.",
    image: "/images/blog/blog-5.jpg",
    readTime: "4 phút đọc",
    author: "Đội ngũ Y Viện Toplink",
    body: [
      "Giữa nhịp sống nhanh, tâm trí ít khi được nghỉ. Thiền và hơi thở là cách đơn giản nhất để đưa sự chú ý trở về với cơ thể.",
      "Chỉ cần ngồi yên, lưng thẳng, nhắm mắt và theo dõi hơi thở vào ra trong năm phút, hệ thần kinh đã có cơ hội dịu lại.",
      "Hơi thở sâu và chậm giúp khí huyết lưu thông, giảm căng cơ và làm dịu cảm giác lo âu tích tụ trong ngày.",
      "Duy trì thói quen này mỗi sáng hoặc trước khi ngủ, chị/anh sẽ thấy tâm trí rõ ràng hơn và giấc ngủ cũng sâu hơn.",
    ],
  },
  {
    slug: "tra-duong-sinh-moi-ngay",
    title: "Trà dưỡng sinh: thói quen nhỏ, lợi ích dài lâu",
    cat: "Đông y dưỡng sinh",
    date: "2026-03-08",
    excerpt: "Chọn và dùng trà thảo mộc đúng cách để hỗ trợ thư giãn và tiêu hóa.",
    image: "/images/blog/blog-6.jpg",
    readTime: "3 phút đọc",
    author: "Đội ngũ Y Viện Toplink",
    body: [
      "Một tách trà thảo mộc ấm là cách dưỡng sinh nhẹ nhàng mà nhiều người có thể duy trì mỗi ngày.",
      "Trà hoa cúc, cam thảo, lá sen hỗ trợ thư giãn và dễ ngủ; trà gừng, quế giúp làm ấm cơ thể trong ngày se lạnh.",
      "Nên uống trà ấm, vừa đủ, tránh quá đặc hoặc uống quá khuya để không ảnh hưởng giấc ngủ.",
      "Quan trọng nhất là sự đều đặn: một thói quen nhỏ duy trì lâu dài thường mang lại lợi ích bền hơn những thay đổi vội vàng.",
    ],
  },
];

export const CONTACT = {
  hotline: "0968 824 386",
  zalo: "https://zalo.me/0968824386",
  email: "cskh@toplink.vn",
  facebook: "https://facebook.com/yvientoplink",
  hours: "08:00 đến 21:00 hằng ngày",
  mapsQuery: "Y+Vien+Toplink",
};

// ---- Số liệu / cam kết niềm tin (dùng cam kết chất lượng, không phóng đại) ----
export const STATS: { value: string; label: string }[] = [
  { value: "100%", label: "Kỹ thuật viên được đào tạo bài bản" },
  { value: "8+", label: "Liệu trình dưỡng sinh & trị liệu" },
  { value: "4 tầng", label: "Không gian Tĩnh · Thông · Dưỡng · Tỉnh" },
  { value: "An toàn", label: "Liệu pháp tự nhiên, minh bạch" },
];

// ---- Đội ngũ chuyên viên / kỹ thuật viên ----
export interface TeamMember {
  name: string;
  title: string;
  expertise: string;
  experience: string;
  image: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Lương y Trần Minh Khang",
    title: "Cố vấn chuyên môn Đông y",
    expertise: "Dưỡng sinh, điều hòa khí huyết, tư vấn thể trạng",
    experience: "Hơn 20 năm thực hành Đông y dưỡng sinh",
    image: "/images/team/member-1.jpg",
  },
  {
    name: "Chuyên viên Nguyễn Thị Thu Hà",
    title: "Trưởng nhóm trị liệu",
    expertise: "Trị liệu cổ vai gáy, lưng eo, trị liệu cơ sâu",
    experience: "10 năm kinh nghiệm trị liệu thủ công",
    image: "/images/team/member-2.jpg",
  },
  {
    name: "KTV Phạm Quốc Bảo",
    title: "Kỹ thuật viên dưỡng sinh",
    expertise: "Xông · ngâm thảo dược, liệu pháp nóng · lạnh",
    experience: "Được đào tạo bài bản, chứng chỉ nghề chăm sóc sức khỏe",
    image: "/images/team/member-3.jpg",
  },
  {
    name: "Chuyên viên Lê Thảo Nguyên",
    title: "Tư vấn & chăm sóc khách hàng",
    expertise: "Tiếp nhận, lắng nghe nhu cầu, gợi ý liệu trình",
    experience: "Đồng hành cùng khách hàng từ buổi đầu tiên",
    image: "/images/team/member-4.jpg",
  },
];

// ---- Nội dung trang Đào tạo ----
export const TRAINING = {
  intro:
    "Toplink đào tạo kỹ thuật viên trị liệu Đông y dưỡng sinh bài bản, từ nền tảng lý thuyết khí huyết, kinh lạc đến thực hành trị liệu an toàn và chăm sóc khách hàng.",
  benefits: [
    "Lộ trình từ cơ bản đến chuyên sâu, học đi đôi với thực hành.",
    "Giảng dạy bởi lương y và chuyên viên giàu kinh nghiệm.",
    "Cấp chứng nhận hoàn thành và cơ hội làm việc tại hệ thống Toplink.",
    "Thực hành trên thiết bị và quy trình chuẩn của Y Viện.",
  ],
  roadmap: [
    { title: "Nền tảng dưỡng sinh", desc: "Lý thuyết khí huyết, kinh lạc, thể trạng và nguyên tắc an toàn." },
    { title: "Kỹ năng trị liệu", desc: "Thực hành day ấn, trị liệu cơ sâu, xông · ngâm thảo dược." },
    { title: "Chăm sóc khách hàng", desc: "Tiếp nhận, lắng nghe nhu cầu, tư vấn liệu trình phù hợp." },
    { title: "Thực hành & chứng nhận", desc: "Thực hành có giám sát, đánh giá và cấp chứng nhận hoàn thành." },
  ],
};

// ---- Nội dung trang Nhượng quyền / Hợp tác ----
export const FRANCHISE = {
  intro:
    "Hợp tác cùng Toplink để mang mô hình Y Viện dưỡng sinh · tỉnh thức đến gần hơn với cộng đồng, với sự hỗ trợ trọn gói từ vận hành đến chuyên môn.",
  supports: [
    { title: "Set-up & vận hành", desc: "Tư vấn thiết kế không gian, quy trình vận hành chuẩn Y Viện." },
    { title: "Đào tạo đội ngũ", desc: "Đào tạo kỹ thuật viên và chuyên viên chăm sóc bài bản." },
    { title: "Sản phẩm & dược liệu", desc: "Cung ứng thảo dược, sản phẩm hỗ trợ đạt chuẩn." },
    { title: "Marketing & thương hiệu", desc: "Đồng bộ bộ nhận diện và hỗ trợ truyền thông địa phương." },
  ],
};
