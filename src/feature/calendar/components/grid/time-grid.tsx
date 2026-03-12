import { useCallback, useMemo } from "react";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../../constants";
import useCalendarStore from "../../stores/use-calendar-store";
import type { CalendarBlock } from "../../types";
import { computeOverlapLayout } from "../../utils";
import { AddDateGridColumn } from "../add-date-column";
import { GridBlock } from "./grid-block";

const gridHeight = HOURS.length * HOUR_HEIGHT;
const gridStartHour = HOURS[0];

/**
 * Renders the calendar time grid for all trip days.
 *
 * The grid includes hourly separator lines, a DayColumn for each entry in the calendar store's `tripDays`, and add-date columns on the left and right. The grid's container height and background are fixed by the file's constants, and the inner scrollable area passes its DOM ref to the calendar store via `setGridRef`.
 *
 * @returns The React element representing the full time grid (hour lines, day columns, and add-date columns).
 */
export function TimeGrid() {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const setGridRef = useCalendarStore((s) => s.setGridRef);

  return (
    <div
      className="relative flex"
      style={{
        height: gridHeight,
        backgroundColor: "rgba(0, 0, 0, 0.015)",
        backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.07) 1.3px, transparent 1.3px)",
        backgroundSize: `${HOUR_HEIGHT / 2}px ${HOUR_HEIGHT / 2}px`,
      }}
    >
      <HourLines />
      <AddDateGridColumn position="left" />
      <GridArea setGridRef={setGridRef}>
        {tripDays.map((day) => (
          <DayColumn key={day.date} blocks={day.blocks} />
        ))}
      </GridArea>
      <AddDateGridColumn position="right" />
    </div>
  );
}

/**
 * Wraps the grid columns and forwards the grid DOM node to the provided ref callback when the node is visible.
 *
 * @param children - Child nodes rendered inside the grid area.
 * @param setGridRef - Callback invoked with the grid's HTMLDivElement or `null`. If the element is hidden (its `offsetParent` is `null`), the callback is not invoked.
 */
function GridArea({
  children,
  setGridRef,
}: {
  children: React.ReactNode;
  setGridRef: (node: HTMLDivElement | null) => void;
}) {
  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      // Mobile/Desktop 둘 다 마운트되므로, hidden 상태의 ref는 무시
      if (node && node.offsetParent === null) {
        return;
      }
      setGridRef(node);
    },
    [setGridRef],
  );

  return (
    <div ref={refCallback} className="flex flex-1">
      {children}
    </div>
  );
}

/**
 * Renders horizontal separator lines for each hour across the time grid.
 *
 * Each line spans the full grid width and is positioned vertically to align with its hour in the HOURS range.
 *
 * @returns A React fragment containing one positioned div per hour to serve as an hourly separator line.
 */
function HourLines() {
  return (
    <>
      {HOURS.map((hour) => (
        <div
          key={`line-${hour}`}
          className="pointer-events-none absolute inset-x-0 border-b border-grid-line"
          style={{ top: (hour - gridStartHour + 1) * HOUR_HEIGHT }}
        />
      ))}
    </>
  );
}

/**
 * Renders a single day's column and its calendar blocks, laid out to reflect temporal overlaps.
 *
 * @param blocks - The array of calendar blocks for this day to render inside the column
 * @returns The DOM element for the day column containing positioned GridBlock components
 */
function DayColumn({ blocks }: { blocks: CalendarBlock[] }) {
  const overlapMap = useMemo(() => computeOverlapLayout(blocks), [blocks]);

  return (
    <div
      className="relative flex-1 border-l border-grid-line"
      style={{ minWidth: DAY_COL_MIN_W, height: gridHeight }}
    >
      {blocks.map((block) => (
        <GridBlock key={block.id} block={block} overlapLayout={overlapMap.get(block.id)} />
      ))}
    </div>
  );
}
