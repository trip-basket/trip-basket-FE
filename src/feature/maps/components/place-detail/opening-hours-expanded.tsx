"use client";

import type { OpeningHour } from "@/src/types";
import { ClockIcon } from "./clock-icon";
import { DAY_ABBR, DAY_NAME, formatRange, getTodayIndex } from "./opening-hours-utils";

export function OpeningHoursExpanded({
  hours,
  onCollapse,
}: {
  hours: OpeningHour[];
  onCollapse: () => void;
}) {
  const todayIndex = getTodayIndex();

  return (
    <div>
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
        onClick={onCollapse}
      >
        Hide times
      </button>
    </div>
  );
}
