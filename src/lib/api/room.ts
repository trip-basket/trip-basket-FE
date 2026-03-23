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

export const roomApi = {
  create: (data: CreateRoomRequest) => api.post<Room>("/api/rooms", data),
};
