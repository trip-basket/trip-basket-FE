"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardHeader, TripFilterTabs } from "@/src/feature/dashboard";
import type { RoomSummary } from "@/src/feature/dashboard/types/room";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { request } from "@/src/lib/request";

function mapRooms(data: Awaited<ReturnType<typeof roomApi.list>>): RoomSummary[] {
  return data.map((r) => ({
    id: r.roomId,
    name: r.name,
    tripStartDate: r.tripStartDate,
    tripEndDate: r.tripEndDate,
    role: r.role,
    memberCount: r.memberCount,
  }));
}

export default function DashboardPage() {
  const [rooms, setRooms] = useState<RoomSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRooms = useCallback(async () => {
    const data = await request(() => roomApi.list(), ROOM_ERROR_MESSAGES.list);
    if (data) {
      setRooms(mapRooms(data));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div className="relative min-h-dvh bg-gray-50/30">
      <div
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-8">
        <DashboardHeader />

        <div className="mt-8">
          {isLoading ? null : <TripFilterTabs rooms={rooms} onRoomDeleted={fetchRooms} />}
        </div>
      </div>
    </div>
  );
}
