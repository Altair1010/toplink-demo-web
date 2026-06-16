import BookingStepper from "@/components/BookingStepper";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Đặt lịch · Y Viện Toplink" };

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <SectionHeader center eyebrow="Đặt lịch trải nghiệm" title="Chỉ 3 bước để được chăm sóc" desc="Toplink sẽ gọi lại xác nhận. Chị/anh chưa cần tạo tài khoản." />
      </div>
      <div className="mt-12">
        <BookingStepper />
      </div>
    </div>
  );
}
