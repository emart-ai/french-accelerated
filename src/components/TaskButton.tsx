"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface TaskButtonProps {
  label: { es: string; fr: string };
  completed: boolean;
  onClick: () => void;
}

export function TaskButton({ label, completed, onClick }: TaskButtonProps) {
  return (
    <Button
      variant="outline"
      className={`w-full min-h-[64px] justify-start text-left whitespace-normal px-5 py-4 rounded-xl border-2 ${
        completed
          ? "border-emerald-400 bg-emerald-50 text-emerald-700"
          : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3 w-full">
        {completed && <Check className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500" />}
        <div className="flex flex-col gap-1">
          <span className={`text-base font-semibold ${completed ? "line-through opacity-70" : "text-gray-800"}`}>
            {label.es}
          </span>
          <span
            className={`text-sm italic ${
              completed ? "line-through opacity-50 text-emerald-600" : "text-indigo-400"
            }`}
          >
            {label.fr}
          </span>
        </div>
      </div>
    </Button>
  );
}
