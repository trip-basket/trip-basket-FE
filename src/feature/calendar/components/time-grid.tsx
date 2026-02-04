import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W, HOUR_HEIGHT, HOURS, MOCK_BLOCKS, MOCK_DAYS } from "../constants";
import { type Block, formatBlockTime } from "../types/block";

export function TimeGrid() {
  const gridHeight = HOURS.length * HOUR_HEIGHT;
  const startHour = HOURS[0];

  return (
    <div className="relative flex" style={{ height: gridHeight }}>
      {/* 가로 구분선 */}
      {HOURS.map((hour) => (
        <div
          key={`line-${hour}`}
          className="pointer-events-none absolute inset-x-0 border-b border-grid-line"
          style={{ top: (hour - startHour) * HOUR_HEIGHT }}
        />
      ))}

      {/* 날짜 컬럼 */}
      {MOCK_DAYS.map((day, dayIndex) => (
        <div
          key={day.date}
          className="relative flex-1 border-l border-grid-line"
          style={{ minWidth: DAY_COL_MIN_W, height: gridHeight }}
        >
          {MOCK_BLOCKS.filter((e) => e.dayIndex === dayIndex).map((event: Block) => (
            <div
              key={event.id}
              className="absolute inset-x-0 cursor-pointer rounded-md rounded-tr-none bg-canvas p-2 shadow-sm transition-shadow hover:shadow-md"
              style={{
                top: (event.startHour - startHour) * HOUR_HEIGHT,
                height: (event.endHour - event.startHour) * HOUR_HEIGHT - 10,
              }}
            >
              <Text variant="body">{event.title}</Text>
              <Text variant="small">{formatBlockTime(event)}</Text>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
