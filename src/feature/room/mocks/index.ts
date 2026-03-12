import type { Member, Room } from "../types";

export const MOCK_ROOM: Room = {
  id: "room-1",
  name: "런던 여행 2026",
  currency: "\u20A9",
  budget: 3000000,
  inviteCode: "LONDON26",
};

export const MOCK_MEMBERS: Member[] = [
  { id: "m1", nickname: "태웅", role: "owner", isOnline: true },
  {
    id: "m2",
    nickname: "지민",
    profileImageUrl: "https://i.pravatar.cc/40?u=m2",
    role: "editor",
    isOnline: true,
  },
  {
    id: "m3",
    nickname: "수현",
    profileImageUrl: "https://i.pravatar.cc/40?u=m3",
    role: "editor",
    isOnline: false,
  },
  { id: "m4", nickname: "민준", role: "viewer", isOnline: false },
];
