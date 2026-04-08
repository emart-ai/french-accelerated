"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Volume2, ChevronDown, ChevronUp } from "lucide-react";
import { speak } from "@/lib/tts";
import type { Word } from "@/data/words";

const DAY_TITLES: { es: string; fr: string }[] = [
  { es: "Supervivencia", fr: "Survie" },
  { es: "Comida y Casa", fr: "Nourriture et Maison" },
  { es: "Cuerpo y Ropa", fr: "Corps et Vêtements" },
  { es: "Mundo y Viajes", fr: "Monde et Voyages" },
  { es: "Trabajo y Estudio", fr: "Travail et Études" },
  { es: "Gente y Sociedad", fr: "Gens et Société" },
  { es: "Verbos y Adjetivos", fr: "Verbes et Adjectifs" },
];

interface DailyLanguageViewProps {
  words: Word[];
  learned: Set<string>;
  onBack: () => void;
}

export function DailyLanguageView({ words, learned, onBack }: DailyLanguageViewProps) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const dayWords = useMemo(
    () => words.filter((w) => w.day === selectedDay),
    [words, selectedDay]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Word[]>();
    for (const w of dayWords) {
      const existing = map.get(w.category);
      if (existing) {
        existing.push(w);
      } else {
        map.set(w.category, [w]);
      }
    }
    return map;
  }, [dayWords]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const learnedInDay = dayWords.filter((w) => learned.has(w.fr)).length;

  // Expand all categories by default when changing days
  const allExpanded = expandedCategories.size === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver
        </Button>
        <h2 className="text-lg font-bold text-gray-800">Palabras del Día</h2>
      </div>

      {/* Day selector pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DAY_TITLES.map((title, i) => {
          const count = words.filter((w) => w.day === i).length;
          if (count === 0) return null;
          return (
            <button
              key={i}
              onClick={() => {
                setSelectedDay(i);
                setExpandedCategories(new Set());
              }}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                selectedDay === i
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              D{i}
            </button>
          );
        })}
      </div>

      {/* Day header */}
      <Card className="rounded-2xl border-2 border-teal-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            <p className="font-bold text-gray-800">
              Día {selectedDay}: {DAY_TITLES[selectedDay].es}
            </p>
            <p className="text-sm italic text-teal-500 mt-0.5">
              Jour {selectedDay} : {DAY_TITLES[selectedDay].fr}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-500">
            {dayWords.length} palabras &bull; {learnedInDay} aprendidas
          </p>
        </CardContent>
      </Card>

      {/* Word list grouped by category */}
      <div className="space-y-3">
        {Array.from(grouped.entries()).map(([category, catWords]) => {
          const isOpen = allExpanded || expandedCategories.has(category);
          return (
            <div key={category} className="rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-bold text-gray-700 capitalize">
                  {category}{" "}
                  <span className="text-gray-400 font-normal">({catWords.length})</span>
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {isOpen && (
                <div className="divide-y divide-gray-100">
                  {catWords.map((word) => (
                    <div
                      key={word.fr}
                      className={`flex items-center gap-3 px-4 py-2.5 ${
                        learned.has(word.fr) ? "bg-emerald-50/50" : ""
                      }`}
                    >
                      <button
                        onClick={() => speak(word.fr)}
                        className="flex-shrink-0 p-1.5 rounded-lg text-teal-500 hover:bg-teal-50 transition-colors"
                        aria-label={`Escuchar ${word.fr}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {word.fr}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{word.es}</p>
                      </div>
                      {learned.has(word.fr) && (
                        <span className="flex-shrink-0 text-xs font-semibold text-emerald-500">
                          ✓
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
