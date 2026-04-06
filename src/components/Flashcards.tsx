"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { speak } from "@/lib/tts";
import { Volume2, Check, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import type { Word } from "@/data/words";

interface FlashcardsProps {
  words: Word[];
  learned: Set<string>;
  onMarkLearned: (word: string) => void;
  onBack: () => void;
  tab?: string;
  vocabDay?: number;
}

function useWordImage(query: string | undefined) {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUrl(null);
    setLoaded(false);
    if (!query) return;

    let cancelled = false;
    fetch(`/api/image?q=${encodeURIComponent(query)}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        if (!cancelled && data.url) {
          // Pre-load the image before showing it
          const img = new Image();
          img.onload = () => {
            if (!cancelled) {
              setUrl(data.url);
              setLoaded(true);
            }
          };
          img.onerror = () => {
            if (!cancelled) setUrl(null);
          };
          img.src = data.url;
        }
      })
      .catch(() => {
        if (!cancelled) setUrl(null);
      });
    return () => { cancelled = true; };
  }, [query]);

  return { url, loaded };
}

export function Flashcards({ words, learned, onMarkLearned, onBack, tab = "clb5", vocabDay }: FlashcardsProps) {
  const [showFrench, setShowFrench] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [positionLoaded, setPositionLoaded] = useState(false);

  // Load saved position
  useEffect(() => {
    const cacheKey = `tef-fc-pos-${tab}-${vocabDay ?? "all"}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const idx = parseInt(cached, 10);
      if (!isNaN(idx) && idx >= 0) setCurrentIndex(idx);
    }
    fetch(`/api/position?tab=${tab}&vocabDay=${vocabDay ?? -1}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.currentIndex > 0) setCurrentIndex(data.currentIndex);
      })
      .catch(() => {})
      .finally(() => setPositionLoaded(true));
  }, [tab, vocabDay]);

  // Save position when it changes
  useEffect(() => {
    if (!positionLoaded) return;
    const cacheKey = `tef-fc-pos-${tab}-${vocabDay ?? "all"}`;
    localStorage.setItem(cacheKey, String(currentIndex));
    fetch("/api/position", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, vocabDay: vocabDay ?? -1, currentIndex }),
    }).catch(() => {});
  }, [currentIndex, tab, vocabDay, positionLoaded]);

  const deck = useMemo(() => {
    if (showAll) return words;
    const unlearned = words.filter((w) => !learned.has(w.fr));
    return unlearned.length > 0 ? unlearned : words;
  }, [words, learned, showAll]);

  const allLearned = words.every((w) => learned.has(w.fr));
  const current = deck[currentIndex % deck.length];
  const learnedCount = words.filter((w) => learned.has(w.fr)).length;
  const { url: imageUrl, loaded: imageLoaded } = useWordImage(current?.en);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % deck.length);
    setShowFrench(false);
  }, [deck.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
    setShowFrench(false);
  }, [deck.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        if (!showFrench && current) {
          setShowFrench(true);
          speak(current.fr);
        } else {
          setShowFrench(false);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, showFrench, current]);

  const handleFlip = () => {
    if (!showFrench && current) {
      setShowFrench(true);
      speak(current.fr);
    } else {
      setShowFrench(false);
    }
  };

  if (!current) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="text-base font-semibold text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </Button>
        <Card className="rounded-2xl border-2 border-gray-100">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-semibold text-gray-500">No hay palabras disponibles</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-base font-semibold text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver
        </Button>
        <span className="text-sm font-bold text-gray-400">
          {currentIndex + 1}/{deck.length} ({learnedCount}/{words.length})
        </span>
      </div>

      {allLearned && (
        <div className="text-center py-3 px-4 rounded-xl bg-emerald-50 border-2 border-emerald-200">
          <span className="text-emerald-600 text-base font-bold">
            Todas aprendidas!
          </span>
        </div>
      )}

      <ProgressBar
        value={(currentIndex / deck.length) * 100}
        label={`Tarjeta ${currentIndex + 1}`}
        color="bg-orange-500"
      />

      {/* Flashcard with image */}
      <Card
        className="cursor-pointer min-h-[200px] rounded-2xl border-2 border-gray-100 shadow-md active:scale-[0.98] transition-transform overflow-hidden"
        onClick={handleFlip}
      >
        <div className="flex">
          {/* Image side */}
          {imageUrl && imageLoaded && (
            <div className="w-1/3 min-h-[200px] relative shrink-0">
              <img
                src={imageUrl}
                alt={current.en}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content side */}
          <CardContent className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center space-y-3 w-full">
              {!showFrench ? (
                <>
                  <p className="text-3xl font-extrabold text-gray-800">{current.es}</p>
                  <p className="text-sm text-indigo-400 mt-3 font-semibold">
                    Toca para ver en francés
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base text-gray-400">{current.es}</p>
                  <p className="text-3xl font-extrabold italic text-indigo-600">{current.fr}</p>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-indigo-500 hover:text-indigo-700 font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(current.fr);
                    }}
                  >
                    <Volume2 className="w-5 h-5 mr-2" /> Escuchar
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Controls */}
      <div className="flex gap-3">
        <Button
          className="flex-1 min-h-[56px] text-base font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
          disabled={learned.has(current.fr)}
          onClick={() => {
            onMarkLearned(current.fr);
            if (currentIndex < deck.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setShowFrench(false);
            }
          }}
        >
          <Check className="w-5 h-5 mr-2" />
          Aprendida
        </Button>
        <Button
          variant="outline"
          className="flex-1 min-h-[56px] text-base font-semibold rounded-xl border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          onClick={goNext}
        >
          Siguiente <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {allLearned && (
        <Button
          variant="ghost"
          className="w-full text-base text-gray-500 font-semibold"
          onClick={() => {
            setShowAll(!showAll);
            setCurrentIndex(0);
            setShowFrench(false);
          }}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {showAll ? "Solo no aprendidas" : "Mostrar todas"}
        </Button>
      )}
    </div>
  );
}
