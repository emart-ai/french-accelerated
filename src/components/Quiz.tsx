"use client";

import { useState, useMemo, useCallback, useRef } from "react";
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

function makeQuestion(word: Word, allWords: Word[]): Question {
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
}

function generateQuestions(words: Word[], allWords: Word[], max: number): Question[] {
  const pool = shuffle(words).slice(0, max);
  return pool.map((word) => makeQuestion(word, allWords));
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
  const [finished, setFinished] = useState(false);
  const [seed, setSeed] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(() =>
    generateQuestions(words, allWords, 30)
  );
  const initialCount = useRef(questions.length);
  const correctOnFirstTry = useRef(0);
  const mistakeCount = useRef(0);

  // Reset questions when seed changes (retry)
  useMemo(() => {
    if (seed > 0) {
      const q = generateQuestions(words, allWords, 30);
      setQuestions(q);
      initialCount.current = q.length;
      correctOnFirstTry.current = 0;
      mistakeCount.current = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const question = questions[current];

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selected !== null) return;
      setSelected(optionIndex);
      const isCorrect = optionIndex === question.correctIndex;
      if (isCorrect) {
        onMarkLearned(question.word.fr);
        celebrate();
        // Track if this is from the original set (not a retry)
        if (current < initialCount.current) {
          correctOnFirstTry.current += 1;
        }
      } else {
        mistakeCount.current += 1;
        // Re-add failed question to the end with new options
        setQuestions((prev) => [...prev, makeQuestion(question.word, allWords)]);
      }
      speak(question.word.fr);
    },
    [selected, question, onMarkLearned, allWords, current]
  );

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      onComplete?.(correctOnFirstTry.current, initialCount.current);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  }, [current, questions.length, onComplete]);

  const handleRetry = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setFinished(false);
    setSeed((s) => s + 1);
  }, []);

  if (finished) {
    const total = initialCount.current;
    const firstTry = correctOnFirstTry.current;
    const mistakes = mistakeCount.current;
    const pct = Math.round((firstTry / total) * 100);
    const color = pct >= 80 ? "text-emerald-600" : pct >= 50 ? "text-orange-500" : "text-red-500";
    return (
      <div className="space-y-5">
        <Button variant="ghost" onClick={onBack} className="text-base font-semibold text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </Button>
        <Card className="rounded-2xl border-2 border-gray-100 shadow-md">
          <CardContent className="p-10 text-center space-y-4">
            <p className={`text-6xl font-extrabold ${color}`}>
              {firstTry}/{total}
            </p>
            <p className={`text-3xl font-bold ${color}`}>{pct}%</p>
            <p className="text-lg text-gray-500 font-semibold">
              {mistakes === 0
                ? "Perfecto! Sin errores!"
                : `${mistakes} ${mistakes === 1 ? "error" : "errores"} corregido${mistakes === 1 ? "" : "s"}`}
            </p>
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

  const isRetry = current >= initialCount.current;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-base font-semibold text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </Button>
        <Badge className="text-sm font-bold px-3 py-1 bg-emerald-500 text-white">
          {correctOnFirstTry.current} correctas
        </Badge>
      </div>

      {title && (
        <p className="text-base text-purple-500 text-center font-bold">{title}</p>
      )}

      <ProgressBar
        value={Math.min((current / initialCount.current) * 100, 100)}
        label={`Pregunta ${Math.min(current + 1, initialCount.current)}/${initialCount.current}`}
        color="bg-purple-500"
      />

      {isRetry && (
        <p className="text-sm text-orange-500 text-center font-bold">Repaso — fallaste esta antes</p>
      )}

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
