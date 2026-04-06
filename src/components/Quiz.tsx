"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ProgressBar";
import { speak } from "@/lib/tts";
import { celebrate } from "@/lib/celebrate";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { Word } from "@/data/words";

interface QuizProps {
  words: Word[];
  allWords: Word[];
  learned: Set<string>;
  onMarkLearned: (word: string) => void;
  onBack: () => void;
  onComplete?: (score: number, total: number) => void;
  title?: string;
}

interface Question {
  word: Word;
  options: string[];
  correctIndex: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(words: Word[], allWords: Word[], max: number): Question[] {
  const pool = shuffle(words).slice(0, max);
  return pool.map((word) => {
    // Prefer wrong options from the same day so the quiz stays on-topic
    const sameDayPool = allWords.filter((w) => w.fr !== word.fr && w.day === word.day);
    const fallbackPool = allWords.filter((w) => w.fr !== word.fr);
    const wrongSource = sameDayPool.length >= 3 ? sameDayPool : fallbackPool;
    const wrongs = shuffle(wrongSource).slice(0, 3).map((w) => w.fr);
    const options = shuffle([word.fr, ...wrongs]);
    return {
      word,
      options,
      correctIndex: options.indexOf(word.fr),
    };
  });
}

export function Quiz({
  words,
  allWords,
  learned,
  onMarkLearned,
  onBack,
  onComplete,
  title,
}: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [seed, setSeed] = useState(0);

  const questions = useMemo(
    () => generateQuestions(words, allWords, 30),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [words.length, allWords.length, seed]
  );

  const question = questions[current];

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selected !== null) return;
      setSelected(optionIndex);
      const isCorrect = optionIndex === question.correctIndex;
      if (isCorrect) {
        setScore((s) => s + 1);
        onMarkLearned(question.word.fr);
        celebrate();
      }
      speak(question.word.fr);
    },
    [selected, question, onMarkLearned]
  );

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      onComplete?.(score, questions.length);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  }, [current, questions.length, score, onComplete]);

  const handleRetry = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setSeed((s) => s + 1);
  }, []);

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const color = pct >= 80 ? "text-emerald-600" : pct >= 50 ? "text-orange-500" : "text-red-500";
    return (
      <div className="space-y-5">
        <Button variant="ghost" onClick={onBack} className="text-base font-semibold text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </Button>
        <Card className="rounded-2xl border-2 border-gray-100 shadow-md">
          <CardContent className="p-10 text-center space-y-4">
            <p className={`text-6xl font-extrabold ${color}`}>
              {score}/{questions.length}
            </p>
            <p className={`text-3xl font-bold ${color}`}>{pct}%</p>
            <p className="text-lg text-gray-500 font-semibold">
              {pct >= 80
                ? "Excelente!"
                : pct >= 50
                ? "Buen trabajo!"
                : "Sigue estudiando"}
            </p>
          </CardContent>
        </Card>
        <Button
          className="w-full min-h-[56px] text-base font-bold rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
          onClick={handleRetry}
        >
          <RotateCcw className="w-5 h-5 mr-2" /> Repetir
        </Button>
        <Button variant="ghost" onClick={onBack} className="w-full text-base text-gray-500 font-semibold">
          Volver al plan
        </Button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-base font-semibold text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </Button>
        <Badge className="text-sm font-bold px-3 py-1 bg-emerald-500 text-white">
          {score} correctas
        </Badge>
      </div>

      {title && (
        <p className="text-base text-purple-500 text-center font-bold">{title}</p>
      )}

      <ProgressBar
        value={((current + 1) / questions.length) * 100}
        label={`Pregunta ${current + 1}/${questions.length}`}
        color="bg-purple-500"
      />

      <Card className="rounded-2xl border-2 border-gray-100 shadow-sm">
        <CardContent className="p-8 text-center space-y-3">
          <p className="text-sm text-purple-400 font-bold uppercase tracking-wide">Como se dice en francés?</p>
          <p className="text-3xl font-extrabold text-gray-800">{question.word.es}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          let className = "w-full min-h-[56px] text-lg italic font-semibold rounded-xl border-2";
          if (selected !== null) {
            if (isCorrect) {
              className += " border-emerald-500 bg-emerald-50 text-emerald-700";
            } else if (isSelected && !isCorrect) {
              className += " border-red-500 bg-red-50 text-red-700";
            } else {
              className += " border-gray-100 opacity-40";
            }
          } else {
            className += " border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50/50";
          }
          return (
            <Button
              key={i}
              variant="outline"
              className={className}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              {option}
            </Button>
          );
        })}
      </div>

      {selected !== null && (
        <Button
          className="w-full min-h-[56px] text-base font-bold rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
          onClick={handleNext}
        >
          {current + 1 >= questions.length
            ? "Ver Resultado"
            : "Siguiente"}
        </Button>
      )}
    </div>
  );
}
