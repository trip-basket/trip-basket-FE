"use client";

import useMeasure from "react-use-measure";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DayHeader, TimeColumn, TimeGrid } from "./components";
import { DAY_COL_MIN_W, TIME_COL_W } from "./constants";

// 버킷 타이틀바(44px) + inset(8px) + 여유
const BUCKET_SCROLL_PADDING = 60;

export function Calendar() {
  const days = useRoomStore((s) => s.days);
  const gridWidth = days.length * DAY_COL_MIN_W;

  const [headerRef, { height: headerHeight }] = useMeasure();

  return (
    <div className="flex-1 min-h-0 overflow-auto" style={{ paddingBottom: BUCKET_SCROLL_PADDING }}>
      <div className="flex" style={{ minWidth: TIME_COL_W + gridWidth }}>
        <TimeColumn headerHeight={headerHeight} />

        <div className="flex-1">
          <DayHeader ref={headerRef} />
          <TimeGrid />
        </div>
      </div>
    </div>
  );
}
