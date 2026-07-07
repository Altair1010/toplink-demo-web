"use client";

import { useState } from "react";
import { SYMPTOMS, type Symptom } from "@/data/content";
import BodySignalInterface from "./BodySignalInterface";
import FourBodyStates from "./FourBodyStates";
import RecommendationDrawer from "./RecommendationDrawer";

/**
 * Client boundary DUY NHẤT của homepage — giữ state selectedSymptoms chung cho
 * Body Signal Interface + 4 trạng thái + drawer gợi ý. Các section còn lại
 * (RitualTimeline, SpaceAsTherapy, HomeFinalCTA) là server component.
 */
export default function HomeExperience() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const selected: Symptom[] = selectedKeys
    .map((k) => SYMPTOMS.find((s) => s.key === k))
    .filter((s): s is Symptom => Boolean(s));

  const toggle = (key: string) =>
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  return (
    <>
      <BodySignalInterface selected={selected} onToggle={toggle} />
      <FourBodyStates selected={selected} />
      <RecommendationDrawer selected={selected} />
    </>
  );
}
