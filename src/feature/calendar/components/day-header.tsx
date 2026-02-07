import { Text } from "@/src/components/ui";
import { DAY_COL_MIN_W } from "../constants";
import useCalendarBlockStore from "../stores/use-calendar-block-store";

export function DayHeader() {
  const days = useCalendarBlockStore((state) => state.days);

  return (
    <div className="sticky top-0 z-20 flex bg-surface border-b border-grid-line">
      {days.map((day) => (
        <div
          key={day.date}
          className="flex flex-1 flex-col items-center pb-3 pt-2"
          style={{ minWidth: DAY_COL_MIN_W }}
        >
          <Text variant="body">{day.dayOfWeek}</Text>
          <Text variant="h2">{day.date}</Text>
        </div>
      ))}
    </div>
  );
}
