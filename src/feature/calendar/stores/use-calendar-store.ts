import { create } from "zustand";
import useRoomStore from "@/src/feature/room/stores/use-room-store";
import { BLOCK_TOAST_MESSAGES, blockApi, getErrorMessage } from "@/src/lib/api";
import type { BlockListItemApi } from "@/src/lib/api/block";
import { toast } from "@/src/lib/toast";
import type { Place } from "@/src/types";
import { MOCK_BUCKET_BLOCKS, MOCK_CALENDAR_BLOCKS } from "../mocks";
import {
  type BucketBlock,
  DEFAULT_BLOCK_DURATION,
  type ScheduledBlock,
  type TripDay,
} from "../types";
import {
  formatLocalDate,
  toBucketBlock,
  toBucketBlockFromList,
  toCreateBucketRequest,
  toCreateScheduledRequest,
  toScheduledBlock,
  toScheduledBlockFromList,
} from "../utils";

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
  bucketBlocks: BucketBlock[];
  gridRef: HTMLDivElement | null;
  selectedBlockId: string | null;
  isBucketDragging: boolean;
  isBlockDragging: boolean;
  isBlockResizing: boolean;
  setDates: (startDate: string, endDate: string) => void;
  setGridRef: (ref: HTMLDivElement | null) => void;
  setSelectedBlockId: (id: string | null) => void;
  setIsBucketDragging: (v: boolean) => void;
  setIsBlockDragging: (v: boolean) => void;
  setIsBlockResizing: (v: boolean) => void;
  moveToCalendar: (block: BucketBlock, date: string, startHour: number) => void;
  moveInCalendar: (blockId: string, date: string, startHour: number) => void;
  resizeBlock: (blockId: string, startHour: number, endHour: number) => void;
  findBlock: (blockId: string) => { block: ScheduledBlock; date: string } | null;
  addToBucket: (place: Place) => void;
  addToCalendar: (place: Place, date: string, startHour: number) => void;
  initBlocks: (blocks: BlockListItemApi[]) => void;
  addDayBefore: () => void;
  addDayAfter: () => void;
  updateDateRange: (startDate: string, endDate: string) => void;
}

