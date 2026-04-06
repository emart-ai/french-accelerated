"use client";

import { useState, useEffect, useCallback } from "react";

const CACHE_KEY = (tab: string) => `tef-${tab}-learned`;

export function useLearnedWords(tab: string) {
  const [learned, setLearned] = useState<Set<string>>(new Set());

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY(tab));
    if (cached) {
      try {
        setLearned(new Set(JSON.parse(cached)));
      } catch {}
    }
  }, [tab]);

  const markLearned = useCallback(
    (word: string) => {
      setLearned((prev) => {
        const next = new Set(prev);
        next.add(word);
        localStorage.setItem(CACHE_KEY(tab), JSON.stringify([...next]));
        return next;
      });
    },
    [tab]
  );

  const unmarkLearned = useCallback(
    (word: string) => {
      setLearned((prev) => {
        const next = new Set(prev);
        next.delete(word);
        localStorage.setItem(CACHE_KEY(tab), JSON.stringify([...next]));
        return next;
      });
    },
    [tab]
  );

  return { learned, markLearned, unmarkLearned };
}
