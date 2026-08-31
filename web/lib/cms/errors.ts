export class CmsUnavailableError extends Error {
  constructor(message = "CMS tạm thời không khả dụng", options?: ErrorOptions) {
    super(message, options);
    this.name = "CmsUnavailableError";
  }
}

export class CmsNotFoundError extends Error {
  constructor(message = "Không tìm thấy nội dung CMS") {
    super(message);
    this.name = "CmsNotFoundError";
  }
}
