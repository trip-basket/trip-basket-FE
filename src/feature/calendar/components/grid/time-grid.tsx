import { useCallback } from "react";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS, MOCK_DAYS } from "../../constants";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { GridBlock } from "./grid-block";

export function TimeGrid() {
  const { calendarBlocks, setGridRef } = useCalendarBlockStore();
  const gridHeight = HOURS.length * HOUR_HEIGHT;
  const gridStartHour = HOURS[0];

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      setGridRef(node);
    },
    [setGridRef],
  );

  return (
    <div
      ref={refCallback}
      className="relative flex"
      style={{ height: gridHeight }}
    >
      {/* 가로 구분선 */}
      {HOURS.map((hour) => (
        <div
          key={`line-${hour}`}
          className="pointer-events-none absolute inset-x-0 border-b border-grid-line"
          style={{ top: (hour - gridStartHour) * HOUR_HEIGHT }}
        />
      ))}

      {/* 날짜 컬럼 */}
      {MOCK_DAYS.map((day, dayIndex) => (
        <div
          key={day.date}
          className="relative flex-1 border-l border-grid-line"
          style={{ minWidth: DAY_COL_MIN_W, height: gridHeight }}
        >
          {calendarBlocks
            .filter((b) => b.dayIndex === dayIndex)
            .map((block) => (
              <GridBlock key={block.id} block={block} />
            ))}
        </div>
      ))}
    </div>
  );
}
