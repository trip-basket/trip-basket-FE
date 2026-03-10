import { beforeEach, describe, expect, it } from "vitest";
import type { Place } from "../../types";
import useCalendarStore from "../use-calendar-store";

function resetStore() {
  useCalendarStore.setState(useCalendarStore.getInitialState());
}

const mockPlace: Place = {
  id: "p1",
  title: "테스트 장소",
  colorIndex: 0,
  category: "sightseeing",
  cost: 10000,
};

const mockPlace2: Place = {
  id: "p2",
  title: "테스트 장소 2",
  colorIndex: 1,
  category: "food",
  cost: 20000,
};

describe("useCalendarStore", () => {
  beforeEach(() => {
    resetStore();
  });

  // ─── 날짜 설정 ───

  describe("setDates", () => {
    it("시작일/종료일로 tripDays 배열을 생성한다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");

      const { tripDays } = useCalendarStore.getState();
      expect(tripDays).toHaveLength(3);
      expect(tripDays[0].date).toBe("2026-02-16");
      expect(tripDays[1].date).toBe("2026-02-17");
      expect(tripDays[2].date).toBe("2026-02-18");
    });

    it("각 TripDay에 dayOfWeek과 dateNum이 포함된다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-17");

      const { tripDays } = useCalendarStore.getState();
      // 2026-02-16 = 월요일
      expect(tripDays[0].dayOfWeek).toBe("월");
      expect(tripDays[0].dateNum).toBe(16);
      expect(tripDays[1].dayOfWeek).toBe("화");
      expect(tripDays[1].dateNum).toBe(17);
    });

    it("각 TripDay의 blocks는 빈 배열로 초기화된다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");

      const { tripDays } = useCalendarStore.getState();
      for (const day of tripDays) {
        expect(day.blocks).toEqual([]);
      }
    });

    it("하루짜리 여행도 처리한다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-03-01", "2026-03-01");

      const { tripDays } = useCalendarStore.getState();
      expect(tripDays).toHaveLength(1);
      expect(tripDays[0].date).toBe("2026-03-01");
    });
  });

  // ─── 블록 → 캘린더 배치 ───

  describe("moveToCalendar", () => {
    it("bucket에서 블록을 제거하고 지정된 날짜에 블록을 추가한다", () => {
      useCalendarStore.setState({ bucketBlocks: [mockPlace] });
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");

      const { moveToCalendar } = useCalendarStore.getState();
      moveToCalendar(mockPlace, 0, 9);

      const { tripDays, bucketBlocks } = useCalendarStore.getState();
      expect(bucketBlocks).toHaveLength(0);
      expect(tripDays[0].blocks).toHaveLength(1);
      expect(tripDays[0].blocks[0].id).toBe("p1");
      expect(tripDays[0].blocks[0].startHour).toBe(9);
      expect(tripDays[0].blocks[0].endHour).toBe(10); // DEFAULT_BLOCK_DURATION = 1
    });

    it("다른 날짜의 블록에 영향을 주지 않는다", () => {
      useCalendarStore.setState({ bucketBlocks: [mockPlace] });
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");

      const { moveToCalendar } = useCalendarStore.getState();
      moveToCalendar(mockPlace, 1, 14);

      const { tripDays } = useCalendarStore.getState();
      expect(tripDays[0].blocks).toHaveLength(0);
      expect(tripDays[1].blocks).toHaveLength(1);
      expect(tripDays[2].blocks).toHaveLength(0);
    });
  });

  // ─── 캘린더 내 블록 이동 ───

  describe("moveInCalendar", () => {
    it("같은 날짜 내에서 시간을 변경한다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");
      // dayIndex 0에 블록 배치
      useCalendarStore.setState((state) => ({
        tripDays: state.tripDays.map((day, i) =>
          i === 0
            ? {
                ...day,
                blocks: [{ ...mockPlace, startHour: 9, endHour: 11 }],
              }
            : day,
        ),
      }));

      const { moveInCalendar } = useCalendarStore.getState();
      moveInCalendar("p1", 0, 14);

      const { tripDays } = useCalendarStore.getState();
      expect(tripDays[0].blocks).toHaveLength(1);
      expect(tripDays[0].blocks[0].startHour).toBe(14);
      expect(tripDays[0].blocks[0].endHour).toBe(16); // duration 2시간 유지
    });

    it("다른 날짜로 블록을 이동한다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");
      useCalendarStore.setState((state) => ({
        tripDays: state.tripDays.map((day, i) =>
          i === 0
            ? {
                ...day,
                blocks: [{ ...mockPlace, startHour: 9, endHour: 11 }],
              }
            : day,
        ),
      }));

      const { moveInCalendar } = useCalendarStore.getState();
      moveInCalendar("p1", 2, 10);

      const { tripDays } = useCalendarStore.getState();
      expect(tripDays[0].blocks).toHaveLength(0);
      expect(tripDays[2].blocks).toHaveLength(1);
      expect(tripDays[2].blocks[0].startHour).toBe(10);
      expect(tripDays[2].blocks[0].endHour).toBe(12);
    });
  });

  // ─── 블록 리사이즈 ───

  describe("resizeBlock", () => {
    it("블록의 시작/종료 시간을 변경한다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");
      useCalendarStore.setState((state) => ({
        tripDays: state.tripDays.map((day, i) =>
          i === 0
            ? {
                ...day,
                blocks: [{ ...mockPlace, startHour: 9, endHour: 11 }],
              }
            : day,
        ),
      }));

      const { resizeBlock } = useCalendarStore.getState();
      resizeBlock("p1", 8, 13);

      const { tripDays } = useCalendarStore.getState();
      expect(tripDays[0].blocks[0].startHour).toBe(8);
      expect(tripDays[0].blocks[0].endHour).toBe(13);
    });
  });

  // ─── 헬퍼: 블록 검색 ───

  describe("findBlock", () => {
    it("blockId로 블록과 dayIndex를 찾는다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");
      useCalendarStore.setState((state) => ({
        tripDays: state.tripDays.map((day, i) =>
          i === 1
            ? {
                ...day,
                blocks: [{ ...mockPlace, startHour: 9, endHour: 11 }],
              }
            : day,
        ),
      }));

      const { findBlock } = useCalendarStore.getState();
      const result = findBlock("p1");

      expect(result).not.toBeNull();
      expect(result?.block.id).toBe("p1");
      expect(result?.dayIndex).toBe(1);
    });

    it("존재하지 않는 blockId는 null을 반환한다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");

      const { findBlock } = useCalendarStore.getState();
      expect(findBlock("nonexistent")).toBeNull();
    });
  });

  // ─── 복수 블록 ───

  describe("여러 블록 시나리오", () => {
    it("같은 날짜에 여러 블록을 배치할 수 있다", () => {
      useCalendarStore.setState({
        bucketBlocks: [mockPlace, mockPlace2],
      });
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");

      const store1 = useCalendarStore.getState();
      store1.moveToCalendar(mockPlace, 0, 9);
      const store2 = useCalendarStore.getState();
      store2.moveToCalendar(mockPlace2, 0, 14);

      const { tripDays, bucketBlocks } = useCalendarStore.getState();
      expect(bucketBlocks).toHaveLength(0);
      expect(tripDays[0].blocks).toHaveLength(2);
    });

    it("한 날짜의 블록을 이동해도 다른 날짜/블록에 영향 없다", () => {
      const { setDates } = useCalendarStore.getState();
      setDates("2026-02-16", "2026-02-18");
      useCalendarStore.setState((state) => ({
        tripDays: state.tripDays.map((day, i) => {
          if (i === 0) {
            return {
              ...day,
              blocks: [
                { ...mockPlace, startHour: 9, endHour: 11 },
                { ...mockPlace2, startHour: 14, endHour: 16 },
              ],
            };
          }
          return day;
        }),
      }));

      const { moveInCalendar } = useCalendarStore.getState();
      moveInCalendar("p1", 2, 10);

      const { tripDays } = useCalendarStore.getState();
      // mockPlace2는 day 0에 그대로
      expect(tripDays[0].blocks).toHaveLength(1);
      expect(tripDays[0].blocks[0].id).toBe("p2");
      // mockPlace는 day 2로 이동
      expect(tripDays[2].blocks).toHaveLength(1);
      expect(tripDays[2].blocks[0].id).toBe("p1");
    });
  });
});
