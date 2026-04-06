"use client";

import { SpeakingA } from "./SpeakingA";
import type { SpeakingScenario } from "@/data/speaking";

interface SpeakingBProps {
  scenarios: SpeakingScenario[];
  phrases: { fr: string; es: string }[];
  onBack: () => void;
}

// Same UI as SpeakingA — just different data
export function SpeakingB({ scenarios, phrases, onBack }: SpeakingBProps) {
  return <SpeakingA scenarios={scenarios} phrases={phrases} onBack={onBack} />;
}
