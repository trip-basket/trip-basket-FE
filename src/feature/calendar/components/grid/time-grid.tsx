import { useCallback, useMemo } from "react";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../../constants";
import useCalendarStore from "../../stores/use-calendar-store";
import type { ScheduledBlock } from "../../types";
import { computeOverlapLayout } from "../../utils";
import { AddDateGridColumn } from "../add-date-column";
import { GridBlock } from "./block/grid-block";

const gridHeight = HOURS.length * HOUR_HEIGHT;
const gridStartHour = HOURS[0];

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

function DayColumn({ blocks }: { blocks: ScheduledBlock[] }) {
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
