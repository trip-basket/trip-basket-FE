"use client";

import { useState } from "react";
import { DashedBorder, Text } from "@/src/components/ui";
import { CreateRoomModal } from "./create-room-modal";

export function CreateTripCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group rounded-container bg-white border border-outline p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] h-full"
      >
        <div className="relative flex flex-col items-center justify-center w-full h-full rounded-card">
          <DashedBorder
            radius={16}
            className="text-dashed group-hover:text-dashed-hover transition-colors"
          />

          <div className="relative flex flex-col items-center gap-3">
            <div className="text-muted group-hover:text-amber-500 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Text
              as="span"
              variant="small"
              weight="medium"
              color="muted"
              className="group-hover:text-main transition-colors"
            >
              새 여행 만들기
            </Text>
          </div>
        </div>
      </button>

      <CreateRoomModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
