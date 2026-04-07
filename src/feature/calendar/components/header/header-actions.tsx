"use client";

import * as Popover from "@radix-ui/react-popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Text } from "@/src/components/ui";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { getErrorMessage, ROOM_MEMBER_TOAST_MESSAGES, roomMemberApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/api/query-keys";
import { toast } from "@/src/lib/toast";
import { EditRoomNameModal } from "./edit-room-name-modal";

export function HeaderActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);
  const room = useRoomStore((s) => s.room);
  const router = useRouter();
  const queryClient = useQueryClient();

  const leaveRoomMutation = useMutation({
    mutationFn: () => roomMemberApi.leaveRoom(room!.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rooms });
      router.replace("/dashboard");
    },
    onError: (error) => toast.error(getErrorMessage(error, ROOM_MEMBER_TOAST_MESSAGES.leaveRoom)),
  });

  const handleLeaveRoom = () => {
    if (!room) {
      return;
    }

    const confirmed = window.confirm(
      "방에서 탈퇴하면 다시 초대코드가 필요합니다. 탈퇴하시겠습니까?",
    );
    if (confirmed) {
      leaveRoomMutation.mutate();
    }
  };

  const handleEditName = () => {
    setIsMenuOpen(false);
    setIsEditNameOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-1 shrink-0 ml-4">
        {/* 내보내기 버튼 */}
        <Button variant="borderless" size="icon" aria-label="내보내기">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M5.5 2H3.5C2.67 2 2 2.67 2 3.5V12.5C2 13.33 2.67 14 3.5 14H12.5C13.33 14 14 13.33 14 12.5V10.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M8.5 7.5L14 2M14 2H10.5M14 2V5.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        {/* 설정 메뉴 */}
        <Popover.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <Popover.Trigger asChild>
            <Button variant="borderless" size="icon" aria-label="설정">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                <circle cx="8" cy="13" r="1.2" fill="currentColor" />
              </svg>
            </Button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="end"
              sideOffset={4}
              collisionPadding={16}
              className="z-50 animate-in fade-in-0 zoom-in-95"
            >
              <div className="flex flex-col bg-white rounded-xl shadow-xl border border-outline w-fit p-1.5">
                <Button
                  variant="borderless"
                  size="sm"
                  className="justify-start cursor-pointer"
                  onClick={handleEditName}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-soft"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <Text as="span" variant="small">
                    방 이름 수정
                  </Text>
                </Button>
                <Button
                  variant="borderless"
                  size="sm"
                  className="justify-start cursor-pointer text-error hover:bg-error-50"
                  onClick={handleLeaveRoom}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-error-500"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <Text as="span" variant="small" color="error">
                    방 탈퇴
                  </Text>
                </Button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      <EditRoomNameModal open={isEditNameOpen} onOpenChange={setIsEditNameOpen} />
    </>
  );
}
