"use client";

import { Calendar } from "@/src/feature/calendar";
import { BlockDetailPanel, Bucket } from "@/src/feature/calendar/components";
import useCalendarBlockStore from "@/src/feature/calendar/stores/use-calendar-block-store";
import { Maps } from "@/src/feature/maps";
import { Resizer } from "./components";
import { useResizer } from "./hooks";

export function RoomDesktop() {
  const { containerRef, ratio, onPointerDown } = useResizer();
  const selectedBlockId = useCalendarBlockStore((s) => s.selectedBlockId);
  const setSelectedBlockId = useCalendarBlockStore((s) => s.setSelectedBlockId);

  return (
    <div ref={containerRef} className="flex flex-1 p-grid-gap overflow-hidden">
      {/* 왼쪽: 캘린더 + Bucket */}
      <div
        className="flex flex-col bg-canvas rounded-xl p-grid-gap gap-grid-gap min-w-0 overflow-hidden"
        style={{ width: `${ratio * 100}%` }}
      >
        <Calendar />
        <Bucket />
      </div>

      <Resizer onPointerDown={onPointerDown} />

      {/* 오른쪽: 지도 */}
      <div className="flex-1 min-w-0">
        <Maps />
      </div>

      {/* 블록 상세 사이드 패널 */}
      {selectedBlockId && (
        <BlockDetailPanel blockId={selectedBlockId} onClose={() => setSelectedBlockId(null)} />
      )}
    </div>
  );
}
