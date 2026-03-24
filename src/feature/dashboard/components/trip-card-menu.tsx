"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { Button, Text } from "@/src/components/ui";
import { roomApi, roomErrorMessages } from "@/src/lib/api";
import { request } from "@/src/lib/request";

interface TripCardMenuProps {
  roomId: string;
  roomName: string;
}

export function TripCardMenu({ roomId, roomName }: TripCardMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIssueInviteCode = async () => {
    const result = await request(
      () => roomApi.issueInviteCode(roomId),
      roomErrorMessages.issueInviteCode,
    );
    if (result) {
      await navigator.clipboard.writeText(result.inviteCode);
      setIsOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`"${roomName}" 방을 삭제하시겠습니까?`)) {
      return;
    }

    const result = await request(() => roomApi.delete(roomId), roomErrorMessages.delete);
    if (result !== null) {
      window.location.reload();
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="icon"
          color="neutral"
          size="sm"
          aria-label="방 설정"
          className="cursor-pointer bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <circle cx="8" cy="3.5" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="8" cy="12.5" r="1.5" />
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
          <div className="bg-white rounded-xl shadow-xl border border-outline min-w-[160px] p-1.5">
            <button
              type="button"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2"
              onClick={handleIssueInviteCode}
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
                className="text-gray-500"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <Text as="span" variant="small">
                초대코드 발급
              </Text>
            </button>
            <button
              type="button"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-error-50 transition-colors cursor-pointer flex items-center gap-2"
              onClick={handleDelete}
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
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <Text as="span" variant="small" color="error">
                방 삭제
              </Text>
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
