import { selectVisibleEvidence } from "./evidence-visibility.mjs";
import type { EvidenceRecord } from "./evidence-visibility.mjs";

const PRODUCTION_EVIDENCE: readonly EvidenceRecord[] = [];

interface EvidenceAnswerProps {
  records?: readonly EvidenceRecord[];
}

export default function EvidenceAnswer({ records = PRODUCTION_EVIDENCE }: EvidenceAnswerProps) {
  const visibleRecords = selectVisibleEvidence(records);

  if (visibleRecords.length === 0) return null;

  return (
    <section className="hh-evidence-answer" aria-labelledby="hh-evidence-answer-title">
      <h2 id="hh-evidence-answer-title">Câu trả lời từ bằng chứng đã được duyệt</h2>
      {visibleRecords.map((record) => (
        <article key={record.id}>
          <h3>{record.question}</h3>
          <p>{record.answer}</p>
          <p className="hh-evidence-answer__context">{record.context}</p>
        </article>
      ))}
    </section>
  );
}
