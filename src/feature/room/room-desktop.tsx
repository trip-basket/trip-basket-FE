"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useRef } from "react";
import useMeasure from "react-use-measure";
import { Calendar } from "@/src/feature/calendar";
import {
  BlockDetailPanel,
  Bucket,
  CalendarHeader,
  CalendarMetaBar,
} from "@/src/feature/calendar/components";
import { ADD_COL_W, DAY_COL_MIN_W, TIME_COL_W } from "@/src/feature/calendar/constants";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import { Maps } from "@/src/feature/maps";

export function RoomDesktop() {
  const selectedBlockId = useCalendarStore((s) => s.selectedBlockId);
  const setSelectedBlockId = useCalendarStore((s) => s.setSelectedBlockId);
  const tripDays = useCalendarStore((s) => s.tripDays);

  const [containerRef, { width: containerWidth }] = useMeasure();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (containerWidth > 0) {
      hasMountedRef.current = true;
    }
  }, [containerWidth]);

  const contentMinWidth = TIME_COL_W + tripDays.length * DAY_COL_MIN_W + 2 * ADD_COL_W;
  const calendarWidth =
    containerWidth > 0
      ? Math.max(containerWidth * 0.5, Math.min(contentMinWidth, containerWidth * 0.65))
      : containerWidth * 0.65;

  return (
    <div ref={containerRef} className="relative flex-1 overflow-hidden">
      {/* 지도: 캘린더 오른쪽 나머지 영역 */}
      <div
        className="absolute top-0 right-0 bottom-0"
        style={{ width: containerWidth - calendarWidth }}
      >
        <Maps />
      </div>

      {/* 캘린더 패널: 콘텐츠에 맞춰 동적 너비 */}
      <div
        className={`relative z-10 flex h-full flex-col bg-inset${hasMountedRef.current ? " transition-[width] duration-300 ease-out" : ""}`}
        style={{
          width: calendarWidth,
          boxShadow: "4px 0 32px rgba(0, 0, 0, 0.10), 12px 0 64px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="px-3 py-2">
          <CalendarHeader />
        </div>
        <div className="relative flex flex-1 min-h-0 flex-col mx-2 mb-2">
          <div className="relative flex flex-1 min-h-0 flex-col overflow-hidden rounded-block bg-white border border-black/[0.06] shadow-[0_0.5px_2px_rgba(0,0,0,0.06)]">
            <CalendarMetaBar />
            <Calendar />
            <Bucket />
          </div>
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
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
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
