import Link from "next/link";
import { Text } from "@/src/components/ui/text";
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

export function TripCard({ room, onDeleted }: { room: RoomSummary; onDeleted?: () => void }) {
  const status = getTripStatus(room.tripStartDate, room.tripEndDate);
  const dday = getDday(room.tripStartDate);

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-outline shadow-sm">
      {/* Cover — 클릭 시 네비게이션 */}
      <Link href={`/plan/${room.id}`} className="relative aspect-[4/3] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <TripStatusBadge status={status} dday={dday} />
        </div>
      </Link>

      {/* Menu — Link 바깥 */}
      <div className="absolute top-3 right-3">
        <TripCardMenu roomId={room.id} roomName={room.name} onDeleted={onDeleted} />
      </div>

      {/* Info — 클릭 시 네비게이션 */}
      <Link href={`/plan/${room.id}`} className="flex flex-col gap-1.5 p-4">
        <Text variant="body" weight="bold" className="truncate">
          {room.name}
        </Text>

        <Text variant="caption" color="sub">
          {formatDateRange(room.tripStartDate, room.tripEndDate)}
        </Text>

        {/* Meta row */}
        <div className="flex items-center mt-1">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <Text as="span" variant="caption" color="muted">
              {room.memberCount}명
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
}
