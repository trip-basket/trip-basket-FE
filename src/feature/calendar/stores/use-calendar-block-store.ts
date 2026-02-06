import { create } from "zustand";
import { MOCK_PLACES } from "../constants";
import { type CalendarBlock, DEFAULT_BLOCK_DURATION, type Place } from "../types";

interface CalendarBlockStore {
  bucketBlocks: Place[];
  calendarBlocks: CalendarBlock[];
  gridRef: HTMLDivElement | null;
  setGridRef: (ref: HTMLDivElement | null) => void;
  moveToCalendar: (place: Place, dayIndex: number, startHour: number) => void;
  moveToBucket: (block: CalendarBlock) => void;
}

const useCalendarBlockStore = create<CalendarBlockStore>((set) => ({
  bucketBlocks: MOCK_PLACES,
  calendarBlocks: [],
  gridRef: null,
  setGridRef: (ref) => set({ gridRef: ref }),
  moveToCalendar: (place, dayIndex, startHour) =>
    set((state) => ({
      bucketBlocks: state.bucketBlocks.filter((b) => b.id !== place.id),
      calendarBlocks: [
        ...state.calendarBlocks,
        {
          ...place,
          dayIndex,
          startHour,
          endHour: startHour + DEFAULT_BLOCK_DURATION,
        },
      ],
    })),
  moveToBucket: (block) =>
    set((state) => ({
      calendarBlocks: state.calendarBlocks.filter((b) => b.id !== block.id),
      bucketBlocks: [...state.bucketBlocks, { id: block.id, title: block.title }],
    })),
}));

export default useCalendarBlockStore;
