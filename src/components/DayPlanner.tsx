"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WeekTabs } from "./WeekTabs";
import { DaySelector } from "./DaySelector";
import { TaskButton } from "./TaskButton";
import { ProgressBar } from "./ProgressBar";
import { Flashcards } from "./Flashcards";
import { Quiz } from "./Quiz";
import { SpeakingA } from "./SpeakingA";
import { SpeakingB } from "./SpeakingB";
import { WriteEmail } from "./WriteEmail";
import { WriteOpinion } from "./WriteOpinion";
import { ListenGuide } from "./ListenGuide";
import { DailyLanguageView } from "./DailyLanguageView";
import { useLearnedWords } from "@/hooks/useLearnedWords";
import { useProgress } from "@/hooks/useProgress";
import { words as allWordData } from "@/data/words";
import { clb5Plan, weekTitles } from "@/data/plan-clb5";
import { clb7Plan, monthTitles } from "@/data/plan-clb7";
import {
  taskAScenarios,
  taskBScenarios,
  taskAPhrases,
  taskBPhrases,
} from "@/data/speaking";
import {
  emailTemplate,
  opinionTemplate,
  connectors,
  exampleEmails,
  exampleEssays,
} from "@/data/writing";
import {
  BookOpen,
  Brain,
  Mic,
  MessageCircle,
  Mail,
  FileText,
  Headphones,
  Languages,
} from "lucide-react";
import type { DayPlan } from "@/data/plan-clb5";

type ActiveModule =
  | null
  | { type: "flashcards"; vocabDay?: number }
  | { type: "quiz"; vocabDay?: number }
  | { type: "quiz-total" }
  | { type: "speaking-a" }
  | { type: "speaking-b" }
  | { type: "write-email" }
  | { type: "write-opinion" }
  | { type: "listening" }
  | { type: "daily-language" };

interface DayPlannerProps {
  tab: "clb5" | "clb7";
}

