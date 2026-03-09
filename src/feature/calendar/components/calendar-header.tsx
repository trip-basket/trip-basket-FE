"use client";

import { Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { BackButton, HeaderActions } from "./header";

export function CalendarHeader() {
  const room = useRoomStore((s) => s.room);

  if (!room) {
    return null;
  }

  return (
    <header className="flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <BackButton />
        <Text variant="body" weight="bold" className="truncate">
          {room.name}
        </Text>
      </div>
      <HeaderActions />
    </header>
  );
}
