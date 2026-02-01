"use client";

import { useState } from "react";
import { Text } from "@/src/components/ui";
import { Calendar } from "@/src/feature/calendar";
import { Maps } from "@/src/feature/maps";
import { DAY_COL_MIN_W, MOCK_EVENTS } from "../calendar/constants";

export function RoomContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-1 min-h-0 flex-row p-2 overflow-hidden">
      <div className="flex basis-3/5 shrink-0 min-w-[500px] min-h-0 flex-col overflow-hidden">
        <Calendar />
      </div>

      {isSidebarOpen && (
        <div className="flex flex-col shrink-0 py-grid-gap pl-grid-gap bg-canvas">
          <div className="flex flex-col rounded-xl bg-surface p-grid-gap gap-grid-gap h-full">
            {MOCK_EVENTS.map((event) => (
              <div
                key={event.id}
                className="shrink-0 cursor-pointer rounded-md bg-canvas shadow-sm transition-shadow hover:shadow-md"
                style={{ width: DAY_COL_MIN_W }}
              >
                <Text variant="body">{event.title}</Text>
                <Text variant="small">{event.time}</Text>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
        className="flex items-center justify-center h-full bg-canvas pointer-cursor rounded-r-xl px-2"
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
