import { create } from "zustand";
import { HOURS } from "../constants";
import { MOCK_CALENDAR_BLOCKS, MOCK_DAYS, MOCK_PLACES } from "../mocks";
import { type CalendarBlock, type Day, DEFAULT_BLOCK_DURATION, type Place } from "../types";

const GRID_START_HOUR = HOURS[0];
const GRID_END_HOUR = HOURS[HOURS.length - 1];

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

interface CalendarBlockStore {
  days: Day[];
  bucketBlocks: Place[];
  calendarBlocks: CalendarBlock[];
  gridRef: HTMLDivElement | null;
  setDays: (days: Day[]) => void;
  setGridRef: (ref: HTMLDivElement | null) => void;
  moveToCalendar: (place: Place, dayIndex: number, startHour: number) => void;
  moveInCalendar: (blockId: string, dayIndex: number, startHour: number) => void;
  moveToBucket: (block: CalendarBlock) => void;
  resizeBlock: (blockId: string, startHour: number, endHour: number) => void;
}

const useCalendarBlockStore = create<CalendarBlockStore>((set) => ({
  days: useMockData ? MOCK_DAYS : [],
  bucketBlocks: useMockData ? MOCK_PLACES : [],
  calendarBlocks: useMockData ? MOCK_CALENDAR_BLOCKS : [],
  gridRef: null,
  setDays: (days) => set({ days }),
  setGridRef: (ref) => set({ gridRef: ref }),
  moveToCalendar: (place, dayIndex, startHour) =>
    set((state) => {
      const clampedStart = Math.max(
        GRID_START_HOUR,
        Math.min(startHour, GRID_END_HOUR - DEFAULT_BLOCK_DURATION),
      );
      return {
        bucketBlocks: state.bucketBlocks.filter((b) => b.id !== place.id),
        calendarBlocks: [
          ...state.calendarBlocks,
          {
            ...place,
            dayIndex,
            startHour: clampedStart,
            endHour: clampedStart + DEFAULT_BLOCK_DURATION,
          },
        ],
      };
    }),
  moveInCalendar: (blockId, dayIndex, startHour) =>
    set((state) => ({
      calendarBlocks: state.calendarBlocks.map((block) => {
        if (block.id !== blockId) {
          return block;
        }
        const duration = block.endHour - block.startHour;
        const clampedStart = Math.max(
          GRID_START_HOUR,
          Math.min(startHour, GRID_END_HOUR - duration),
        );
        return {
          ...block,
          dayIndex,
          startHour: clampedStart,
          endHour: clampedStart + duration,
        };
      }),
    })),
  moveToBucket: (block) =>
    set((state) => ({
      calendarBlocks: state.calendarBlocks.filter((b) => b.id !== block.id),
      bucketBlocks: [...state.bucketBlocks, { id: block.id, title: block.title }],
    })),
  resizeBlock: (blockId, startHour, endHour) =>
    set((state) => ({
      calendarBlocks: state.calendarBlocks.map((block) =>
        block.id === blockId ? { ...block, startHour, endHour } : block,
      ),
    })),
}));

export default useCalendarBlockStore;
