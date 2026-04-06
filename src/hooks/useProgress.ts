"use client";

import { useState, useEffect, useCallback } from "react";

type TaskKey = `${number}-${"am" | "pm"}`;

const CACHE_KEY = (tab: string) => `tef-${tab}-tasks`;

export function useProgress(tab: string) {
  const [tasks, setTasks] = useState<Set<TaskKey>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY(tab));
    if (cached) {
      try {
        setTasks(new Set(JSON.parse(cached)));
      } catch {}
    }

    fetch(`/api/progress?tab=${tab}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.tasks) {
          const set = new Set<TaskKey>(
            data.tasks.map((t: { dayIndex: number; slot: string }) => `${t.dayIndex}-${t.slot}` as TaskKey)
          );
          setTasks(set);
          localStorage.setItem(CACHE_KEY(tab), JSON.stringify([...set]));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [tab]);

  const markDone = useCallback(
    (dayIndex: number, slot: "am" | "pm") => {
      const key: TaskKey = `${dayIndex}-${slot}`;
      setTasks((prev) => {
        const next = new Set(prev);
        next.add(key);
        localStorage.setItem(CACHE_KEY(tab), JSON.stringify([...next]));
        return next;
      });
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayIndex, slot, tab }),
      }).catch(() => {});
    },
    [tab]
  );

  const isDone = useCallback(
    (dayIndex: number, slot: "am" | "pm") => tasks.has(`${dayIndex}-${slot}`),
    [tasks]
  );

  const isDayComplete = useCallback(
    (dayIndex: number) => tasks.has(`${dayIndex}-am`) && tasks.has(`${dayIndex}-pm`),
    [tasks]
  );

  return { tasks, markDone, isDone, isDayComplete, isLoading };
}
