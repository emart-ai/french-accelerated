"use client";

import { useState, useEffect, useCallback } from "react";

type TaskKey = `${number}-${"am" | "pm"}`;

const CACHE_KEY = (tab: string) => `tef-${tab}-tasks`;

export function useProgress(tab: string) {
  const [tasks, setTasks] = useState<Set<TaskKey>>(new Set());

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY(tab));
    if (cached) {
      try {
        setTasks(new Set(JSON.parse(cached)));
      } catch {}
    }
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

  return { tasks, markDone, isDone, isDayComplete };
}
