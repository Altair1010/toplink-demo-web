import BookingStepper from "@/components/BookingStepper";
import SectionHeader from "@/components/SectionHeader";

export const metadata = {
  title: "Xem lại nhu cầu",
  description: "Sắp xếp điều đang quan tâm trên trang; không có yêu cầu nào được gửi đi.",
};

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <SectionHeader
          center
          eyebrow="Đặt lịch trải nghiệm"
          title="Xem lại nhu cầu trước khi quyết định"
          desc="Ba bước dưới đây chỉ giúp chị/anh sắp xếp điều đang quan tâm. Không có yêu cầu nào được gửi đi."
        />
      </div>
      <div className="mt-12">
        <BookingStepper />
      </div>
    </div>
  );
}
