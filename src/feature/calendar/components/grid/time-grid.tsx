import { useCallback, useMemo } from "react";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS } from "../../constants";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { computeOverlapLayout } from "../../utils";
import { GridBlock } from "./grid-block";

export function TimeGrid() {
  const days = useRoomStore((s) => s.days);
  const { calendarBlocks, setGridRef } = useCalendarBlockStore();
  const gridHeight = HOURS.length * HOUR_HEIGHT;
  const gridStartHour = HOURS[0];

  const overlapMap = useMemo(() => {
    const map = new Map<string, { zIndex: number; width: number }>();
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const dayBlocks = calendarBlocks.filter((b) => b.dayIndex === dayIndex);
      for (const [id, layout] of computeOverlapLayout(dayBlocks, DAY_COL_MIN_W)) {
        map.set(id, layout);
      }
    }
    return map;
  }, [calendarBlocks, days.length]);

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
    <div ref={refCallback} className="relative flex" style={{ height: gridHeight }}>
      {/* 가로 구분선 */}
      {HOURS.map((hour) => (
        <div
          key={`line-${hour}`}
          className="pointer-events-none absolute inset-x-0 border-b border-grid-line"
          style={{ top: (hour - gridStartHour) * HOUR_HEIGHT }}
        />
      ))}

      {/* 날짜 컬럼 */}
      {days.map((day, dayIndex) => (
        <div
          key={day.date}
          className="relative flex-1 border-l border-grid-line"
          style={{ minWidth: DAY_COL_MIN_W, height: gridHeight }}
        >
          {calendarBlocks
            .filter((b) => b.dayIndex === dayIndex)
            .map((block) => (
              <GridBlock key={block.id} block={block} overlapLayout={overlapMap.get(block.id)} />
            ))}
        </div>
      ))}
    </div>
  );
}
