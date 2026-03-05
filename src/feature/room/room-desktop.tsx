"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar } from "@/src/feature/calendar";
import { BlockDetailPanel, Bucket, CalendarHeader } from "@/src/feature/calendar/components";
import useCalendarBlockStore from "@/src/feature/calendar/stores/use-calendar-block-store";
import { Maps } from "@/src/feature/maps";
import { Resizer } from "./components";
import { useResizer } from "./hooks";

export function RoomDesktop() {
  const { containerRef, ratio, onPointerDown } = useResizer();
  const selectedBlockId = useCalendarBlockStore((s) => s.selectedBlockId);
  const setSelectedBlockId = useCalendarBlockStore((s) => s.setSelectedBlockId);

  return (
    <div ref={containerRef} className="flex flex-1 p-grid-gap gap-grid-gap overflow-hidden">
      {/* 왼쪽: 헤더 + 캘린더 + Bucket */}
      <div
        className="flex flex-col gap-grid-gap min-w-0 overflow-hidden"
        style={{ width: `${ratio * 100}%` }}
      >
        <CalendarHeader />
        <div className="flex flex-1 min-h-0 flex-col bg-inset border border-black/4 rounded-xl p-grid-gap gap-grid-gap overflow-hidden">
          <Calendar />
          <Bucket />
        </div>
      </div>

      <Resizer onPointerDown={onPointerDown} />

      {/* 오른쪽: 지도 */}
      <div className="flex-1 min-w-0 rounded-xl overflow-hidden bg-inset border border-black/4 p-grid-gap">
        <Maps />
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
