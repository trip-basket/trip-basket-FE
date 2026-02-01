"use client";

import { useState } from "react";
import { Calendar } from "@/src/feature/calendar";
import { BlockBucket, SidebarToggle } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";

export function RoomContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 min-h-0 flex-col lg:flex-row p-grid-gap overflow-y-auto lg:overflow-hidden">
      <div className="flex lg:basis-3/5 shrink-0 lg:min-w-[500px] min-h-0 flex-col overflow-hidden">
        <Calendar />
      </div>

      {isSidebarOpen && <BlockBucket />}
      <SidebarToggle onClick={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="min-h-[300px] lg:min-h-0 flex-1 lg:min-w-[300px] lg:ml-2">
        <Maps />
      </div>
    </div>
  );
}
