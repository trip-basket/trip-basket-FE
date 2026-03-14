"use client";

import type { OpeningHour } from "@/src/types";
import { ClockIcon } from "./clock-icon";
import { DAY_ABBR, DAY_NAME, formatRange, getTodayIndex } from "./opening-hours-utils";

export function OpeningHoursCollapsed({
  hours,
  onExpand,
}: {
  hours: OpeningHour[];
  onExpand: () => void;
}) {
  const todayIndex = getTodayIndex();
  const todayEntry = hours.find((h) => h.day === todayIndex);

  return (
    <div>
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
          onClick={onExpand}
        >
          Show times
        </button>
      </div>
    </div>
  );
}
