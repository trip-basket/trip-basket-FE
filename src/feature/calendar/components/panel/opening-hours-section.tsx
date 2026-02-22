import { SectionHeader } from "./section-header";

export function OpeningHoursSection({ hours }: { hours: string[] }) {
  return (
    <div className="mb-6">
      <SectionHeader icon="schedule" label="운영시간" />
      <div className="space-y-0.5">
        {hours.map((hour) => (
          <p key={hour} className="text-xs text-gray-500 leading-relaxed">
            {hour}
          </p>
        ))}
      </div>
    </div>
  );
}
