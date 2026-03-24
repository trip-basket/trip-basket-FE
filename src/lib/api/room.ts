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
