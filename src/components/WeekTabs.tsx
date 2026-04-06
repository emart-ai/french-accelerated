"use client";

import { Button } from "@/components/ui/button";

interface WeekTabsProps {
  items: { es: string; fr: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const colors = [
  "bg-orange-500 text-white hover:bg-orange-600",
  "bg-blue-500 text-white hover:bg-blue-600",
  "bg-emerald-500 text-white hover:bg-emerald-600",
  "bg-purple-500 text-white hover:bg-purple-600",
  "bg-pink-500 text-white hover:bg-pink-600",
];

export function WeekTabs({ items, activeIndex, onSelect }: WeekTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <Button
            key={i}
            variant={isActive ? "default" : "outline"}
            className={`shrink-0 text-sm font-bold h-10 px-4 rounded-full border-none ${
              isActive ? colors[i % colors.length] : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => onSelect(i)}
          >
            {item.es}
          </Button>
        );
      })}
    </div>
  );
}
