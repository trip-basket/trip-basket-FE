import { api } from "./api-client";
import type { ErrorMessages, FallbackMessages } from "./api-error";

export const roomApi = {
  list: () => api.get<MyRoomApi[]>("/api/rooms"),

  create: (data: CreateRoomRequestApi) => api.post<RoomApi>("/api/rooms", data),

  get: (roomId: string) => api.get<RoomApi>(`/api/rooms/${roomId}`),

  update: (roomId: string, data: UpdateRoomRequestApi) =>
    api.patch<RoomApi>(`/api/rooms/${roomId}`, data),

  delete: (roomId: string) => api.delete<void>(`/api/rooms/${roomId}`),

  issueInviteCode: (roomId: string) =>
    api.post<IssueInviteCodeResponseApi>(`/api/rooms/${roomId}/invite-code`),
};

/**
 * Swagger 명세 기반 에러 메시지 정의
 *
 * GET    /api/rooms                      → 404
 * POST   /api/rooms                      → 400
 * GET    /api/rooms/{roomId}             → 404
 * PATCH  /api/rooms/{roomId}             → 400, 404
 * DELETE /api/rooms/{roomId}             → 404
 * POST   /api/rooms/{roomId}/invite-code → 401, 403, 404
 */
export const ROOM_TOAST_MESSAGES: Record<string, ErrorMessages> = {
  create: {
    default: "방 생성에 실패했습니다",
  },
  update: {
    403: "방 수정 권한이 없습니다",
    404: "존재하지 않는 방입니다",
    default: "방 수정에 실패했습니다",
  },
  delete: {
    403: "방 삭제 권한이 없습니다",
    404: "이미 삭제된 방입니다",
    default: "방 삭제에 실패했습니다",
  },
  issueInviteCode: {
    403: "방장만 초대코드를 발급할 수 있습니다",
    404: "존재하지 않는 방입니다",
    default: "초대코드 발급에 실패했습니다",
  },
} as const;

export const ROOM_FALLBACK_MESSAGES: Record<string, FallbackMessages> = {
  get: {
    404: {
      title: "존재하지 않는 방입니다",
      description: "방이 삭제되었거나 주소가 잘못되었어요.",
    },
    403: {
      title: "접근 권한이 없습니다",
      description: "이 방에 참여하려면 초대코드가 필요해요.",
    },
    default: {
      title: "방을 불러올 수 없습니다",
      description: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
    },
  },
  list: {
    default: {
      title: "여행 목록을 불러올 수 없습니다",
      description: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
    },
  },
};

interface CreateRoomRequestApi {
  name: string;
  tripStartDate: string;
  tripEndDate: string;
}

interface RoomMemberApi {
  memberId: string;
  nickname: string;
  role: "OWNER" | "MEMBER";
  joinedAt: string;
}

interface RoomApi {
  id: string;
  name: string;
  tripStartDate: string;
  tripEndDate: string;
  createdAt: string;
  members: RoomMemberApi[];
}

interface MyRoomApi {
  roomId: string;
  name: string;
  tripStartDate: string;
  tripEndDate: string;
  role: "OWNER" | "MEMBER";
  joinedAt: string;
  memberCount: number;
}

interface UpdateRoomRequestApi {
  name?: string;
  tripStartDate?: string;
  tripEndDate?: string;
}

interface IssueInviteCodeResponseApi {
  roomId: string;
  inviteCode: string;
  issuedAt: string;
}
