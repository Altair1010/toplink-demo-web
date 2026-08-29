import ContinueUnderstanding from "./ContinueUnderstanding";
import EvidenceAnswer from "./EvidenceAnswer";
import ServiceScope from "./ServiceScope";
import VisitProcessExplanation from "./VisitProcessExplanation";

export default function NarrativeCompletion() {
  return (
    <div className="hh-narrative" data-humanizer-narrative="m2b">
      <ServiceScope />
      <VisitProcessExplanation />
      <EvidenceAnswer />
      <ContinueUnderstanding />
    </div>
  );
}
