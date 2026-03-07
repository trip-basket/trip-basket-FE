"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar } from "@/src/feature/calendar";
import { BlockDetailPanel, Bucket, CalendarHeader } from "@/src/feature/calendar/components";
import useCalendarBlockStore from "@/src/feature/calendar/stores/use-calendar-block-store";
import { Maps } from "@/src/feature/maps";

export function RoomDesktop() {
  const selectedBlockId = useCalendarBlockStore((s) => s.selectedBlockId);
  const setSelectedBlockId = useCalendarBlockStore((s) => s.setSelectedBlockId);

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* 지도: 오른쪽 35% 배경 캔버스 */}
      <div className="absolute top-0 right-0 bottom-0" style={{ width: "35%" }}>
        <Maps />
      </div>

      {/* 캘린더: 왼쪽 65%, 부양감 */}
      <div className="relative z-10 flex h-full flex-col gap-grid-gap p-3" style={{ width: "65%" }}>
        <CalendarHeader />
        <div className="relative flex flex-1 min-h-0 flex-col rounded-2xl bg-white shadow-xl overflow-hidden">
          <Calendar />
          <Bucket />
        </div>
      </div>

      {/* 블록 상세 사이드 패널 */}
      <Dialog.Root
        open={!!selectedBlockId}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedBlockId(null);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
          <Dialog.Content
            className="fixed right-0 top-0 bottom-0 w-[500px] bg-white z-50 shadow-2xl flex flex-col"
            aria-describedby={undefined}
          >
            <VisuallyHidden>
              <Dialog.Title>블록 상세</Dialog.Title>
            </VisuallyHidden>
            {selectedBlockId && <BlockDetailPanel blockId={selectedBlockId} />}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
