import type { OpeningHour } from "../../types";
import { SectionHeader } from "./section-header";

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
    <div className="mb-6">
      <SectionHeader icon="schedule" label="운영시간" />
      <div className="space-y-0.5">
        {hours.map((hour) => (
          <p key={hour.day} className="text-xs text-gray-500 leading-relaxed">
            {formatOpeningHour(hour)}
          </p>
        ))}
      </div>
    </div>
  );
}
