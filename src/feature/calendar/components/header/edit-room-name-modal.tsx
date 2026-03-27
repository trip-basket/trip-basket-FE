"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/query-keys";
import { toast } from "@/src/lib/toast";

const editRoomNameSchema = z.object({
  name: z.string().trim().min(1, "방 이름을 입력해주세요"),
});

type EditRoomNameInput = z.infer<typeof editRoomNameSchema>;

interface EditRoomNameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditRoomNameModal({ open, onOpenChange }: EditRoomNameModalProps) {
  const room = useRoomStore((s) => s.room);
  const setRoom = useRoomStore((s) => s.setRoom);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditRoomNameInput>({
    resolver: zodResolver(editRoomNameSchema),
    defaultValues: { name: room?.name ?? "" },
  });

  useEffect(() => {
    if (open && room) {
      reset({ name: room.name });
    }
  }, [open, room, reset]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
    }
    onOpenChange(nextOpen);
  };

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: { roomId: string; name: string }) =>
      roomApi.update(data.roomId, { name: data.name }),
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms });
      if (room) {
        setRoom({ ...room, name: result.name });
      }
      handleOpenChange(false);
    },
    onError: () => toast.error(ROOM_ERROR_MESSAGES.update),
  });

  const onSubmit = (data: EditRoomNameInput) => {
    if (!room) {
      return;
    }
    updateMutation.mutate({ roomId: room.id, name: data.name });
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl w-full max-w-sm flex flex-col"
          style={{
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <Dialog.Title asChild>
              <Text variant="body" weight="bold">
                방 이름 수정
              </Text>
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="icon"
                color="neutral"
                size="sm"
                aria-label="닫기"
                className="cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
            <Input
              label="방 이름"
              placeholder="예: 런던 여행"
              error={errors.name?.message}
              {...register("name")}
            />
          </form>

          <div className="flex items-center justify-end gap-2 px-6 pb-5 pt-2">
            <Dialog.Close asChild>
              <Button variant="ghost" color="neutral" size="sm" className="cursor-pointer">
                취소
              </Button>
            </Dialog.Close>
            <Button
              size="sm"
              color="primary"
              disabled={updateMutation.isPending}
              onClick={handleSubmit(onSubmit)}
              className="cursor-pointer"
            >
              {updateMutation.isPending ? "저장 중..." : "저장"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
