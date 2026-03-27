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

export const roomApi = {
  list: () => api.get<MyRoomApi[]>("/api/rooms"),

  create: (data: CreateRoomRequestApi) => api.post<RoomApi>("/api/rooms", data),

  get: (roomId: string) => api.get<RoomApi>(`/api/rooms/${roomId}`),

  update: (roomId: string, data: UpdateRoomRequestApi) =>
    api.patch<RoomApi>(`/api/rooms/${roomId}`, data),

  delete: (roomId: string) => api.delete<void>(`/api/rooms/${roomId}`),

  join: (data: JoinRoomRequestApi) => api.post<JoinRoomResponseApi>("/api/rooms/join", data),

  leaveRoom: (roomId: string) => api.delete<void>(`/api/rooms/${roomId}/members/me`),

  issueInviteCode: (roomId: string) =>
    api.post<IssueInviteCodeResponseApi>(`/api/rooms/${roomId}/invite-code`),
};

export const ROOM_ERROR_MESSAGES = {
  list: "방 목록을 불러오는데 실패했습니다",
  create: "방 생성에 실패했습니다",
  get: "방 정보를 불러오는데 실패했습니다",
  update: "방 수정에 실패했습니다",
  delete: "방 삭제에 실패했습니다",
  join: "방 참여에 실패했습니다",
  leaveRoom: "방 탈퇴에 실패했습니다",
  issueInviteCode: "초대코드 발급에 실패했습니다",
} as const;
