"use client";

import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import { TimePopover } from "./time-popover";

export function TimePopoverPanel({
  hoveredDayIndex,
  timeRef,
  timeStyle,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: {
  hoveredDayIndex: number | null;
  timeRef: (el: HTMLDivElement | null) => void;
  timeStyle: { top?: number; bottom?: number };
  onSelect: (date: string, startHour: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const tripDays = useCalendarStore((s) => s.tripDays);

  if (hoveredDayIndex === null || !tripDays[hoveredDayIndex]) {
    return null;
  }

  const date = tripDays[hoveredDayIndex].date;

  return (
    <div ref={timeRef} className="absolute left-full" style={timeStyle}>
      <TimePopover
        onSelect={(startHour) => onSelect(date, startHour)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
}
