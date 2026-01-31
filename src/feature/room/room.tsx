"use client";

import { useState } from "react";
import { Calendar } from "@/src/feature/calendar";
import { Maps } from "@/src/feature/maps";

export function RoomContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-1 min-h-0 flex-row p-2 gap-2 overflow-hidden">
      <div className="flex basis-3/5 shrink-0 min-w-[500px] min-h-0 flex-col overflow-hidden">
        <Calendar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {isSidebarOpen && (
        <div className="w-[200px] shrink-0 bg-blue-500">
          <p className="p-4">SIDE BAR</p>
        </div>
      )}

      <div className="flex-1 min-w-[300px]">
        <Maps />
      </div>
    </div>
  );
}
