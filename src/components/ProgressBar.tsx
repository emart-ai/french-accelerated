"use client";

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ value, label, color = "bg-indigo-500" }: ProgressBarProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex justify-between text-sm font-semibold">
          <span className="text-gray-500">{label}</span>
          <span className="text-gray-800">{Math.round(value)}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
