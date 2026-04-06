"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

interface DaySelectorProps {
  totalDays: number;
  activeDay: number;
  onSelect: (day: number) => void;
  isDayComplete: (day: number) => boolean;
  offset?: number;
}

export function DaySelector({
  totalDays,
  activeDay,
  onSelect,
  isDayComplete,
  offset = 0,
}: DaySelectorProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-2 px-0.5">
        {Array.from({ length: totalDays }, (_, i) => {
          const dayIndex = offset + i;
          const isActive = dayIndex === activeDay;
          const isComplete = isDayComplete(dayIndex);
          return (
            <Button
              key={dayIndex}
              variant="outline"
              className={`w-11 h-11 p-0 shrink-0 text-sm font-bold rounded-full border-2 ${
                isActive
                  ? "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600"
                  : isComplete
                  ? "bg-emerald-50 text-emerald-600 border-emerald-400"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
              onClick={() => onSelect(dayIndex)}
            >
              {isComplete && !isActive ? (
                <Check className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </Button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
