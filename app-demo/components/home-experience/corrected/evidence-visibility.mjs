export function selectVisibleEvidence(records) {
  return records.filter(
    (record) =>
      record.reviewStatus === "approved" &&
      record.revoked !== true &&
      Boolean(record.id?.trim()) &&
      Boolean(record.question?.trim()) &&
      Boolean(record.answer?.trim()) &&
      Boolean(record.context?.trim()),
  );
}
