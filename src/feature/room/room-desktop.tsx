"use client";

import { useState } from "react";
import { Calendar } from "@/src/feature/calendar";
import { BlockBucket, SidebarToggle } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";

export function RoomDesktop() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 min-h-0 flex-row p-grid-gap overflow-hidden">
      <div className="flex basis-3/6 shrink-0 min-w-[500px] min-h-0 flex-col overflow-hidden">
        <Calendar />
      </div>

      {isSidebarOpen && <BlockBucket />}
      <SidebarToggle onClick={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="min-h-0 flex-1 min-w-[300px] ml-2">
        <Maps />
      </div>
    </div>
  );
}
