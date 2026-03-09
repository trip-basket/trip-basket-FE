import { Text } from "@/src/components/ui";
import { HOUR_HEIGHT, HOURS, TIME_COL_W } from "../constants";
import { formatHour } from "../utils";

// caption line-height(18px) / 2 — 라벨을 시간 가이드라인과 정렬
const TIME_LABEL_OFFSET = 9;

export function TimeColumn({ headerHeight }: { headerHeight: number }) {
  return (
    <div
      className="sticky left-0 z-40 shrink-0 bg-white border-r border-black/6"
      style={{ width: TIME_COL_W, paddingTop: headerHeight - TIME_LABEL_OFFSET }}
    >
      {HOURS.map((hour) => (
        <div key={hour} className="flex items-start justify-center" style={{ height: HOUR_HEIGHT }}>
          <Text variant="caption" className="text-muted" weight="semibold">
            {formatHour(hour)}
          </Text>
        </div>
      ))}
    </div>
  );
}
