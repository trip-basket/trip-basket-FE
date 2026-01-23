"use client";

import { useState } from "react";
import { Calendar } from "@/src/feature/calendar";
import { MapContent } from "@/src/feature/map";

export function RoomContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-1 flex-row">
      <div className="flex basis-3/5 shrink-0 min-w-[500px] flex-col bg-green-500">
        <Calendar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {isSidebarOpen && (
        <div className="w-[200px] shrink-0 bg-blue-500">
          <p className="p-4">SIDE BAR</p>
        </div>
      )}

      <div className="flex-1 min-w-[300px] p-2">
        <MapContent />
      </div>
    </div>
  );
}
