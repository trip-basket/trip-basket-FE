"use client";

import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DayHeader, TimeColumn, TimeGrid } from "./components";
import { DAY_COL_MIN_W, TIME_COL_W } from "./constants";

export function Calendar() {
  const days = useRoomStore((s) => s.days);
  const gridWidth = days.length * DAY_COL_MIN_W;

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-grid-gap">
      {/* ── 캘린더 (가로+세로 내부 스크롤) ── */}
      <div className="flex-1 overflow-auto rounded-xl bg-surface">
        <div className="flex" style={{ minWidth: TIME_COL_W + gridWidth }}>
          <TimeColumn />

          <div className="flex-1">
            <DayHeader />
            <TimeGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
