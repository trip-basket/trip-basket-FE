"use client";

import { CalendarHeader, DayHeader, TimeColumn, TimeGrid } from "./components";
import { DAY_COL_MIN_W, MOCK_DAYS, TIME_COL_W } from "./constants";

export function Calendar() {
  const gridWidth = MOCK_DAYS.length * DAY_COL_MIN_W;

  return (
    <div className="flex flex-1 min-h-0 flex-row bg-canvas py-grid-gap pl-grid-gap rounded-l-xl">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl gap-grid-gap">
        <CalendarHeader />

        {/* ── 캘린더 (가로+세로 내부 스크롤) ── */}
        <div className="flex-1 min-h-0 min-w-0 overflow-auto rounded-xl bg-surface">
          <div className="flex" style={{ minWidth: TIME_COL_W + gridWidth }}>
            <TimeColumn />

            <div className="flex-1">
              <DayHeader />
              <TimeGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
