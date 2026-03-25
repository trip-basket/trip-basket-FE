import { useEffect, useState } from "react";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import { ROOM_ERROR_MESSAGES, roomApi } from "@/src/lib/api";
import { request } from "@/src/lib/request";
import useRoomStore from "../stores/use-room-store";
import type { MemberRole } from "../types";

const API_ROLE_MAP: Record<"OWNER" | "MEMBER", MemberRole> = {
  // biome-ignore lint/style/useNamingConvention: API enum value
  OWNER: "owner",
  // biome-ignore lint/style/useNamingConvention: API enum value
  MEMBER: "editor",
};

export function useInitRoom(roomId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const setRoom = useRoomStore((s) => s.setRoom);
  const setDates = useCalendarStore((s) => s.setDates);

  useEffect(() => {
    const init = async () => {
      const data = await request(() => roomApi.get(roomId), ROOM_ERROR_MESSAGES.get);
      if (data) {
        setRoom({
          id: data.id,
          name: data.name,
          currency: "₩",
          members: data.members.map((m) => ({
            id: m.memberId,
            nickname: m.nickname,
            role: API_ROLE_MAP[m.role],
          })),
        });
        setDates(data.tripStartDate, data.tripEndDate);
      }
      setIsLoading(false);
    };

    init();
  }, [roomId, setRoom, setDates]);

  return { isLoading };
}
