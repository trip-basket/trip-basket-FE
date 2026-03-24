import { api } from "./api-client";

interface CreateRoomRequest {
  name: string;
  tripStartDate: string;
  tripEndDate: string;
}

interface Room {
  id: string;
  name: string;
  tripStartDate: string;
  tripEndDate: string;
  createdAt: string;
}

interface IssueInviteCodeResponse {
  roomId: string;
  inviteCode: string;
  issuedAt: string;
}

export const roomApi = {
  create: (data: CreateRoomRequest) => api.post<Room>("/api/rooms", data),

  delete: (roomId: string) => api.delete<void>(`/api/rooms/${roomId}`),

  issueInviteCode: (roomId: string) =>
    api.post<IssueInviteCodeResponse>(`/api/rooms/${roomId}/invite-code`),
};

export const roomErrorMessages = {
  create: "방 생성에 실패했습니다",
  delete: "방 삭제에 실패했습니다",
  issueInviteCode: "초대코드 발급에 실패했습니다",
} as const;
