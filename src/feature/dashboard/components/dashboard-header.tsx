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
            variant="borderless"
            size="sm"
            onClick={() => setIsJoinModalOpen(true)}
            className="rounded-full"
          >
            초대코드로 참여
          </Button>
          <Button variant="primary" size="sm" aria-label="프로필" className="rounded-full w-8 px-0">
            T
          </Button>
        </div>
      </header>

      <JoinRoomModal open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen} />
    </>
  );
}
