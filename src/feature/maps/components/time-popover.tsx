"use client";

import { HOURS } from "@/src/feature/calendar/constants";
import { formatHour } from "@/src/feature/calendar/utils";

export function TimePopover({
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: {
  onSelect: (startHour: number) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: cascading popover의 hover 영역 유지용
    <div
      className="bg-white rounded-xl shadow-xl border border-gray-100 ml-1 w-[120px] overflow-hidden"
      style={{ maxHeight: 250 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="overflow-y-auto py-1.5" style={{ maxHeight: 250 }}>
        {HOURS.map((hour) => (
          <button
            key={hour}
            type="button"
            className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onSelect(hour)}
          >
            {formatHour(hour)}
          </button>
        ))}
      </div>
    </div>
  );
}
