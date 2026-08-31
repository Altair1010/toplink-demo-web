import type { Article, ContentField, Product, Service, SiteSettings } from "@/types/domain";

const fixtureSource = "P4 comparison scaffold — not production content";

function reference<T>(value: T, owner: ContentField<T>["owner"]): ContentField<T> {
  return { value, owner, source: fixtureSource, status: "REFERENCE_ONLY" };
}

function approved<T>(value: T, owner: ContentField<T>["owner"], source: string): ContentField<T> {
  return { value, owner, source, status: "APPROVED" };
}

function pending<T>(
  owner: ContentField<T | null>["owner"],
  source: string,
): ContentField<T | null> {
  return { value: null, owner, source, status: "PENDING" };
}

export const siteSettings: SiteSettings = {
  public_display_name: approved("Y Viện Toplink", "BUSINESS", "DECISIONS.md D-001"),
  address: pending("BUSINESS", "Verified operational record not supplied"),
  opening_hours: pending("BUSINESS", "Verified operational record not supplied"),
  hotline: pending("BUSINESS", "Verified channel record not supplied"),
  zalo_destination: pending("BUSINESS", "Verified official channel not supplied"),
  facebook_destination: pending("BUSINESS", "Verified official channel not supplied"),
  social_links: pending("BUSINESS", "Verified official channels not supplied"),
  legal_identifiers: pending("BUSINESS", "Verified legal record not supplied"),
};

export const services: readonly Service[] = [
  {
    title: reference("Bản mẫu cấu trúc dịch vụ", "BUSINESS"),
    slug: reference("ban-mau-cau-truc", "SYSTEM"),
    summary: reference(
      "Record trung tính để kiểm tra cách một dịch vụ tương lai được giải thích đủ mục đích, quy trình và giới hạn.",
      "EDITORIAL",
    ),
    service_group: reference("Nhóm dịch vụ — chờ taxonomy được duyệt", "BUSINESS"),
    body: reference(
      [
        "Trang chi tiết bắt đầu từ điều người đọc cần hiểu, không suy diễn từ triệu chứng.",
        "Mọi nội dung thực tế phải được thay bằng hồ sơ dịch vụ đã được phê duyệt trước khi xuất bản.",
      ],
      "EDITORIAL",
    ),
    who_it_may_fit: reference(
      ["Người đang tìm hiểu một lựa chọn hỗ trợ", "Người chăm sóc cần đọc rõ phạm vi và giới hạn"],
      "BUSINESS",
    ),
    limitations_cautions: reference(
      [
        "Bản mẫu này không mô tả mức độ phù hợp y khoa.",
        "Không dùng nội dung website để tự chẩn đoán hoặc thay thế đánh giá chuyên môn.",
      ],
      "BUSINESS",
    ),
    professional_evaluation: reference(
      "Khi quyết định liên quan đến sức khỏe, cần trao đổi với người có chuyên môn phù hợp.",
      "BUSINESS",
    ),
    experience_process: reference(
      ["Làm rõ nhu cầu", "Đọc thông tin đã xác minh", "Hiểu giới hạn trước bước tiếp theo"],
      "BUSINESS",
    ),
    related_knowledge: reference(["cach-doc-thong-tin-an-toan"], "SYSTEM"),
    display_order: reference(1, "SYSTEM"),
    seo: reference(
      {
        title: "Bản mẫu cấu trúc dịch vụ | Y Viện Toplink",
        description: "Dữ liệu fixture P4 để kiểm tra cấu trúc trang dịch vụ.",
        canonicalPath: "/dich-vu/ban-mau-cau-truc",
      },
      "EDITORIAL/SYSTEM",
    ),
    evidence_state: reference("Chỉ là fixture P4; chưa phải hồ sơ dịch vụ", "BUSINESS"),
    editorial_lifecycle: "draft",
  },
  {
    title: reference("Bản mẫu nội dung dài", "BUSINESS"),
    slug: reference("ban-mau-noi-dung-dai", "SYSTEM"),
    summary: reference(
      "Record thứ hai thử nghiệm tiêu đề và mô tả dài hơn mà không phát minh taxonomy hay cam kết sức khỏe.",
      "EDITORIAL",
    ),
    service_group: reference("Nhóm dịch vụ — chờ taxonomy được duyệt", "BUSINESS"),
    body: reference(["Nội dung dài kiểm tra nhịp đọc và khả năng reflow."], "EDITORIAL"),
    who_it_may_fit: reference(["Người đọc cần so sánh thông tin minh bạch"], "BUSINESS"),
    limitations_cautions: reference(["Không phải dữ liệu dịch vụ thực."], "BUSINESS"),
    professional_evaluation: reference("Đánh giá chuyên môn khi phù hợp.", "BUSINESS"),
    experience_process: reference(["Đọc", "Hiểu", "Cân nhắc"], "BUSINESS"),
    display_order: reference(2, "SYSTEM"),
    seo: reference(
      {
        title: "Bản mẫu nội dung dài | Y Viện Toplink",
        description: "Fixture P4 kiểm tra độ dài nội dung.",
        canonicalPath: "/dich-vu/ban-mau-noi-dung-dai",
      },
      "EDITORIAL/SYSTEM",
    ),
    evidence_state: reference("Fixture P4", "BUSINESS"),
    editorial_lifecycle: "draft",
  },
] as const;

