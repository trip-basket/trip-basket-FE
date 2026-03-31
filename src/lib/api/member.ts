import { api } from "./api-client";

interface MyInfoApi {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

export const memberApi = {
  me: () => api.get<MyInfoApi>("/api/members/me"),
};
