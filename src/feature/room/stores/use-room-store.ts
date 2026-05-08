import { create } from "zustand";
import { MOCK_ROOM } from "../mocks";
import type { Room } from "../types";

const useMockData =
  process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

interface RoomStore {
  room: Room | null;
  setRoom: (room: Room) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  room: useMockData ? MOCK_ROOM : null,
  setRoom: (room) => set({ room }),
}));

export default useRoomStore;