export const products: readonly Product[] = [
  {
    title: reference("Hồ sơ sản phẩm mẫu", "BUSINESS"),
    slug: reference("ho-so-san-pham-mau", "SYSTEM"),
    summary: reference(
      "Fixture kiểm tra một hồ sơ thông tin không có giá, tồn kho, mua hàng hay lời mời upsell.",
      "EDITORIAL",
    ),
    safe_positioning: reference("Chỉ dùng để kiểm tra cấu trúc tài liệu sản phẩm.", "BUSINESS"),
    supported_use_statements: reference(
      ["Chỉ trình bày phát biểu sử dụng khi tài liệu đã được xác minh"],
      "BUSINESS",
    ),
    limitations_cautions: reference(
      ["Không suy luận công dụng từ tên, hình ảnh hoặc nhóm sản phẩm"],
      "BUSINESS",
    ),
    documentation_status: reference("Chưa có tài liệu sản phẩm thực", "BUSINESS"),
    body: reference(
      ["Hồ sơ sản phẩm tương lai phải tách điều được hỗ trợ khỏi giới hạn và điều chưa xác minh."],
      "EDITORIAL",
    ),
    related_knowledge: reference(["cach-doc-thong-tin-an-toan"], "SYSTEM"),
    seo: reference(
      {
        title: "Hồ sơ sản phẩm mẫu | Y Viện Toplink",
        description: "Fixture P4 cho documentation hall.",
        canonicalPath: "/san-pham/ho-so-san-pham-mau",
      },
      "EDITORIAL/SYSTEM",
    ),
    evidence_state: reference("Fixture P4; chưa có tài liệu sản phẩm", "BUSINESS"),
    editorial_lifecycle: "draft",
  },
] as const;