export function DayPlanner({ tab }: DayPlannerProps) {
  const plan = tab === "clb5" ? clb5Plan : clb7Plan;
  const periodTitles = tab === "clb5" ? weekTitles : monthTitles;
  const daysPerPeriod = tab === "clb5" ? 7 : 30;

  const { learned, markLearned } = useLearnedWords(tab);
  const { isDone, isDayComplete, markDone } = useProgress(tab);

  const [activePeriod, setActivePeriod] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [activeModule, setActiveModule] = useState<ActiveModule>(null);

  const tabWords = useMemo(
    () =>
      tab === "clb5"
        ? allWordData.filter((w) => w.level === "clb5")
        : allWordData,
    [tab]
  );

  const getWordsForDay = useCallback(
    (vocabDay: number) => tabWords.filter((w) => w.day === vocabDay),
    [tabWords]
  );

  const currentPlan: DayPlan | undefined = plan[activeDay];

  const learnedCount = tabWords.filter((w) => learned.has(w.fr)).length;
  const totalWords = tabWords.length;
  const pct = totalWords > 0 ? (learnedCount / totalWords) * 100 : 0;

  const periodOffset = activePeriod * daysPerPeriod;
  const periodDays = Math.min(daysPerPeriod, plan.length - periodOffset);

  const speakingAScenarios = useMemo(
    () =>
      tab === "clb7"
        ? taskAScenarios
        : taskAScenarios.filter((s) => s.level === "clb5"),
    [tab]
  );
  const speakingBScenarios = useMemo(
    () =>
      tab === "clb7"
        ? taskBScenarios
        : taskBScenarios.filter((s) => s.level === "clb5"),
    [tab]
  );

  const [pendingSlot, setPendingSlot] = useState<{ dayIndex: number; slot: "am" | "pm" } | null>(null);

  const handleTaskClick = useCallback(
    (dayIndex: number, slot: "am" | "pm", taskType: string, vocabDay?: number) => {
      setPendingSlot({ dayIndex, slot });
      switch (taskType) {
        case "flashcards":
          setActiveModule({ type: "flashcards", vocabDay });
          break;
        case "quiz":
          setActiveModule({ type: "quiz", vocabDay });
          break;
        case "quiz-total":
          setActiveModule({ type: "quiz-total" });
          break;
        case "speaking-a":
          setActiveModule({ type: "speaking-a" });
          break;
        case "speaking-b":
          setActiveModule({ type: "speaking-b" });
          break;
        case "write-email":
          setActiveModule({ type: "write-email" });
          break;
        case "write-opinion":
          setActiveModule({ type: "write-opinion" });
          break;
        case "listening":
          setActiveModule({ type: "listening" });
          break;
        case "review":
          setActiveModule({ type: "flashcards", vocabDay });
          break;
        case "free-practice":
          break;
      }
    },
    []
  );

  const handleBack = useCallback(() => {
    if (pendingSlot) {
      markDone(pendingSlot.dayIndex, pendingSlot.slot);
      setPendingSlot(null);
    }
    setActiveModule(null);
  }, [pendingSlot, markDone]);

  const handleQuizComplete = useCallback(
    (score: number, total: number) => {
      // Store quiz results locally
      const key = `tef-${tab}-quiz`;
      try {
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.push({ dayIndex: activeDay, score, total, date: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {}
    },
    [tab, activeDay]
  );

  if (activeModule) {
    switch (activeModule.type) {
      case "flashcards": {
        const w =
          activeModule.vocabDay != null
            ? getWordsForDay(activeModule.vocabDay)
            : tabWords;
        return (
          <Flashcards
            words={w}
            learned={learned}
            onMarkLearned={markLearned}
            onBack={handleBack}
            tab={tab}
            vocabDay={activeModule.vocabDay}
          />
        );
      }
      case "quiz": {
        const w =
          activeModule.vocabDay != null
            ? getWordsForDay(activeModule.vocabDay)
            : tabWords;
        return (
          <Quiz
            words={w}
            allWords={tabWords}
            learned={learned}
            onMarkLearned={markLearned}
            onBack={handleBack}
            onComplete={handleQuizComplete}
          />
        );
      }
      case "quiz-total":
        return (
          <Quiz
            words={tabWords}
            allWords={tabWords}
            learned={learned}
            onMarkLearned={markLearned}
            onBack={handleBack}
            onComplete={handleQuizComplete}
            title="Quiz Total"
          />
        );
      case "speaking-a":
        return (
          <SpeakingA
            scenarios={speakingAScenarios}
            phrases={taskAPhrases}
            onBack={handleBack}
          />
        );
      case "speaking-b":
        return (
          <SpeakingB
            scenarios={speakingBScenarios}
            phrases={taskBPhrases}
            onBack={handleBack}
          />
        );
      case "write-email":
        return (
          <WriteEmail
            template={emailTemplate}
            examples={tab === "clb7" ? exampleEmails : undefined}
            onBack={handleBack}
          />
        );
      case "write-opinion":
        return (
          <WriteOpinion
            template={opinionTemplate}
            connectors={connectors}
            examples={tab === "clb7" ? exampleEssays : undefined}
            tab={tab}
            onBack={handleBack}
          />
        );
      case "listening":
        return <ListenGuide tab={tab} onBack={handleBack} />;
      case "daily-language":
        return (
          <DailyLanguageView
            words={tabWords}
            learned={learned}
            onBack={handleBack}
          />
        );
    }
  }

  const accentColor = tab === "clb5" ? "bg-orange-500" : "bg-blue-500";

  return (
    <div className="space-y-5">
      <ProgressBar
        value={pct}
        label={`${learnedCount}/${totalWords} palabras`}
        color={accentColor}
      />

      <WeekTabs
        items={periodTitles}
        activeIndex={activePeriod}
        onSelect={(i) => {
          setActivePeriod(i);
          setActiveDay(i * daysPerPeriod);
        }}
      />

      <DaySelector
        totalDays={periodDays}
        activeDay={activeDay}
        onSelect={setActiveDay}
        isDayComplete={isDayComplete}
        offset={periodOffset}
      />

      {currentPlan && (
        <>
          <Card className="rounded-2xl border-2 border-gray-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>
                <p className="text-lg font-bold text-gray-800">
                  Día {activeDay + 1}: {currentPlan.title.es}
                </p>
                <p className="text-base italic text-indigo-400 mt-1">
                  Jour {activeDay + 1} : {currentPlan.title.fr}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ProgressBar
                value={
                  (isDone(activeDay, "am") ? 50 : 0) +
                  (isDone(activeDay, "pm") ? 50 : 0)
                }
                color="bg-emerald-500"
              />
            </CardContent>
          </Card>

          <div className="space-y-2">
            <p className="text-sm font-bold text-orange-500 uppercase tracking-wider px-1">
              Mañana (~40 min)
            </p>
            <TaskButton
              label={currentPlan.am.label}
              completed={isDone(activeDay, "am")}
              onClick={() =>
                handleTaskClick(
                  activeDay,
                  "am",
                  currentPlan.am.type,
                  currentPlan.am.vocabDay
                )
              }
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-purple-500 uppercase tracking-wider px-1">
              Noche (~40 min)
            </p>
            <TaskButton
              label={currentPlan.pm.label}
              completed={isDone(activeDay, "pm")}
              onClick={() =>
                handleTaskClick(
                  activeDay,
                  "pm",
                  currentPlan.pm.type,
                  currentPlan.pm.vocabDay
                )
              }
            />
          </div>
        </>
      )}

      <Separator />

      <div className="space-y-3">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider px-1">
          Herramientas
        </p>
        <Button
          variant="outline"
          className="w-full min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100"
          onClick={() => setActiveModule({ type: "daily-language" })}
        >
          <Languages className="w-5 h-5 mr-2 text-teal-500" /> Palabras del Día (FR / ES)
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
            onClick={() => setActiveModule({ type: "flashcards" })}
          >
            <BookOpen className="w-5 h-5 mr-2 text-orange-500" /> Palabras
          </Button>
          <Button
            variant="outline"
            className="min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
            onClick={() => setActiveModule({ type: "quiz-total" })}
          >
            <Brain className="w-5 h-5 mr-2 text-purple-500" /> Quiz Total
          </Button>
          <Button
            variant="outline"
            className="min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            onClick={() => setActiveModule({ type: "speaking-a" })}
          >
            <Mic className="w-5 h-5 mr-2 text-emerald-500" /> Oral A
          </Button>
          <Button
            variant="outline"
            className="min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100"
            onClick={() => setActiveModule({ type: "speaking-b" })}
          >
            <MessageCircle className="w-5 h-5 mr-2 text-pink-500" /> Oral B
          </Button>
          <Button
            variant="outline"
            className="min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            onClick={() => setActiveModule({ type: "write-email" })}
          >
            <Mail className="w-5 h-5 mr-2 text-amber-500" /> Email
          </Button>
          <Button
            variant="outline"
            className="min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
            onClick={() => setActiveModule({ type: "write-opinion" })}
          >
            <FileText className="w-5 h-5 mr-2 text-red-500" /> Opinión
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full min-h-[56px] justify-start text-base font-semibold rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
          onClick={() => setActiveModule({ type: "listening" })}
        >
          <Headphones className="w-5 h-5 mr-2 text-blue-500" /> Guía de Escucha
        </Button>
      </div>

      <Separator />

      <div className="text-center text-sm text-gray-400 font-semibold">
        {tab === "clb5" ? (
          <p>NCLC 5: Lectura 352+ &bull; Escucha 352+ &bull; Escritura 330+ &bull; Oral 387+</p>
        ) : (
          <p>NCLC 7: Lectura 434+ &bull; Escucha 434+ &bull; Escritura 428+ &bull; Oral 456+</p>
        )}
      </div>
    </div>
  );
}
