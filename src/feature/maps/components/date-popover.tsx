"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import type { TripDay } from "@/src/feature/calendar/types";
import { TimePopover } from "./time-popover";

export function DatePopoverContent({
  tripDays,
  onSelect,
}: {
  tripDays: TripDay[];
  onSelect: (date: string, startHour: number) => void;
}) {
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  const [timeStyle, setTimeStyle] = useState<{ top?: number; bottom?: number }>({});

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const [dateListRef, { height: dateListH }] = useMeasure();
  const [timeRef, { height: timeH }] = useMeasure();

  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const pendingItemCenter = useRef(0);

  const addDayBefore = useCalendarStore((s) => s.addDayBefore);
  const addDayAfter = useCalendarStore((s) => s.addDayAfter);

  const setItemRef = useCallback((index: number, el: HTMLButtonElement | null) => {
    if (el) {
      itemRefs.current.set(index, el);
    } else {
      itemRefs.current.delete(index);
    }
  }, []);

  useLayoutEffect(() => {
    if (hoveredDayIndex === null || dateListH === 0 || timeH === 0) {
      return;
    }

    const itemCenter = pendingItemCenter.current;

    if (timeH >= dateListH) {
      // 시간 팝오버가 날짜 목록보다 크면 bottom 기준으로 위로
      setTimeStyle({ bottom: 0 });
    } else {
      // 항목 중심 기준 center-align + 클램핑
      const idealTop = itemCenter - timeH / 2;
      const maxTop = dateListH - timeH;
      setTimeStyle({ top: Math.max(0, Math.min(idealTop, maxTop)) });
    }
  }, [hoveredDayIndex, dateListH, timeH]);

  const handleMouseEnter = (dayIndex: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const item = itemRefs.current.get(dayIndex);
    if (item) {
      const parentEl = item.closest("[data-date-list]");
      if (parentEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        pendingItemCenter.current = itemRect.top - parentRect.top + itemRect.height / 2;
      }
    }

    setHoveredDayIndex(dayIndex);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredDayIndex(null);
    }, 150);
  };

  const handleTimeHoverEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return (
    <div ref={dateListRef} data-date-list className="relative">
      {/* 날짜 목록 */}
      <div
        className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[180px] overflow-hidden"
        style={{ maxHeight: 300 }}
      >
        <div className="overflow-y-auto py-1.5" style={{ maxHeight: 300 }}>
          <div className="px-3 py-1.5">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
              날짜 선택
            </span>
          </div>

          {/* 이전 날짜 추가 */}
          <button
            type="button"
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={addDayBefore}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 2.5V9.5M2.5 6H9.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            앞에 날짜 추가
          </button>

          {tripDays.map((day, index) => (
            <button
              key={day.date}
              ref={(el) => setItemRef(index, el)}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer ${
                hoveredDayIndex === index
                  ? "bg-gray-50 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onSelect(day.date, 9)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
              <span className="font-medium">{day.dateNum}일</span>
              <span className="text-gray-400">({day.dayOfWeek})</span>
            </button>
          ))}

          {/* 다음 날짜 추가 */}
          <button
            type="button"
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={addDayAfter}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 2.5V9.5M2.5 6H9.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            뒤에 날짜 추가
          </button>
        </div>
      </div>

      {/* 시간 선택 팝오버 */}
      {hoveredDayIndex !== null && (
        <div ref={timeRef} className="absolute left-full" style={timeStyle}>
          <TimePopover
            onSelect={(startHour) => onSelect(tripDays[hoveredDayIndex].date, startHour)}
            onMouseEnter={handleTimeHoverEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      )}
    </div>
  );
}
