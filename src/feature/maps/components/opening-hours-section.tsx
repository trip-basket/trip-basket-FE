"use client";

import { useState } from "react";
import type { OpeningHour } from "@/src/types";

const DAY_ABBR = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DAY_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  if (minute === 0) {
    return `${displayHour}${period}`;
  }
  return `${displayHour}:${String(minute).padStart(2, "0")}${period}`;
}

function formatRange(entry: OpeningHour): string {
  const open = formatTime(entry.open);
  const close = entry.close ? formatTime(entry.close) : "Close N/A";
  return `${open}–${close}`;
}

function getTodayIndex(): number {
  return new Date().getDay();
}

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="text-gray-400 shrink-0"
  >
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function OpeningHoursSection({ hours }: { hours: OpeningHour[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const todayIndex = getTodayIndex();
  const todayEntry = hours.find((h) => h.day === todayIndex);

  return (
    <div className="mb-3">
      {isExpanded ? (
        <div>
          {/* Expanded: full day list */}
          <div className="flex items-start gap-2 mb-2">
            <div className="mt-0.5">
              <ClockIcon />
            </div>
            <div className="flex flex-col gap-1.5">
              {DAY_ABBR.map((abbr, dayIndex) => {
                const entry = hours.find((h) => h.day === dayIndex);
                const isToday = dayIndex === todayIndex;
                return (
                  <div key={abbr} className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                        isToday ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {abbr}
                    </span>
                    <span
                      className={`text-xs ${isToday ? "font-medium text-gray-900" : "text-gray-600"}`}
                    >
                      {DAY_NAME[dayIndex]}: {entry ? formatRange(entry) : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            className="text-xs text-blue-500 hover:text-blue-600 transition-colors cursor-pointer ml-[22px]"
            onClick={() => setIsExpanded(false)}
          >
            Hide times
          </button>
        </div>
      ) : (
        <div>
          {/* Collapsed: today's hours + day pills */}
          {todayEntry && (
            <div className="flex items-center gap-2 mb-1.5">
              <ClockIcon />
              <span className="text-xs text-gray-700">
                {DAY_NAME[todayIndex]}: {formatRange(todayEntry)}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-[22px]">
            {DAY_ABBR.map((abbr, dayIndex) => {
              const hasHours = hours.some((h) => h.day === dayIndex);
              return (
                <span
                  key={abbr}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
                    hasHours ? "bg-gray-100 text-gray-500" : "bg-gray-50 text-gray-300"
                  }`}
                >
                  {abbr}
                </span>
              );
            })}
            <button
              type="button"
              className="text-xs text-blue-500 hover:text-blue-600 transition-colors cursor-pointer ml-1"
              onClick={() => setIsExpanded(true)}
            >
              Show times
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
