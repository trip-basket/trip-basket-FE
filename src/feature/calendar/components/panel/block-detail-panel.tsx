"use client";

import * as Dialog from "@radix-ui/react-dialog";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import type { Member } from "@/src/feature/room/types";
import { MOCK_BLOCK_TODOS } from "../../mocks";
import useCalendarStore from "../../stores/use-calendar-store";
import { PanelContent } from "./panel-content";

export function BlockDetailPanel({ blockId }: { blockId: string }) {
  const room = useRoomStore((s) => s.room);
  const members = room?.members ?? [];
  const findBlock = useCalendarStore((s) => s.findBlock);
  const tripDays = useCalendarStore((s) => s.tripDays);

  const result = findBlock(blockId);

  if (!result) {
    return null;
  }

  const { block, date } = result;
  const day = tripDays.find((d) => d.date === date);

  if (!day) {
    return null;
  }
  const todos = MOCK_BLOCK_TODOS.filter((t) => t.blockId === block.id);
  const reactionMembers = (block.reactions ?? [])
    .map((r) => members.find((m) => m.id === r.memberId))
    .filter((m): m is Member => m !== undefined);

  return (
    <>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-outline shrink-0">
        <div className="flex items-center gap-0.5">
          {/* 버킷으로 이동 */}
          <button
            type="button"
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-hover text-muted hover:text-sub transition-colors duration-150 cursor-pointer"
            aria-label="버킷으로 이동"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z" />
            </svg>
          </button>
          {/* 삭제 */}
          <button
            type="button"
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-colors duration-150 cursor-pointer"
            aria-label="삭제"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
        {/* 닫기 */}
        <Dialog.Close asChild>
          <button
            type="button"
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-hover text-muted hover:text-sub transition-colors duration-150 cursor-pointer"
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
        </Dialog.Close>
      </div>

      <PanelContent
        block={block}
        day={day}
        todos={todos}
        reactionMembers={reactionMembers}
        members={members}
        currency={room?.currency}
      />
    </>
  );
}
