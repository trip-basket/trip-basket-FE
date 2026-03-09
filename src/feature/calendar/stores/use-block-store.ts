import { create } from "zustand";
import { MOCK_CALENDAR_BLOCKS, MOCK_PLACES } from "../mocks";
import { type CalendarBlock, DEFAULT_BLOCK_DURATION, type Place } from "../types";

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

interface BlockStore {
  bucketBlocks: Place[];
  calendarBlocks: CalendarBlock[];
  gridRef: HTMLDivElement | null;
  selectedBlockId: string | null;
  isBucketDragging: boolean;
  setGridRef: (ref: HTMLDivElement | null) => void;
  setSelectedBlockId: (id: string | null) => void;
  setIsBucketDragging: (v: boolean) => void;
  moveToCalendar: (place: Place, dayIndex: number, startHour: number) => void;
  moveInCalendar: (blockId: string, dayIndex: number, startHour: number) => void;
  moveToBucket: (block: CalendarBlock) => void;
  resizeBlock: (blockId: string, startHour: number, endHour: number) => void;
}

const useBlockStore = create<BlockStore>((set) => ({
  bucketBlocks: useMockData ? MOCK_PLACES : [],
  calendarBlocks: useMockData ? MOCK_CALENDAR_BLOCKS : [],
  gridRef: null,
  selectedBlockId: null,
  isBucketDragging: false,
  setGridRef: (ref) => set({ gridRef: ref }),
  setSelectedBlockId: (id) => set({ selectedBlockId: id }),
  setIsBucketDragging: (v) => set({ isBucketDragging: v }),
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
  moveInCalendar: (blockId, dayIndex, startHour) =>
    set((state) => ({
      calendarBlocks: state.calendarBlocks.map((block) => {
        if (block.id !== blockId) {
          return block;
        }
        const duration = block.endHour - block.startHour;
        return {
          ...block,
          dayIndex,
          startHour,
          endHour: startHour + duration,
        };
      }),
    })),
  moveToBucket: (block) =>
    set((state) => {
      const { dayIndex, startHour, endHour, reactions, memo, ...place } = block;
      return {
        calendarBlocks: state.calendarBlocks.filter((b) => b.id !== block.id),
        bucketBlocks: [...state.bucketBlocks, place],
      };
    }),
  resizeBlock: (blockId, startHour, endHour) =>
    set((state) => ({
      calendarBlocks: state.calendarBlocks.map((block) =>
        block.id === blockId ? { ...block, startHour, endHour } : block,
      ),
    })),
}));

export default useBlockStore;
