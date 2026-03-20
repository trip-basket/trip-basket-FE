import { Text } from "@/src/components/ui/text";
import type { TripStatus } from "../types/room";

const STATUS_CONFIG: Record<TripStatus, { label: string; className: string }> = {
  upcoming: {
    label: "",
    className: "bg-brand-50 text-brand-600",
  },
  ongoing: {
    label: "NOW",
    className: "bg-success-50 text-success-600 animate-pulse",
  },
  past: {
    label: "",
    className: "bg-gray-100 text-gray-500",
  },
};

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getTripStatus(startDate: string, endDate: string): TripStatus {
  const now = new Date();
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  end.setHours(23, 59, 59, 999);

  if (now < start) {
    return "upcoming";
  }
  if (now <= end) {
    return "ongoing";
  }
  return "past";
}

export function getDday(startDate: string): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = parseLocalDate(startDate);
  const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    return `D-${diff}`;
  }
  if (diff === 0) {
    return "D-Day";
  }
  return "";
}

export function TripStatusBadge({ status, dday }: { status: TripStatus; dday: string }) {
  const config = STATUS_CONFIG[status];
  const label = status === "upcoming" ? dday : status === "past" ? "완료" : config.label;

  if (!label) {
    return null;
  }

  return (
    <Text
      as="span"
      variant="caption"
      weight="bold"
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] tracking-wide ${config.className}`}
    >
      {label}
    </Text>
  );
}
