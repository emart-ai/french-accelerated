"use client";

import { useState, useEffect, useCallback } from "react";

const CACHE_KEY = (tab: string) => `tef-${tab}-learned`;

export function useLearnedWords(tab: string) {
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage immediately, then fetch from API
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY(tab));
    if (cached) {
      try {
        setLearned(new Set(JSON.parse(cached)));
      } catch {}
    }

    fetch(`/api/words/learned?tab=${tab}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.words) {
          const set = new Set<string>(data.words);
          setLearned(set);
          localStorage.setItem(CACHE_KEY(tab), JSON.stringify([...set]));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [tab]);

  const markLearned = useCallback(
    (word: string) => {
      setLearned((prev) => {
        const next = new Set(prev);
        next.add(word);
        localStorage.setItem(CACHE_KEY(tab), JSON.stringify([...next]));
        return next;
      });
      fetch("/api/words/learned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, tab }),
      }).catch(() => {});
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
      fetch("/api/words/learned", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, tab }),
      }).catch(() => {});
    },
    [tab]
  );

  return { learned, markLearned, unmarkLearned, isLoading };
}
