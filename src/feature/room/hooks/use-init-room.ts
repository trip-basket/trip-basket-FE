import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useCalendarStore from "@/src/feature/calendar/stores/use-calendar-store";
import { blockApi, roomApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/api/query-keys";
import { DEFAULT_CURRENCY } from "../constants";
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
  const initBlocks = useCalendarStore((s) => s.initBlocks);

  const roomQuery = useQuery({
    queryKey: QUERY_KEYS.room(roomId),
    queryFn: () => roomApi.get(roomId),
    throwOnError: true,
  });

  const blocksQuery = useQuery({
    queryKey: QUERY_KEYS.blocks(roomId),
    queryFn: () => blockApi.list(roomId),
    throwOnError: true,
  });

  useEffect(() => {
    if (roomQuery.data) {
      setRoom({
        id: roomQuery.data.id,
        name: roomQuery.data.name,
        currency: DEFAULT_CURRENCY,
        members: roomQuery.data.members.map((m) => ({
          id: m.memberId,
          nickname: m.nickname,
          role: API_ROLE_MAP[m.role],
        })),
      });
      setDates(roomQuery.data.tripStartDate, roomQuery.data.tripEndDate);
    }
  }, [roomQuery.data, setRoom, setDates]);

  useEffect(() => {
    if (roomQuery.data && blocksQuery.data) {
      initBlocks(blocksQuery.data.blocks);
    }
  }, [roomQuery.data, blocksQuery.data, initBlocks]);

  return { isLoading: roomQuery.isLoading || blocksQuery.isLoading };
}
