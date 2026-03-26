"use client";

import { useState } from "react";
import { Button, Text } from "@/src/components/ui";
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
          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            onClick={() => setIsJoinModalOpen(true)}
            className="rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            초대코드로 참여
          </Button>
          <Button
            variant="icon"
            color="primary"
            size="sm"
            aria-label="프로필"
            className="rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-sm cursor-pointer"
          >
            T
          </Button>
        </div>
      </header>

      <JoinRoomModal open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen} />
    </>
  );
}
