export interface EvidenceRecord {
  id: string;
  question: string;
  answer: string;
  context: string;
  reviewStatus: "approved" | "unreviewed";
  revoked?: boolean;
}

export function selectVisibleEvidence(records: readonly EvidenceRecord[]): EvidenceRecord[];
