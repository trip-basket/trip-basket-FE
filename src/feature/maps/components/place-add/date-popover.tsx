"use client";

import { useState } from "react";
import { AddDayButton } from "./add-day-button";
import { DateList } from "./date-list";
import { TimePopoverPanel } from "./time-popover-panel";
import { useTimePopoverLayout } from "./use-time-popover-layout";

export function DatePopoverContent({
  onSelect,
}: {
  onSelect: (date: string, startHour: number) => void;
}) {
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);

  const {
    dateListRef,
    timeRef,
    timeStyle,
    setItemRef,
    handleMouseEnter,
    handleMouseLeave,
    handleTimeHoverEnter,
  } = useTimePopoverLayout(hoveredDayIndex, setHoveredDayIndex);

  return (
    <div ref={dateListRef} data-date-list className="relative">
      <div
        className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[180px] overflow-hidden"
        style={{ maxHeight: 300 }}
      >
        <div className="overflow-y-auto p-1.5" style={{ maxHeight: 300 }}>
          <AddDayButton label="앞에 날짜 추가" position="before" />

          <DateList
            hoveredDayIndex={hoveredDayIndex}
            setItemRef={setItemRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onSelect={onSelect}
          />

          <AddDayButton label="뒤에 날짜 추가" position="after" />
        </div>
      </div>
      <TimePopoverPanel
        hoveredDayIndex={hoveredDayIndex}
        timeRef={timeRef}
        timeStyle={timeStyle}
        onSelect={onSelect}
        onMouseEnter={handleTimeHoverEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
