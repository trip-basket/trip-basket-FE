import Link from "next/link";
import { Text } from "@/src/components/ui";
import type { RoomSummary } from "../types/room";
import { TripCardMenu } from "./trip-card-menu";
import { getDday, getTripStatus, TripStatusBadge } from "./trip-status-badge";

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sMonth = s.getMonth() + 1;
  const sDay = s.getDate();
  const eMonth = e.getMonth() + 1;
  const eDay = e.getDate();

  if (s.getFullYear() !== e.getFullYear()) {
    return `${s.getFullYear()}.${sMonth}.${sDay} - ${e.getFullYear()}.${eMonth}.${eDay}`;
  }
  if (sMonth !== eMonth) {
    return `${sMonth}.${sDay} - ${eMonth}.${eDay}`;
  }
  return `${sMonth}.${sDay} - ${eDay}`;
}

export function TripCard({ room }: { room: RoomSummary }) {
  const status = getTripStatus(room.tripStartDate, room.tripEndDate);
  const dday = getDday(room.tripStartDate);

  return (
    <div className="group relative flex flex-col rounded-container bg-white border border-outline shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-200">
      {/* Cover */}
      <Link
        href={`/plan/${room.id}`}
        className="relative flex-1 rounded-t-container overflow-hidden"
        aria-label={room.name}
      >
        <div className="w-full h-full bg-inset flex items-center justify-center text-outline-strong">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <TripStatusBadge status={status} dday={dday} />
        </div>
      </Link>

      {/* Menu */}
      <div className="absolute top-3 right-3">
        <TripCardMenu roomId={room.id} roomName={room.name} />
      </div>

      {/* Info */}
      <Link href={`/plan/${room.id}`} className="flex flex-col gap-1 p-4">
        <Text variant="body" weight="bold" className="truncate">
          {room.name}
        </Text>

        <Text variant="caption" color="sub">
          {formatDateRange(room.tripStartDate, room.tripEndDate)}
        </Text>

        <div className="flex items-center gap-1 mt-1.5 text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <Text as="span" variant="caption" color="muted">
            {room.memberCount}명
          </Text>
        </div>
      </Link>
    </div>
  );
}
