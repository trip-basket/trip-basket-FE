"use client";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, PageSpinner } from "@/src/components/ui";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { ROOM_FALLBACK_MESSAGES } from "@/src/lib/api";
import { useInitRoom } from "./hooks/use-init-room";
import { RoomDesktop } from "./room-desktop";
import { RoomMobile } from "./room-mobile";

function RoomInner({ roomId }: { roomId: string }) {
  const { isLoading } = useInitRoom(roomId);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isLoading) {
    return <PageSpinner />;
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

export function RoomContent({ roomId }: { roomId: string }) {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ErrorFallback {...props} errorContents={ROOM_FALLBACK_MESSAGES.get} />
      )}
    >
      <RoomInner roomId={roomId} />
    </ErrorBoundary>
  );
}
