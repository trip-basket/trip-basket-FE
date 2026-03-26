"use client";

import { useQuery } from "@tanstack/react-query";
import { GridBackground } from "@/src/components/ui";
import { DashboardHeader, TripFilterTabs } from "@/src/feature/dashboard";
import type { RoomSummary } from "@/src/feature/dashboard/types/room";
import { roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/query-keys";

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
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.rooms,
    queryFn: () => roomApi.list(),
    select: mapRooms,
  });

  return (
    <div className="relative min-h-dvh bg-gray-50/30">
      <GridBackground />
      <div className="relative mx-auto max-w-5xl px-6 py-8">
        <DashboardHeader />

        <TripFilterTabs isLoading={isLoading} rooms={data ?? []} />
      </div>
    </div>
  );
}
