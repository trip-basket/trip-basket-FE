"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { toast } from "@/src/lib/toast";
import { useInitRoom } from "./hooks/use-init-room";
import { RoomDesktop } from "./room-desktop";
import { RoomMobile } from "./room-mobile";

export function RoomContent({ roomId }: { roomId: string }) {
  const { isLoading, isError } = useInitRoom(roomId);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast.error("방을 찾을 수 없습니다");
      router.replace("/");
      return;
    }
  }, [isError, router]);

  if (isLoading || isError) {
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
