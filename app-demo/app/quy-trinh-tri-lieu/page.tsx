import VisitProcessExplanation from "@/components/home-experience/corrected/VisitProcessExplanation";

export const metadata = {
  title: "Trước một trải nghiệm",
  description: "Những câu hỏi cần được làm rõ trước, trong và sau một trải nghiệm chăm sóc.",
};

export default function ProcessPage() {
  return (
    <div className="info-page">
      <header className="info-page__header info-page__header--split">
        <div>
          <p className="info-eyebrow">Trước một trải nghiệm</p>
          <h1>Một quy trình chỉ đáng tin khi người đọc biết đâu là điều đã xác minh</h1>
        </div>
        <p>
          Website chưa có quy trình vận hành đã được xác minh để mô tả người tiếp nhận, thao tác,
          thời lượng hay bước theo dõi. Thay vì dựng một hành trình giả, trang này giữ lại những câu
          hỏi cần được trả lời.
        </p>
      </header>
      <VisitProcessExplanation />
    </div>
  );
}
