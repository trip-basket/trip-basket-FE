"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar } from "@/src/feature/calendar";
import {
  BlockDetailPanel,
  Bucket,
  CalendarHeader,
  CalendarMetaBar,
} from "@/src/feature/calendar/components";
import useBlockStore from "@/src/feature/calendar/stores/use-block-store";
import { Maps } from "@/src/feature/maps";

export function RoomDesktop() {
  const selectedBlockId = useBlockStore((s) => s.selectedBlockId);
  const setSelectedBlockId = useBlockStore((s) => s.setSelectedBlockId);

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* 지도: 오른쪽 35% 배경 캔버스 */}
      <div className="absolute top-0 right-0 bottom-0" style={{ width: "35%" }}>
        <Maps />
      </div>

      {/* 캘린더 패널: 왼쪽 65%, 지도 위에 부양 */}
      <div
        className="relative z-10 flex h-full flex-col"
        style={{
          width: "65%",
          backgroundColor: "var(--brand-500)",
          boxShadow: "4px 0 32px rgba(0, 0, 0, 0.10), 12px 0 64px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="px-3 py-2">
          <CalendarHeader />
        </div>
        <div className="relative flex flex-1 min-h-0 flex-col overflow-hidden rounded-t-xl bg-white border border-black/6">
          <CalendarMetaBar />
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
