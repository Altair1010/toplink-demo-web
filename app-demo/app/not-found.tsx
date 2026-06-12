import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="font-display text-6xl font-semibold text-gold-500">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-clay-700">Không tìm thấy trang</h1>
      <p className="mt-2 text-ink-soft">Trang chị/anh tìm có thể đã được di chuyển hoặc chưa được xây dựng trong bản demo.</p>
      <Link href="/" className="mt-6 rounded-full bg-clay-700 px-6 py-2.5 text-sm font-semibold text-ivory hover:bg-clay-800">
        Về trang chủ
      </Link>
    </div>
  );
}
