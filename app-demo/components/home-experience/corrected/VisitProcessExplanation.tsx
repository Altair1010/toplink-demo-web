const EXPECTATION_QUESTIONS = [
  {
    label: "Trước khi bắt đầu",
    question: "Ai tiếp nhận, và thông tin nào thực sự cần được chia sẻ?",
  },
  {
    label: "Trong trải nghiệm",
    question: "Ai thực hiện, phạm vi thao tác là gì, và khi nào cần dừng?",
  },
  {
    label: "Sau khi kết thúc",
    question: "Có hướng dẫn hoặc bước theo dõi nào thật sự được vận hành?",
  },
] as const;

export default function VisitProcessExplanation() {
  return (
    <section className="hh-narrative__visit" aria-labelledby="hh-visit-process-title">
      <div className="hh-narrative__visit-heading">
        <p className="hh-narrative__label">Một buổi cần làm rõ điều gì?</p>
        <h2 id="hh-visit-process-title" className="hh-narrative__visit-title">
          Một quy trình chỉ có ích khi nó nói đúng điều đang được vận hành.
        </h2>
      </div>
      <div className="hh-narrative__visit-body">
        <p className="hh-narrative__visit-limit">
          Website hiện chưa có nguồn vận hành đã duyệt để mô tả một trình tự cụ thể. Vì vậy phần này
          không lặp lại mô tả bốn bước trước đây, thời lượng, người thực hiện hay lời hứa theo dõi.
        </p>
        <dl className="hh-narrative__visit-questions">
          {EXPECTATION_QUESTIONS.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.question}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
