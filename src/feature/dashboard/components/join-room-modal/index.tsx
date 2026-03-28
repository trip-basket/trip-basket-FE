"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Text } from "@/src/components/ui";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/api/query-keys";
import { toast } from "@/src/lib/toast";

const joinRoomSchema = z.object({
  inviteCode: z.string().trim().min(1, "초대코드를 입력해주세요"),
});

type JoinRoomInput = z.infer<typeof joinRoomSchema>;

interface JoinRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinRoomModal({ open, onOpenChange }: JoinRoomModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JoinRoomInput>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: { inviteCode: "" },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
    }
    onOpenChange(nextOpen);
  };

  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: (data: JoinRoomInput) => roomApi.join(data),
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms });
      handleOpenChange(false);
      window.location.href = `/plan/${result.roomId}`;
    },
    onError: () => toast.error(ROOM_ERROR_MESSAGES.join),
  });

  const onSubmit = (data: JoinRoomInput) => joinMutation.mutate(data);

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
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <div className="flex flex-col gap-0.5">
              <Dialog.Title asChild>
                <Text variant="body" weight="bold">
                  초대코드로 참여
                </Text>
              </Dialog.Title>
              <Text variant="small" color="sub">
                공유받은 초대코드를 입력하세요
              </Text>
            </div>
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

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
            <Input
              label="초대코드"
              placeholder="예: A2C3D4"
              error={errors.inviteCode?.message}
              autoComplete="off"
              {...register("inviteCode")}
            />
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-6 pb-5 pt-2">
            <Dialog.Close asChild>
              <Button variant="ghost" color="neutral" size="sm" className="cursor-pointer">
                취소
              </Button>
            </Dialog.Close>
            <Button
              size="sm"
              color="primary"
              disabled={joinMutation.isPending}
              onClick={handleSubmit(onSubmit)}
              className="cursor-pointer"
            >
              {joinMutation.isPending ? "참여 중..." : "참여하기"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
