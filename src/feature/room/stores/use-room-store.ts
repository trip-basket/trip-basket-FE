import { create } from "zustand";
import { MOCK_MEMBERS, MOCK_ROOM } from "../mocks";
import type { Member, Room } from "../types";

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

interface RoomStore {
  room: Room | null;
  members: Member[];
  setRoom: (room: Room) => void;
  setMembers: (members: Member[]) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  room: useMockData ? MOCK_ROOM : null,
  members: useMockData ? MOCK_MEMBERS : [],
  setRoom: (room) => set({ room }),
  setMembers: (members) => set({ members }),
}));

export default useRoomStore;