export const articles: readonly Article[] = [
  {
    title: reference("Cách đọc thông tin chăm sóc sức khỏe một cách an toàn", "EDITORIAL"),
    slug: reference("cach-doc-thong-tin-an-toan", "SYSTEM"),
    summary: reference(
      "Bản đọc mẫu giúp kiểm tra đường đọc: giải thích, bằng chứng, áp dụng có giới hạn và điểm dừng an toàn.",
      "EDITORIAL",
    ),
    body: reference(
      [
        "Bắt đầu bằng câu hỏi bạn thực sự cần hiểu và xác định rõ nguồn của từng thông tin.",
        "Tách sự thật đã được duyệt, kinh nghiệm được ghi nhận và suy luận. Một câu chuyện riêng lẻ không chứng minh kết quả phổ quát.",
        "Chỉ áp dụng hướng dẫn nằm trong phạm vi an toàn đã được phê duyệt; dừng lại khi thông tin không đủ cho quyết định sức khỏe.",
        "Tìm đánh giá chuyên môn khi câu hỏi vượt khỏi nội dung giáo dục chung hoặc liên quan đến dấu hiệu đáng lo.",
      ],
      "EDITORIAL",
    ),
    article_type: reference("knowledge", "EDITORIAL"),
    author: reference("Biên tập fixture P4", "EDITORIAL"),
    published_at: reference("2026-08-31", "SYSTEM"),
    related_articles: reference(["gioi-han-cua-noi-dung-tren-website"], "SYSTEM"),
    evidence_reference_state: reference(
      "Nguồn minh họa chưa phải tài liệu xuất bản",
      "EDITORIAL/BUSINESS",
    ),
    seo: reference(
      {
        title: "Cách đọc thông tin an toàn | Y Viện Toplink",
        description: "Fixture P4 cho reading hall.",
        canonicalPath: "/kien-thuc/cach-doc-thong-tin-an-toan",
      },
      "EDITORIAL/SYSTEM",
    ),
    editorial_lifecycle: "draft",
  },
  {
    title: reference("Giới hạn của nội dung trên website", "EDITORIAL"),
    slug: reference("gioi-han-cua-noi-dung-tren-website", "SYSTEM"),
    summary: reference("Bài mẫu ngắn kiểm tra quan hệ đọc tiếp có giới hạn.", "EDITORIAL"),
    body: reference(
      [
        "Nội dung giáo dục không thay thế đánh giá chuyên môn và không xác nhận một lựa chọn phù hợp cho từng người.",
      ],
      "EDITORIAL",
    ),
    article_type: reference("knowledge", "EDITORIAL"),
    author: reference("Biên tập fixture P4", "EDITORIAL"),
    published_at: reference("2026-08-31", "SYSTEM"),
    evidence_reference_state: reference("Fixture P4", "EDITORIAL/BUSINESS"),
    seo: reference(
      {
        title: "Giới hạn nội dung website | Y Viện Toplink",
        description: "Fixture P4.",
        canonicalPath: "/kien-thuc/gioi-han-cua-noi-dung-tren-website",
      },
      "EDITORIAL/SYSTEM",
    ),
    editorial_lifecycle: "draft",
  },
  {
    title: reference("Bản tin vận hành mẫu", "EDITORIAL"),
    slug: reference("ban-tin-van-hanh-mau", "SYSTEM"),
    summary: reference("Fixture kiểm tra editorial docket có loại và ngày rõ ràng.", "EDITORIAL"),
    body: reference(
      [
        "Nội dung thời điểm thực chỉ được xuất bản khi sự kiện và thông tin vận hành đã được xác minh.",
      ],
      "EDITORIAL",
    ),
    article_type: reference("operational_update", "EDITORIAL"),
    author: reference("Biên tập fixture P4", "EDITORIAL"),
    published_at: reference("2026-08-31", "SYSTEM"),
    evidence_reference_state: reference("Không phải bản tin vận hành thực", "EDITORIAL/BUSINESS"),
    seo: reference(
      {
        title: "Bản tin vận hành mẫu | Y Viện Toplink",
        description: "Fixture P4 cho editorial chamber.",
        canonicalPath: "/tin-tuc/ban-tin-van-hanh-mau",
      },
      "EDITORIAL/SYSTEM",
    ),
    editorial_lifecycle: "draft",
  },
] as const;

export const fixtureManifest = Object.freeze({
  fixtureOnly: true,
  source: fixtureSource,
  serviceCount: services.length,
  productCount: products.length,
  articleCount: articles.length,
});
