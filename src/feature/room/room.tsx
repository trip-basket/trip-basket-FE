"use client";

import { useMediaQuery } from "@/src/hooks/use-media-query";
import { RoomDesktop } from "./room-desktop";
import { RoomMobile } from "./room-mobile";

export function RoomContent() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // SSR + hydration: 화면 크기 모름 → 둘 다 렌더 + CSS 숨김
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
