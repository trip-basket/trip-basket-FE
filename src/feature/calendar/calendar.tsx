"use client";

import useMeasure from "react-use-measure";
import { DayHeader, TimeColumn, TimeGrid } from "./components";
import { BUCKET_INSET, TITLE_BAR_HEIGHT } from "./components/bucket/use-bucket-expand";
import { ADD_COL_W, DAY_COL_MIN_W, TIME_COL_W } from "./constants";
import useCalendarStore from "./stores/use-calendar-store";

/**
 * Render the calendar main view containing the time column, day headers, and time grid.
 *
 * Computes the minimum horizontal content width from the current trip days and measures the day header height to supply layout spacing (e.g., to TimeColumn). The right-side content area is padded to accommodate the title bar and bucket inset.
 *
 * @returns The calendar JSX element containing the time column, day header, and time grid
 */
export function Calendar() {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const contentMinWidth = TIME_COL_W + 2 * ADD_COL_W + tripDays.length * DAY_COL_MIN_W;

  const [headerRef, { height: headerHeight }] = useMeasure();

  return (
    <div className="flex-1 min-h-0 overflow-auto">
      <div className="flex" style={{ minWidth: contentMinWidth }}>
        <TimeColumn headerHeight={headerHeight} />

        <div className="flex-1" style={{ paddingBottom: TITLE_BAR_HEIGHT + BUCKET_INSET * 2 }}>
          <DayHeader ref={headerRef} />
          <TimeGrid />
        </div>
      </div>
    </div>
  );
}
