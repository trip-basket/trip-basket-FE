"use client";

import { Text } from "@/src/components/ui";
import type { OpeningHour } from "@/src/types";
import { ClockIcon } from "./clock-icon";
import { DAY_ABBR, DAY_NAME, formatRange, getTodayIndex } from "./utils";

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
    <div className="flex flex-col items-start gap-2">
      {todayEntry && (
        <div className="flex items-center gap-2">
          <div className="relative bottom-[1px]">
            <ClockIcon />
          </div>
          <Text as="span" variant="caption" className="leading-none text-soft">
            {DAY_NAME[todayIndex]}: {formatRange(todayEntry)}
          </Text>
        </div>
      )}
      <div className="flex items-center gap-1.5">
        {!todayEntry && (
          <div className="flex items-center gap-2 relative bottom-[1px]">
            <ClockIcon />
          </div>
        )}
        {DAY_ABBR.map((abbr, dayIndex) => {
          const hasHours = hours.some((h) => h.day === dayIndex);
          const isToday = dayIndex === todayIndex;
          return (
            <Text
              as="span"
              key={abbr}
              variant="caption"
              weight={isToday ? "semibold" : "medium"}
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                isToday
                  ? "bg-action text-on-action"
                  : hasHours
                    ? "bg-inset text-soft"
                    : "bg-inset text-muted"
              }`}
            >
              {abbr}
            </Text>
          );
        })}
        <button
          type="button"
          className="text-xs text-accent-text hover:text-accent-text transition-colors cursor-pointer ml-1"
          onClick={onExpand}
        >
          영업시간 보기
        </button>
      </div>
    </div>
  );
}
