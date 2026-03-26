import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import { roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/query-keys";
import useRoomStore from "../stores/use-room-store";
import type { MemberRole } from "../types";

const API_ROLE_MAP: Record<"OWNER" | "MEMBER", MemberRole> = {
  // biome-ignore lint/style/useNamingConvention: API enum value
  OWNER: "owner",
  // biome-ignore lint/style/useNamingConvention: API enum value
  MEMBER: "editor",
};

export function useInitRoom(roomId: string) {
  const setRoom = useRoomStore((s) => s.setRoom);
  const setDates = useCalendarStore((s) => s.setDates);

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.room(roomId),
    queryFn: () => roomApi.get(roomId),
  });

  useEffect(() => {
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
  }, [data, setRoom, setDates]);

  return { isLoading };
}
