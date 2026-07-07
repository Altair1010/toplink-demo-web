import {
  BODY_STATES,
  SERVICES,
  type BodyState,
  type BodyStateKey,
  type Service,
  type Symptom,
} from "@/data/content";

/**
 * Gợi ý liệu trình từ các triệu chứng người dùng chọn (pure function).
 * 1) Đếm tần suất trạng thái (Tắc/Hàn/Hư/Loạn) trong selection → trạng thái trội.
 * 2) Gộp serviceSlugs (symptom override trước, rồi tới state), rank theo
 *    số lần xuất hiện + thứ tự ưu tiên gốc.
 * 3) Map về SERVICES, cắt tối đa `max`.
 */
export function recommend(selected: Symptom[], max = 3): Service[] {
  if (selected.length === 0) return [];

  const stateCount = new Map<BodyStateKey, number>();
  for (const sym of selected) {
    for (const st of sym.states) {
      stateCount.set(st, (stateCount.get(st) ?? 0) + 1);
    }
  }

  // score slug: tần suất ×10, trừ vị trí trong danh sách gốc để giữ thứ tự ưu tiên
  const slugScore = new Map<string, number>();
  const addSlugs = (slugs: string[], weight: number) => {
    slugs.forEach((slug, i) => {
      slugScore.set(slug, (slugScore.get(slug) ?? 0) + weight * 10 - i);
    });
  };

  for (const sym of selected) {
    if (sym.serviceSlugs) {
      addSlugs(sym.serviceSlugs, 2); // override của triệu chứng: nặng ký hơn
    } else {
      for (const st of sym.states) {
        const state = BODY_STATES.find((s) => s.key === st);
        if (state) addSlugs(state.serviceSlugs, 1);
      }
    }
  }

  return [...slugScore.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s))
    .slice(0, max);
}

/** Trạng thái cơ thể trội từ selection — dùng đánh dấu ở FourBodyStates. */
export function dominantStates(selected: Symptom[], max = 2): BodyState[] {
  const count = new Map<BodyStateKey, number>();
  for (const sym of selected) {
    sym.states.forEach((st, i) => {
      // trạng thái đứng đầu danh sách của symptom = trạng thái chính (nặng hơn)
      count.set(st, (count.get(st) ?? 0) + (i === 0 ? 2 : 1));
    });
  }
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([key]) => BODY_STATES.find((s) => s.key === key))
    .filter((s): s is BodyState => Boolean(s));
}
