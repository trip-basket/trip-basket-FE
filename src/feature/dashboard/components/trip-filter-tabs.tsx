"use client";

import { useMemo, useState } from "react";
import { Spinner } from "@/src/components/ui";
import type { RoomSummary } from "../types/room";
import { TripGrid } from "./trip-grid";
import { getTripStatus } from "./trip-status-badge";

type FilterTab = "all" | "upcoming" | "past";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "upcoming", label: "다가오는 여행" },
  { key: "past", label: "지난 여행" },
];

function filterRooms(rooms: RoomSummary[], tab: FilterTab): RoomSummary[] {
  if (tab === "all") {
    return rooms;
  }
  return rooms.filter((room) => {
    const status = getTripStatus(room.tripStartDate, room.tripEndDate);
    if (tab === "upcoming") {
      return status === "upcoming" || status === "ongoing";
    }
    return status === "past";
  });
}

export function TripFilterTabs({ isLoading, rooms }: { isLoading: boolean; rooms: RoomSummary[] }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const filtered = useMemo(() => filterRooms(rooms, activeTab), [rooms, activeTab]);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex gap-1 bg-inset p-1 rounded-block w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-button text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-white text-main shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                    : "text-soft hover:text-main"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <TripGrid rooms={filtered} showCreate={activeTab !== "past"} />
        </div>
      )}
    </div>
  );
}
