"use client";

import { useState } from "react";
import { Text } from "@/src/components/ui/text";
import { JoinRoomModal } from "./join-room-modal";

export function DashboardHeader() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <Text variant="small" color="muted" weight="medium">
            Travel Basket
          </Text>
          <Text variant="h2" weight="bold" className="mt-0.5">
            내 여행
          </Text>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="h-9 px-4 rounded-full bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          >
            초대코드로 참여
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer"
            aria-label="프로필"
          >
            T
          </button>
        </div>
      </header>

      <JoinRoomModal open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen} />
    </>
  );
}
