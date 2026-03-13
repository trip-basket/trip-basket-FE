import { create } from "zustand";
import { MOCK_CALENDAR_BLOCKS, MOCK_PLACES } from "../mocks";
import { type CalendarBlock, DEFAULT_BLOCK_DURATION, type Place, type TripDay } from "../types";
import { formatLocalDate } from "../utils";

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

const DAY_OF_WEEK_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function generateTripDays(startDate: string, endDate: string): TripDay[] {
  const days: TripDay[] = [];
  const current = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  while (current <= end) {
    days.push({
      date: formatLocalDate(current),
      dayOfWeek: DAY_OF_WEEK_LABELS[current.getDay()],
      dateNum: current.getDate(),
      blocks: [],
    });
    current.setDate(current.getDate() + 1);
  }

  return days;
}

function buildMockTripDays(): TripDay[] {
  const days = generateTripDays("2026-02-21", "2026-03-01");
  for (const block of MOCK_CALENDAR_BLOCKS) {
    const { dayIndex, ...rest } = block;
    if (days[dayIndex]) {
      days[dayIndex].blocks.push(rest);
    }
  }
  return days;
}

interface CalendarStore {
  tripDays: TripDay[];
  bucketBlocks: Place[];
  gridRef: HTMLDivElement | null;
  selectedBlockId: string | null;
  isBucketDragging: boolean;
  setDates: (startDate: string, endDate: string) => void;
  setGridRef: (ref: HTMLDivElement | null) => void;
  setSelectedBlockId: (id: string | null) => void;
  setIsBucketDragging: (v: boolean) => void;
  moveToCalendar: (place: Place, dayIndex: number, startHour: number) => void;
  moveInCalendar: (blockId: string, dayIndex: number, startHour: number) => void;
  resizeBlock: (blockId: string, startHour: number, endHour: number) => void;
  findBlock: (blockId: string) => { block: CalendarBlock; dayIndex: number } | null;
  addDayBefore: () => void;
  addDayAfter: () => void;
  updateDateRange: (startDate: string, endDate: string) => void;
}

const useCalendarStore = create<CalendarStore>((set, get) => ({
  tripDays: useMockData ? buildMockTripDays() : [],
  bucketBlocks: useMockData ? MOCK_PLACES : [],
  gridRef: null,
  selectedBlockId: null,
  isBucketDragging: false,

  setDates: (startDate, endDate) => set({ tripDays: generateTripDays(startDate, endDate) }),

  setGridRef: (ref) => set({ gridRef: ref }),
  setSelectedBlockId: (id) => set({ selectedBlockId: id }),
  setIsBucketDragging: (v) => set({ isBucketDragging: v }),

  moveToCalendar: (place, dayIndex, startHour) =>
    set((state) => ({
      bucketBlocks: state.bucketBlocks.filter((b) => b.id !== place.id),
      tripDays: state.tripDays.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              blocks: [
                ...day.blocks,
                {
                  ...place,
                  startHour,
                  endHour: startHour + DEFAULT_BLOCK_DURATION,
                },
              ],
            }
          : day,
      ),
    })),

  moveInCalendar: (blockId, toDayIndex, startHour) => {
    const found = get().findBlock(blockId);
    if (!found) {
      return;
    }

    const { block: movingBlock } = found;
    const duration = movingBlock.endHour - movingBlock.startHour;
    const movedBlock: CalendarBlock = {
      ...movingBlock,
      startHour,
      endHour: startHour + duration,
    };

    set((state) => ({
      tripDays: state.tripDays.map((day, i) => {
        const filtered = day.blocks.filter((b) => b.id !== blockId);
        if (i === toDayIndex) {
          return { ...day, blocks: [...filtered, movedBlock] };
        }
        return filtered.length !== day.blocks.length ? { ...day, blocks: filtered } : day;
      }),
    }));
  },

  resizeBlock: (blockId, startHour, endHour) =>
    set((state) => ({
      tripDays: state.tripDays.map((day) => ({
        ...day,
        blocks: day.blocks.map((block) =>
          block.id === blockId ? { ...block, startHour, endHour } : block,
        ),
      })),
    })),

  findBlock: (blockId) => {
    const { tripDays } = get();
    for (let i = 0; i < tripDays.length; i++) {
      const block = tripDays[i].blocks.find((b) => b.id === blockId);
      if (block) {
        return { block, dayIndex: i };
      }
    }
    return null;
  },

  addDayBefore: () => {
    const { tripDays } = get();
    if (tripDays.length === 0) {
      return;
    }
    const prev = new Date(`${tripDays[0].date}T00:00:00`);
    prev.setDate(prev.getDate() - 1);
    const newDay: TripDay = {
      date: formatLocalDate(prev),
      dayOfWeek: DAY_OF_WEEK_LABELS[prev.getDay()],
      dateNum: prev.getDate(),
      blocks: [],
    };
    set({ tripDays: [newDay, ...tripDays] });
  },

  addDayAfter: () => {
    const { tripDays } = get();
    if (tripDays.length === 0) {
      return;
    }
    const next = new Date(`${tripDays[tripDays.length - 1].date}T00:00:00`);
    next.setDate(next.getDate() + 1);
    const newDay: TripDay = {
      date: formatLocalDate(next),
      dayOfWeek: DAY_OF_WEEK_LABELS[next.getDay()],
      dateNum: next.getDate(),
      blocks: [],
    };
    set({ tripDays: [...tripDays, newDay] });
  },

  updateDateRange: (startDate, endDate) => {
    const { tripDays } = get();
    const newDays = generateTripDays(startDate, endDate);

    const blocksByDate = new Map<string, CalendarBlock[]>();
    for (const day of tripDays) {
      if (day.blocks.length > 0) {
        blocksByDate.set(day.date, day.blocks);
      }
    }

    const updatedDays = newDays.map((day) => ({
      ...day,
      blocks: blocksByDate.get(day.date) ?? [],
    }));

    set({ tripDays: updatedDays });
  },
}));

export default useCalendarStore;
