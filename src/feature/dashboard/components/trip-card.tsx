import Image from "next/image";
import Link from "next/link";
import type { Room } from "../types/room";
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

function formatUpdatedAt(updatedAt: string): string {
  const diff = Date.now() - new Date(updatedAt).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return "방금 전";
  }
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  if (days < 7) {
    return `${days}일 전`;
  }
  return new Date(updatedAt).toLocaleDateString("ko-KR");
}

export function TripCard({ room }: { room: Room }) {
  const status = getTripStatus(room.tripStartDate, room.tripEndDate);
  const dday = getDday(room.tripStartDate);

  return (
    <Link
      href={`/plan/${room.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-200/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {room.coverImageUrl ? (
          <Image
            src={room.coverImageUrl}
            alt={room.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <TripStatusBadge status={status} dday={dday} />
        </div>

        {/* Destination on image */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white/80 text-xs font-medium flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {room.destination}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="font-bold text-gray-900 text-base truncate">{room.name}</h3>

        <p className="text-xs text-gray-500">
          {formatDateRange(room.tripStartDate, room.tripEndDate)}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {/* Members */}
            <span className="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              {room.memberCount}
            </span>
            {/* Places */}
            <span className="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              {room.placeCount}
            </span>
          </div>

          <span className="text-[11px] text-gray-300">{formatUpdatedAt(room.updatedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
