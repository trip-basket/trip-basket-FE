"use client";

import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useInitRoom } from "./hooks/use-init-room";
import { RoomDesktop } from "./room-desktop";
import { RoomMobile } from "./room-mobile";

export function RoomContent({ roomId }: { roomId: string }) {
  const { isLoading } = useInitRoom(roomId);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isLoading) {
    return null;
  }

  if (isDesktop === null) {
    return (
      <>
        <div className="contents lg:hidden">
          <RoomMobile />
        </div>
        <div className="hidden lg:contents">
          <RoomDesktop />
        </div>
      </>
    );
  }

  return isDesktop ? <RoomDesktop /> : <RoomMobile />;
}
