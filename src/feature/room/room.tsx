"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui";
import { Calendar } from "@/src/feature/calendar";
import { Maps } from "@/src/feature/maps";

export function RoomContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-1 min-h-0 flex-row p-2 overflow-hidden">
      <div className="flex basis-3/5 shrink-0 min-w-[500px] min-h-0 flex-col overflow-hidden">
        <Calendar />
      </div>

      {isSidebarOpen && (
        <div className="w-[200px] shrink-0 bg-blue-500">
          <p className="p-4">SIDE BAR</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
        className={`flex items-center justify-center h-full bg-canvas pointer-cursor rounded-r-xl pr-[4px] ${isSidebarOpen ? "pl-[7px]" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-900"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="flex-1 min-w-[300px] ml-2">
        <Maps />
      </div>
    </div>
  );
}
