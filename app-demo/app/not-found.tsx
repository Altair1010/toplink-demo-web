import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="text-7xl font-semibold text-ink-mute">404</span>
      <h1 className="mt-4 text-3xl font-semibold text-ink">Không tìm thấy trang</h1>
      <p className="mt-2 text-lg text-ink-soft">
        Trang chị/anh tìm có thể đã được di chuyển hoặc chưa được xây dựng trong bản demo.
      </p>
      <Link href="/" className="info-text-link mt-6">
        Về trang chủ
      </Link>
    </div>
  );
}
