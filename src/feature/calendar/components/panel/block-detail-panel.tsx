"use client";

import { useEffect } from "react";
import { Button } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import type { Member } from "@/src/feature/room/types";
import { MOCK_BLOCK_TODOS } from "../../mocks";
import useCalendarBlockStore from "../../stores/use-calendar-block-store";
import { PanelContent } from "./panel-content";

export function BlockDetailPanel({ blockId, onClose }: { blockId: string; onClose: () => void }) {
  const room = useRoomStore((s) => s.room);
  const members = useRoomStore((s) => s.members);
  const days = useRoomStore((s) => s.days);
  const calendarBlocks = useCalendarBlockStore((s) => s.calendarBlocks);

  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleClose);

    return () => document.removeEventListener("keydown", handleClose);
  }, [onClose]);

  const block = calendarBlocks.find((b) => b.id === blockId);

  if (!block) {
    return null;
  }

  const todos = MOCK_BLOCK_TODOS.filter((t) => t.blockId === block.id);
  const reactionMembers = (block.reactions ?? [])
    .map((r) => members.find((m) => m.id === r.memberId))
    .filter((m): m is Member => m !== undefined);
  const day = days[block.dayIndex];

  if (!day) {
    return null;
  }

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop overlay */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: global escape handles keyboard */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 w-[500px] bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-end px-3 py-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center h-7 w-7 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-150"
            aria-label="닫기"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <PanelContent
          block={block}
          day={day}
          todos={todos}
          reactionMembers={reactionMembers}
          members={members}
          currency={room?.currency ?? ""}
        />

        <div className="shrink-0 px-10 py-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2">
            <Button variant="outline" color="neutral" size="sm" fullWidth>
              버킷으로 이동
            </Button>
            <Button variant="outline" color="danger" size="sm" fullWidth>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
