"use client";

import { Text } from "@/src/components/ui";
import type { OpeningHour } from "@/src/types";
import { ClockIcon } from "./clock-icon";
import { DAY_ABBR, DAY_NAME, formatRange, getTodayIndex } from "./utils";

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
        <div className="mt-[4px]">
          <ClockIcon />
        </div>
        <div className="flex flex-col gap-1.5">
          {DAY_ABBR.map((abbr, dayIndex) => {
            const entry = hours.find((h) => h.day === dayIndex);
            const isToday = dayIndex === todayIndex;
            return (
              <div key={abbr} className="flex items-center gap-2">
                <Text
                  as="span"
                  variant="caption"
                  weight="semibold"
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                    isToday ? "bg-action text-on-action" : "bg-inset text-soft"
                  }`}
                >
                  {abbr}
                </Text>
                <Text
                  as="span"
                  variant="caption"
                  weight={isToday ? "medium" : "normal"}
                  className={isToday ? "text-main" : "text-sub"}
                >
                  {DAY_NAME[dayIndex]}: {entry ? formatRange(entry) : "휴무"}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="text-xs text-accent-text hover:text-accent-text transition-colors cursor-pointer ml-[22px]"
        onClick={onCollapse}
      >
        영업시간 접기
      </button>
    </div>
  );
}
