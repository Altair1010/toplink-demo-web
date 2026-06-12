import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="font-display text-7xl font-black text-gold-700">404</span>
      <h1 className="mt-4 font-display text-3xl font-black text-crimson-600">Không tìm thấy trang</h1>
      <p className="mt-2 text-lg text-ink-soft">Trang chị/anh tìm có thể đã được di chuyển hoặc chưa được xây dựng trong bản demo.</p>
      <Link href="/" className="mt-6 rounded-sm bg-crimson-600 px-7 py-3 text-base font-semibold text-gold-200 hover:bg-crimson-700">
        Về trang chủ
      </Link>
    </div>
  );
}
