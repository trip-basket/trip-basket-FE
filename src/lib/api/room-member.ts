import { api } from "./api-client";
import type { ErrorMessages } from "./api-error";

export const roomMemberApi = {
  join: (data: JoinRoomRequestApi) => api.post<JoinRoomResponseApi>("/api/rooms/join", data),

  leaveRoom: (roomId: string) => api.delete<void>(`/api/rooms/${roomId}/members/me`),
};

export const ROOM_MEMBER_TOAST_MESSAGES: Record<string, ErrorMessages> = {
  join: {
    404: "유효하지 않은 초대코드입니다",
    409: "이미 참여한 방입니다",
    default: "방 참여에 실패했습니다",
  },
  leaveRoom: {
    400: "방장은 방을 나갈 수 없습니다",
    403: "방 접근 권한이 없습니다",
    default: "방 탈퇴에 실패했습니다",
  },
} as const;

interface JoinRoomRequestApi {
  inviteCode: string;
}

interface JoinRoomResponseApi {
  roomId: string;
  roomName: string;
  tripStartDate: string;
  tripEndDate: string;
  role: "OWNER" | "MEMBER";
  joinedAt: string;
}
