"use client";

import { useState } from "react";
import type { Room } from "../types/room";
import { TripGrid } from "./trip-grid";
import { getTripStatus } from "./trip-status-badge";

type FilterTab = "all" | "upcoming" | "past";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "upcoming", label: "다가오는 여행" },
  { key: "past", label: "지난 여행" },
];

function filterRooms(rooms: Room[], tab: FilterTab): Room[] {
  if (tab === "all") {
    return rooms;
  }
  return rooms.filter((room) => {
    const status = getTripStatus(room.tripStartDate, room.tripEndDate);
    if (tab === "upcoming") {
      // "다가오는 여행" 탭에는 진행 중인 여행도 포함
      return status === "upcoming" || status === "ongoing";
    }
    return status === "past";
  });
}

export function TripFilterTabs({ rooms }: { rooms: Room[] }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const filtered = filterRooms(rooms, activeTab);

  return (
    <div className="flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === tab.key
                ? "bg-white text-brand-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <TripGrid rooms={filtered} />
    </div>
  );
}
