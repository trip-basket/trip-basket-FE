"use client";

import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, GridBackground } from "@/src/components/ui";
import { DashboardHeader, TripFilterTabs } from "@/src/feature/dashboard";
import type { RoomSummary } from "@/src/feature/dashboard/types/room";
import { ROOM_FALLBACK_MESSAGES, roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/api/query-keys";

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

function DashboardContent() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.rooms,
    queryFn: () => roomApi.list(),
    select: mapRooms,
    throwOnError: true,
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

export default function DashboardPage() {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ErrorFallback {...props} errorContents={ROOM_FALLBACK_MESSAGES.list} />
      )}
    >
      <DashboardContent />
    </ErrorBoundary>
  );
}
