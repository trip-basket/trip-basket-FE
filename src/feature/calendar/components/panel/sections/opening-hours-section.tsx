import { Text } from "@/src/components/ui";
import type { OpeningHour } from "../../../types";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function formatOpeningHour(hour: OpeningHour): string {
  const day = DAY_LABELS[hour.day] ?? `${hour.day}`;
  if (!hour.close) {
    return `${day}: 24시간 영업`;
  }
  return `${day}: ${hour.open} – ${hour.close}`;
}

export function OpeningHoursSection({ hours }: { hours: OpeningHour[] }) {
  return (
    <div className="space-y-0.5">
      {hours.map((hour) => (
        <Text key={hour.day} variant="small" color="muted" className="leading-relaxed">
          {formatOpeningHour(hour)}
        </Text>
      ))}
    </div>
  );
}
