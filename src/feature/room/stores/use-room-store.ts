import { create } from "zustand";
import type { Day } from "@/src/feature/calendar/types";
import { MOCK_DAYS, MOCK_MEMBERS, MOCK_ROOM } from "../mocks";
import type { Member, Room } from "../types";

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

interface RoomStore {
  room: Room | null;
  members: Member[];
  days: Day[];
  setRoom: (room: Room) => void;
  setMembers: (members: Member[]) => void;
  setDays: (days: Day[]) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  room: useMockData ? MOCK_ROOM : null,
  members: useMockData ? MOCK_MEMBERS : [],
  days: useMockData ? MOCK_DAYS : [],
  setRoom: (room) => set({ room }),
  setMembers: (members) => set({ members }),
  setDays: (days) => set({ days }),
}));

export default useRoomStore;
