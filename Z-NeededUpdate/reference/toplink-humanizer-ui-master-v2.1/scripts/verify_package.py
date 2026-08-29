from pathlib import Path
import hashlib, json, sys

root = Path(__file__).resolve().parents[1]
foundation = root / "FOUNDATION"
required = [
"01_RESEARCH_SYNTHESIS.md","02_EVIDENCE_MATRIX.md","03_HUMANIZER_MODEL.md",
"04_STRUCTURAL_GRAMMAR.md","05_LINGUISTIC_KNOWLEDGE_GRAMMAR.md",
"06_HUMAN_EVIDENCE_SYSTEM.md","07_EDITORIAL_COMPOSITION.md","08_CONTENT_VOICE.md",
"09_VISUAL_MATERIAL_PHOTOGRAPHY.md","10_MOTION_SEMANTICS.md",
"11_INTERACTION_HUMANITY.md","12_TRUST_HEALTH_SAFETY.md",
"13_ANTI_AI_PATTERN_LIBRARY.md","14_GRAPH_GATES_PROCESS.md","15_VERIFICATION_PROTOCOL.md",
"16_HUMANIZER_SCORECARD.md","17_MASTER_PROMPT.md","18_TOPLINK_EXECUTION_BRIEF.md",
"SOURCE_REGISTER.md"
]
missing=[x for x in required if not (foundation/x).exists()]
skills=list((root/"SKILLS").glob("*/SKILL.md"))
checks = {
    "missing_foundation": missing,
    "skill_count": len(skills),
    "coverage_map": (root/"CONTENT_COVERAGE_MAP.md").exists(),
    "governance_bridge": (root/"GOVERNANCE/01_GOVERNANCE_BRIDGE.md").exists(),
}
print(json.dumps(checks, ensure_ascii=False, indent=2))
if missing or len(skills)!=5 or not checks["coverage_map"] or not checks["governance_bridge"]:
    sys.exit(1)
