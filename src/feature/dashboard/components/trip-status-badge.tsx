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

export function getTripStatus(startDate: string, endDate: string): TripStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
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
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
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
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${config.className}`}
    >
      {label}
    </span>
  );
}
