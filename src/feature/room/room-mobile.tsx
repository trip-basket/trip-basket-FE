"use client";

import { BottomSheet, Button, useModal } from "@/src/components/ui";
import { Calendar } from "@/src/feature/calendar";
import { Bucket } from "@/src/feature/calendar/components";
import { Maps } from "@/src/feature/maps";

export function RoomMobile() {
  const mapModal = useModal();

  return (
    <>
      <div className="flex flex-1 min-h-0 flex-col p-grid-gap">
        <div className="flex flex-1 min-h-0 flex-col bg-inset border border-black/4 rounded-xl p-grid-gap gap-grid-gap">
          <Calendar />
          <Bucket />
        </div>
      </div>

      <Button
        variant="primary"
        onClick={mapModal.open}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        지도 보기
      </Button>

      <BottomSheet modalRef={mapModal.ref}>
        <div className="h-[90vh]">
          <Maps />
        </div>
      </BottomSheet>
    </>
  );
}