const useCalendarStore = create<CalendarStore>((set, get) => ({
  tripDays: useMockData ? buildMockTripDays() : [],
  bucketBlocks: useMockData ? MOCK_BUCKET_BLOCKS : [],
  gridRef: null,
  selectedBlockId: null,
  isBucketDragging: false,
  isBlockDragging: false,
  isBlockResizing: false,

  setDates: (startDate, endDate) => {
    if (useMockData) {
      return;
    }
    set({ tripDays: generateTripDays(startDate, endDate) });
  },

  setGridRef: (ref) => set({ gridRef: ref }),
  setSelectedBlockId: (id) => set({ selectedBlockId: id }),
  setIsBucketDragging: (v) => set({ isBucketDragging: v }),
  setIsBlockDragging: (v) => set({ isBlockDragging: v }),
  setIsBlockResizing: (v) => set({ isBlockResizing: v }),

  moveToCalendar: (block, date, startHour) =>
    set((state) => ({
      bucketBlocks: state.bucketBlocks.filter((b) => b.id !== block.id),
      tripDays: state.tripDays.map((day) =>
        day.date === date
          ? {
              ...day,
              blocks: [
                ...day.blocks,
                {
                  ...block,
                  status: "scheduled" as const,
                  startHour,
                  endHour: startHour + DEFAULT_BLOCK_DURATION,
                },
              ],
            }
          : day,
      ),
    })),

  moveInCalendar: (blockId, toDate, startHour) => {
    const found = get().findBlock(blockId);
    if (!found) {
      return;
    }

    const { block: movingBlock } = found;
    const duration = movingBlock.endHour - movingBlock.startHour;
    const movedBlock: ScheduledBlock = {
      ...movingBlock,
      startHour,
      endHour: startHour + duration,
    };

    set((state) => ({
      tripDays: state.tripDays.map((day) => {
        const filtered = day.blocks.filter((b) => b.id !== blockId);
        if (day.date === toDate) {
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
    for (const day of tripDays) {
      const block = day.blocks.find((b) => b.id === blockId);
      if (block) {
        return { block, date: day.date };
      }
    }
    return null;
  },

  addToBucket: (place) => {
    const roomId = useRoomStore.getState().room?.id;
    if (!roomId) {
      return;
    }

    const tempBlock: BucketBlock = {
      id: crypto.randomUUID(),
      place,
      name: place.placeName,
      status: "bucket",
    };

    set({ bucketBlocks: [...get().bucketBlocks, tempBlock] });

    const request = toCreateBucketRequest(place, place.placeName);

    // 웹소켓을 도입하면 블록 CRUD는 보통 REST API로 요청 → 서버가 웹소켓으로 변경사항 브로드캐스트 방식이 일반적
    // 현재 tanstack 엔 재요청 로직이 존재
    // tanstack 을 사용하면 재요청까지 포함하면서 중복 생성 위험이 있기 때문에, mutation 을 사용하지 않고 스토어 안에서 API 직접 호출
    blockApi.create(roomId, request).then(
      (res) => {
        const realBlock = toBucketBlock(res);
        set({
          bucketBlocks: get().bucketBlocks.map((b) => (b.id === tempBlock.id ? realBlock : b)),
        });
      },
      (error) => {
        set({ bucketBlocks: get().bucketBlocks.filter((b) => b.id !== tempBlock.id) });
        toast.error(getErrorMessage(error, BLOCK_TOAST_MESSAGES.create));
      },
    );
  },

  initBlocks: (blocks) => {
    if (useMockData) {
      return;
    }

    const bucketBlocks: BucketBlock[] = [];
    const scheduledByDate = new Map<string, ScheduledBlock[]>();

    for (const item of blocks) {
      if (item.status === "bucket") {
        bucketBlocks.push(toBucketBlockFromList(item));
        continue;
      }

      const block = toScheduledBlockFromList(item);
      const date = item.startTime?.split("T")[0];
      if (date) {
        const existing = scheduledByDate.get(date) ?? [];
        existing.push(block);
        scheduledByDate.set(date, existing);
      }
    }

    set((state) => ({
      bucketBlocks,
      tripDays: state.tripDays.map((day) => ({
        ...day,
        blocks: scheduledByDate.get(day.date) ?? [],
      })),
    }));
  },

  addToCalendar: (place, date, startHour) => {
    const roomId = useRoomStore.getState().room?.id;
    if (!roomId) {
      return;
    }

    const tempBlock: ScheduledBlock = {
      id: crypto.randomUUID(),
      place,
      name: place.placeName,
      status: "scheduled",
      startHour,
      endHour: startHour + DEFAULT_BLOCK_DURATION,
    };

    set({
      tripDays: get().tripDays.map((day) =>
        day.date === date ? { ...day, blocks: [...day.blocks, tempBlock] } : day,
      ),
    });

    const request = toCreateScheduledRequest(place, place.placeName, date, startHour);
    blockApi.create(roomId, request).then(
      (res) => {
        const realBlock = toScheduledBlock(res);
        set({
          tripDays: get().tripDays.map((day) => ({
            ...day,
            blocks: day.blocks.map((b) => (b.id === tempBlock.id ? realBlock : b)),
          })),
        });
      },
      (error) => {
        set({
          tripDays: get().tripDays.map((day) => ({
            ...day,
            blocks: day.blocks.filter((b) => b.id !== tempBlock.id),
          })),
        });
        toast.error(getErrorMessage(error, BLOCK_TOAST_MESSAGES.create));
      },
    );
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

    const blocksByDate = new Map<string, ScheduledBlock[]>();
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
