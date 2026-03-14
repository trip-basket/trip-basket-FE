"use client";

import { TimePopover } from "./time-popover";

export function TimePopoverPanel({
  hoveredDate,
  timeRef,
  timeStyle,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: {
  hoveredDate: string | null;
  timeRef: (el: HTMLDivElement | null) => void;
  timeStyle: { top?: number; bottom?: number };
  onSelect: (date: string, startHour: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (hoveredDate === null) {
    return null;
  }

  return (
    <div ref={timeRef} className="absolute left-full" style={timeStyle}>
      <TimePopover
        onSelect={(startHour) => onSelect(hoveredDate, startHour)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
}
