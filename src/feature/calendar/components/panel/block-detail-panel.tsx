"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Button, Spinner, Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { BLOCK_TOAST_MESSAGES, blockApi, getErrorMessage, memberApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/api/query-keys";
import useCalendarStore from "../../stores/use-calendar-store";
import { toScheduledBlock } from "../../utils";
import { PanelContent } from "./panel-content";
import { PanelHeader } from "./panel-header";

export function BlockDetailPanel({ blockId }: { blockId: string }) {
  const room = useRoomStore((s) => s.room);
  const roomId = room?.id;
  const findBlock = useCalendarStore((s) => s.findBlock);
  const tripDays = useCalendarStore((s) => s.tripDays);
  const deleteBlock = useCalendarStore((s) => s.deleteBlock);
  const updateMemo = useCalendarStore((s) => s.updateMemo);
  const updateCost = useCalendarStore((s) => s.updateCost);
  const updateDuration = useCalendarStore((s) => s.updateDuration);
  const moveInCalendar = useCalendarStore((s) => s.moveInCalendar);
  const toggleReaction = useCalendarStore((s) => s.toggleReaction);
  const addTodo = useCalendarStore((s) => s.addTodo);
  const updateTodo = useCalendarStore((s) => s.updateTodo);
  const deleteTodo = useCalendarStore((s) => s.deleteTodo);
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: me } = useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: () => memberApi.me(),
    staleTime: Number.POSITIVE_INFINITY,
  });
  const myMemberId = me?.id;

  const invalidateBlock = useCallback(() => {
    if (roomId) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.block(roomId, blockId) });
    }
  }, [queryClient, roomId, blockId]);

  const handleDelete = () => {
    deleteBlock(blockId);
    setIsDeleteOpen(false);
  };

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

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (error || !blockDetail) {
    content = (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-7">
        <Text variant="small" color="muted">
          {error
            ? getErrorMessage(error, BLOCK_TOAST_MESSAGES.get)
            : "블록 정보를 불러올 수 없습니다"}
        </Text>
      </div>
    );
  } else {
    const block = toScheduledBlock(blockDetail);

    const firstDate = tripDays[0]?.date ?? "";
    const lastDate = tripDays[tripDays.length - 1]?.date ?? "";

    content = (
      <PanelContent
        block={block}
        day={day}
        myMemberId={myMemberId}
        onUpdateMemo={(memo) => {
          updateMemo(blockId, memo).then(invalidateBlock);
        }}
        onUpdateCost={(cost) => {
          updateCost(blockId, cost).then(invalidateBlock);
        }}
        onUpdateDuration={(endHour) => {
          updateDuration(blockId, endHour).then(invalidateBlock);
        }}
        onMoveBlock={(date, startHour) => {
          moveInCalendar(blockId, date, startHour).then(invalidateBlock);
        }}
        onToggleReaction={() => {
          if (!myMemberId) {
            return;
          }
          toggleReaction(blockId, myMemberId).then(invalidateBlock);
        }}
        onAddTodo={(text) => {
          addTodo(blockId, text).then(invalidateBlock);
        }}
        onUpdateTodo={(todoId, updates) => {
          updateTodo(blockId, todoId, updates).then(invalidateBlock);
        }}
        onDeleteTodo={(todoId) => {
          deleteTodo(blockId, todoId).then(invalidateBlock);
        }}
        dateRange={{ start: firstDate, end: lastDate }}
        currency={room?.currency}
      />
    );
  }

  return (
    <>
      <PanelHeader onDelete={() => setIsDeleteOpen(true)} />
      {content}

      <Dialog.Root open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 z-[60]" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white rounded-2xl w-full max-w-xs flex flex-col"
            style={{
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.08)",
            }}
            aria-describedby={undefined}
          >
            <div className="px-6 pt-5 pb-2">
              <Dialog.Title asChild>
                <Text variant="body" weight="bold">
                  블록 삭제
                </Text>
              </Dialog.Title>
            </div>

            <div className="px-6 py-3">
              <Text variant="small" color="sub">
                블록을 삭제하시겠습니까?
              </Text>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 pb-5 pt-2">
              <Dialog.Close asChild>
                <Button variant="borderless" size="sm" className="cursor-pointer">
                  취소
                </Button>
              </Dialog.Close>
              <Button variant="danger" size="sm" onClick={handleDelete} className="cursor-pointer">
                삭제
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
