"use client";

import { useCalendarStore } from "@/src/feature/calendar/stores";
import { DateItem } from "./date-item";

export function DateList({
  hoveredDayIndex,
  setItemRef,
  onMouseEnter,
  onMouseLeave,
  onSelect,
}: {
  hoveredDayIndex: number | null;
  setItemRef: (index: number, el: HTMLButtonElement | null) => void;
  onMouseEnter: (dayIndex: number) => void;
  onMouseLeave: () => void;
  onSelect: (date: string, startHour: number) => void;
}) {
  const tripDays = useCalendarStore((s) => s.tripDays);

  return (
    <>
      {tripDays.map((day, index) => (
        <DateItem
          key={day.date}
          ref={(el) => setItemRef(index, el)}
          day={day}
          isHovered={hoveredDayIndex === index}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
          onClick={() => onSelect(day.date, 9)}
        />
      ))}
    </>
  );
}
