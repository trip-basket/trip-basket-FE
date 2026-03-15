"use client";

import { useState } from "react";
import { WindowDots } from "./window-dots";

type DayId = "day1" | "day2";

interface ScheduleBlock {
  id: string;
  label: string;
  time: string;
  bg: string;
  border: string;
  text: string;
}

const INITIAL_SCHEDULE: Record<DayId, ScheduleBlock[]> = {
  day1: [
    {
      id: "a",
      label: "에펠탑",
      time: "10:00 - 12:00",
      bg: "bg-sky-50",
      border: "border-l-sky-400",
      text: "text-sky-700",
    },
    {
      id: "b",
      label: "루브르 박물관",
      time: "13:00 - 16:00",
      bg: "bg-amber-50",
      border: "border-l-amber-400",
      text: "text-amber-700",
    },
  ],
  day2: [
    {
      id: "c",
      label: "몽마르뜨 언덕",
      time: "10:00 - 11:30",
      bg: "bg-violet-50",
      border: "border-l-violet-400",
      text: "text-violet-700",
    },
    {
      id: "d",
      label: "개선문",
      time: "14:00 - 15:30",
      bg: "bg-rose-50",
      border: "border-l-rose-400",
      text: "text-rose-700",
    },
  ],
};

export function ScheduleDragDemo() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [dragged, setDragged] = useState<{ id: string; from: DayId } | null>(null);
  const [overCol, setOverCol] = useState<DayId | null>(null);

  const onDragStart = (id: string, from: DayId) => (e: React.DragEvent) => {
    setDragged({ id, from });
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (col: DayId) => (e: React.DragEvent) => {
    e.preventDefault();
    setOverCol(col);
  };

  const onDrop = (toCol: DayId) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragged) {
      return;
    }
    if (dragged.from === toCol) {
      setDragged(null);
      setOverCol(null);
      return;
    }
    setSchedule((prev) => {
      const src = [...prev[dragged.from]];
      const idx = src.findIndex((b) => b.id === dragged.id);
      if (idx === -1) {
        return prev;
      }
      const [block] = src.splice(idx, 1);
      return { ...prev, [dragged.from]: src, [toCol]: [...prev[toCol], block] };
    });
    setDragged(null);
    setOverCol(null);
  };

  const onDragEnd = () => {
    setDragged(null);
    setOverCol(null);
  };

  const renderCol = (id: DayId, label: string, date: string) => (
    <div
      role="listbox"
      className={`flex-1 rounded-2xl border-2 border-dashed p-3 transition-colors duration-200 min-h-[160px] ${
        overCol === id ? "border-brand-400 bg-brand-50/50" : "border-gray-200 bg-gray-50/30"
      }`}
      onDragOver={onDragOver(id)}
      onDragLeave={() => setOverCol(null)}
      onDrop={onDrop(id)}
    >
      <p className="text-xs font-bold text-gray-800 mb-0.5">{label}</p>
      <p className="text-[10px] text-gray-400 mb-3">{date}</p>
      <div className="space-y-2">
        {schedule[id].map((b) => (
          <div
            key={b.id}
            role="option"
            aria-selected={false}
            tabIndex={0}
            draggable
            onDragStart={onDragStart(b.id, id)}
            onDragEnd={onDragEnd}
            className={`p-2.5 rounded-xl border-l-[3px] ${b.bg} ${b.border} cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 select-none ${
              dragged?.id === b.id ? "opacity-30 scale-95" : ""
            }`}
          >
            <p className={`text-xs font-semibold ${b.text}`}>{b.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{b.time}</p>
          </div>
        ))}
        {schedule[id].length === 0 && (
          <div className="flex items-center justify-center h-16 rounded-xl border border-dashed border-gray-200 text-[11px] text-gray-300">
            여기에 놓으세요
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-5">
        <WindowDots title="파리 여행 일정" />
        <div className="flex gap-3">
          {renderCol("day1", "Day 1", "3월 15일 (토)")}
          {renderCol("day2", "Day 2", "3월 16일 (일)")}
        </div>
        <p className="text-center text-[11px] text-gray-300 mt-3">
          블록을 드래그해서 다른 날짜로 옮겨보세요
        </p>
      </div>
    </div>
  );
}
