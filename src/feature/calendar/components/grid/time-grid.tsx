import { useCallback, useMemo } from "react";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../../constants";
import useCalendarStore from "../../stores/use-calendar-store";
import type { CalendarBlock } from "../../types";
import { computeOverlapLayout } from "../../utils";
import { GridBlock } from "./grid-block";

const gridHeight = HOURS.length * HOUR_HEIGHT;
const gridStartHour = HOURS[0];

export function TimeGrid() {
  const tripDays = useCalendarStore((s) => s.tripDays);
  const setGridRef = useCalendarStore((s) => s.setGridRef);

  return (
    <TimeGridWrapper setGridRef={setGridRef}>
      <HourLines />
      {tripDays.map((day) => (
        <DayColumn key={day.date} blocks={day.blocks} />
      ))}
    </TimeGridWrapper>
  );
}

function TimeGridWrapper({
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
    <div
      ref={refCallback}
      className="relative flex"
      style={{
        height: gridHeight,
        backgroundColor: "rgba(0, 0, 0, 0.015)",
        backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.07) 1.25px, transparent 1.25px)",
        backgroundSize: `${HOUR_HEIGHT / 2}px ${HOUR_HEIGHT / 2}px`,
      }}
    >
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

function DayColumn({ blocks }: { blocks: CalendarBlock[] }) {
  const overlapMap = useMemo(() => computeOverlapLayout(blocks, DAY_COL_MIN_W), [blocks]);

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
