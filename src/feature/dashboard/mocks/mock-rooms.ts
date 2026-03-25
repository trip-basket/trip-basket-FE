import type { RoomSummary } from "../types/room";

export const MOCK_ROOMS: RoomSummary[] = [
  {
    id: "room-1",
    name: "런던 여행",
    tripStartDate: "2026-04-01",
    tripEndDate: "2026-04-08",
    role: "OWNER",
    memberCount: 3,
  },
  {
    id: "room-2",
    name: "오사카 맛집 투어",
    tripStartDate: "2026-05-10",
    tripEndDate: "2026-05-14",
    role: "MEMBER",
    memberCount: 2,
  },
  {
    id: "room-3",
    name: "제주도 힐링",
    tripStartDate: "2026-03-20",
    tripEndDate: "2026-03-23",
    role: "OWNER",
    memberCount: 4,
  },
  {
    id: "room-4",
    name: "파리 봄 여행",
    tripStartDate: "2026-02-10",
    tripEndDate: "2026-02-17",
    role: "MEMBER",
    memberCount: 2,
  },
];
