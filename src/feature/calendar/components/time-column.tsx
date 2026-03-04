import { Text } from "@/src/components/ui";
import { HOUR_HEIGHT, HOURS, TIME_COL_W } from "../constants";
import { formatHour } from "../utils";

export function TimeColumn({ headerHeight }: { headerHeight: number }) {
  return (
    <div
      className="sticky left-0 z-40 shrink-0 bg-brand-100"
      style={{ width: TIME_COL_W, paddingTop: headerHeight - 9 }}
    >
      {HOURS.map((hour) => (
        <div key={hour} className="flex items-start justify-center" style={{ height: HOUR_HEIGHT }}>
          <Text variant="caption">{formatHour(hour)}</Text>
        </div>
      ))}
    </div>
  );
}
