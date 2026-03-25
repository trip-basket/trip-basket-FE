import { api } from "./api-client";

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

interface IssueInviteCodeResponseApi {
  roomId: string;
  inviteCode: string;
  issuedAt: string;
}

export const roomApi = {
  create: (data: CreateRoomRequestApi) => api.post<RoomApi>("/api/rooms", data),

  get: (roomId: string) => api.get<RoomApi>(`/api/rooms/${roomId}`),

  delete: (roomId: string) => api.delete<void>(`/api/rooms/${roomId}`),

  issueInviteCode: (roomId: string) =>
    api.post<IssueInviteCodeResponseApi>(`/api/rooms/${roomId}/invite-code`),
};

export const ROOM_ERROR_MESSAGES = {
  create: "방 생성에 실패했습니다",
  get: "방 정보를 불러오는데 실패했습니다",
  delete: "방 삭제에 실패했습니다",
  issueInviteCode: "초대코드 발급에 실패했습니다",
} as const;
