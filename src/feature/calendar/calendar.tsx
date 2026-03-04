"use client";

import useMeasure from "react-use-measure";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DayHeader, TimeColumn, TimeGrid } from "./components";
import { DAY_COL_MIN_W, TIME_COL_W } from "./constants";

export function Calendar() {
  const days = useRoomStore((s) => s.days);
  const gridWidth = days.length * DAY_COL_MIN_W;

  const [headerRef, { height: headerHeight }] = useMeasure();

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-grid-gap">
      {/* ── 캘린더 (가로+세로 내부 스크롤) ── */}
      <div className="flex-1 overflow-auto rounded-xl bg-elevated">
        <div className="flex" style={{ minWidth: TIME_COL_W + gridWidth }}>
          <TimeColumn headerHeight={headerHeight} />

          <div className="flex-1">
            <DayHeader ref={headerRef} />
            <TimeGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
