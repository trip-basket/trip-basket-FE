"use client";

import { useQuery } from "@tanstack/react-query";
import { Spinner, Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import type { Member } from "@/src/feature/room/types";
import { BLOCK_TOAST_MESSAGES, blockApi, getErrorMessage } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/api/query-keys";
import useCalendarStore from "../../stores/use-calendar-store";
import { toScheduledBlock } from "../../utils";
import { PanelContent } from "./panel-content";
import { PanelHeader } from "./panel-header";

export function BlockDetailPanel({ blockId }: { blockId: string }) {
  const room = useRoomStore((s) => s.room);
  const roomId = room?.id;
  const members = room?.members ?? [];
  const findBlock = useCalendarStore((s) => s.findBlock);
  const tripDays = useCalendarStore((s) => s.tripDays);

  const storeResult = findBlock(blockId);
  const day = storeResult ? tripDays.find((d) => d.date === storeResult.date) : undefined;

  const {
    data: blockDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.block(roomId ?? "", blockId),
    queryFn: () => blockApi.get(roomId!, blockId),
    enabled: !!roomId,
  });

  if (isLoading) {
    return (
      <>
        <PanelHeader />
        <div className="flex-1 flex items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }

  if (error || !blockDetail) {
    return (
      <>
        <PanelHeader />
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-7">
          <Text variant="small" color="muted">
            {error
              ? getErrorMessage(error, BLOCK_TOAST_MESSAGES.get)
              : "블록 정보를 불러올 수 없습니다"}
          </Text>
        </div>
      </>
    );
  }

  const block = toScheduledBlock(blockDetail);
  const reactionMembers = (block.reactions ?? [])
    .map((r) => members.find((m) => m.id === r.memberId))
    .filter((m): m is Member => m !== undefined);

  return (
    <>
      <PanelHeader />
      <PanelContent
        block={block}
        day={day}
        todos={block.todos ?? []}
        reactionMembers={reactionMembers}
        members={members}
        currency={room?.currency}
      />
    </>
  );
}
