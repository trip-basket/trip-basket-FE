import { Text } from "@/src/components/ui";
import { HOUR_HEIGHT, HOURS, TIME_COL_W } from "../constants";
import { formatHour } from "../utils";

const BUCKET_PADDING_HEIGHT = 160;

export function TimeColumn({ headerHeight }: { headerHeight: number }) {
  return (
    <div
      className="sticky left-0 z-40 shrink-0 bg-accent"
      style={{ width: TIME_COL_W, paddingTop: headerHeight - 9 }}
    >
      {HOURS.map((hour) => (
        <div key={hour} className="flex items-start justify-center" style={{ height: HOUR_HEIGHT }}>
          <Text variant="caption" className="text-on-accent" weight="semibold">
            {formatHour(hour)}
          </Text>
        </div>
      ))}
      {/* 버킷 오버레이 확장 시 스크롤 가능하도록 패딩 영역 */}
      <div className="bg-accent" style={{ height: BUCKET_PADDING_HEIGHT }} />
    </div>
  );
}
