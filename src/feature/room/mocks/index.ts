import type { Day } from "@/src/feature/calendar/types";
import type { Member, Room } from "../types";

export const MOCK_ROOM: Room = {
  id: "room-1",
  name: "런던 여행 2026",
  tripStartDate: "2026-02-16",
  tripEndDate: "2026-03-01",
  currency: "\u20A9",
  budget: 3000000,
  inviteCode: "LONDON26",
};

export const MOCK_MEMBERS: Member[] = [
  { id: "m1", nickname: "태웅", role: "owner" },
  {
    id: "m2",
    nickname: "지민",
    profileImageUrl: "https://i.pravatar.cc/40?u=m2",
    role: "editor",
  },
  {
    id: "m3",
    nickname: "수현",
    profileImageUrl: "https://i.pravatar.cc/40?u=m3",
    role: "editor",
  },
  { id: "m4", nickname: "민준", role: "viewer" },
];

export const MOCK_DAYS: Day[] = [
  { dayOfWeek: "월", date: 16 },
  { dayOfWeek: "화", date: 17 },
  { dayOfWeek: "수", date: 18 },
  { dayOfWeek: "목", date: 19 },
  { dayOfWeek: "금", date: 20 },
  { dayOfWeek: "토", date: 21 },
  { dayOfWeek: "일", date: 22 },
  { dayOfWeek: "월", date: 23 },
  { dayOfWeek: "화", date: 24 },
  { dayOfWeek: "수", date: 25 },
  { dayOfWeek: "목", date: 26 },
  { dayOfWeek: "금", date: 27 },
  { dayOfWeek: "토", date: 28 },
  { dayOfWeek: "일", date: 29 },
];
