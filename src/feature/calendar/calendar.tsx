"use client";

import { Text } from "@/src/components/ui";

const HOURS = Array.from({ length: 18 }, (_, i) => i + 7); // 7 ~ 24

const MOCK_DAYS = [
  { dayOfWeek: "월", date: 16 },
  { dayOfWeek: "화", date: 17 },
  { dayOfWeek: "수", date: 18 },
  { dayOfWeek: "목", date: 19 },
  { dayOfWeek: "금", date: 20 },
  { dayOfWeek: "토", date: 21 },
  { dayOfWeek: "일", date: 22 },
];

const MOCK_EVENTS = [
  {
    title: "히드로 공항 노숙",
    time: "09:40 – 10:30",
    dayIndex: 0,
    startHour: 7,
    duration: 3,
    id: 1,
  },
  {
    title: "히드로 공항 노숙",
    time: "09:40 – 10:30",
    dayIndex: 1,
    startHour: 7,
    duration: 3,
    id: 2,
  },
  {
    title: "히드로 공항 노숙",
    time: "09:40 – 10:30",
    dayIndex: 0,
    startHour: 9,
    duration: 2,
    id: 3,
  },
  { title: "대영박물관", time: "10:00 – 13:00", dayIndex: 3, startHour: 10, duration: 3, id: 4 },
  { title: "런던아이", time: "14:00 – 16:00", dayIndex: 4, startHour: 14, duration: 2, id: 5 },
  { title: "타워브릿지", time: "09:00 – 11:00", dayIndex: 5, startHour: 9, duration: 2, id: 6 },
];

const HOUR_HEIGHT = 72;
const TIME_COL_W = 56;
const DAY_COL_MIN_W = 180;

function formatHour(hour: number) {
  if (hour === 0 || hour === 24) {
    return "12 AM";
  }
  if (hour === 12) {
    return "12 PM";
  }
  if (hour < 12) {
    return `${hour} AM`;
  }
  return `${hour - 12} PM`;
}

export function Calendar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}) {
  const gridHeight = HOURS.length * HOUR_HEIGHT;
  const gridWidth = MOCK_DAYS.length * DAY_COL_MIN_W;

  return (
    <div className="flex flex-1 min-h-0 flex-row bg-canvas p-2 gap-2">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl gap-2">
        {/* ── 상단 헤더 ── */}
        <header className="flex items-center justify-between rounded-lg bg-surface px-6 py-4">
          <Text variant="h2">여행 이름</Text>
          <div className="flex items-center gap-4">
            <Text variant="body">26.01.15 – 26.02.13</Text>
            <div className="flex -space-x-1.5">
              {[1, 2, 3, 4, 5].map((id) => (
                <div key={id} className="h-6 w-6 rounded-full border-2 border-canvas bg-gray-300" />
              ))}
            </div>
          </div>
        </header>

        {/* ── 캘린더 (가로+세로 내부 스크롤) ── */}
        <div className="flex-1 min-h-0 min-w-0 overflow-auto rounded-xl bg-surface">
          <div className="flex" style={{ minWidth: TIME_COL_W + gridWidth }}>
            {/* ── 시간 라벨 (sticky left, 전체 높이) ── */}
            <div
              className="sticky left-0 z-40 shrink-0 bg-brand-100"
              style={{ width: TIME_COL_W, paddingTop: HOUR_HEIGHT }}
            >
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="flex items-start justify-center"
                  style={{ height: HOUR_HEIGHT }}
                >
                  <Text variant="caption">{formatHour(hour)}</Text>
                </div>
              ))}
            </div>

            {/* ── 메인 영역 ── */}
            <div className="flex-1">
              {/* ── 날짜 헤더 (sticky top) ── */}
              <div className="sticky top-0 z-20 flex bg-surface border-b border-grid-line">
                {MOCK_DAYS.map((day) => (
                  <div
                    key={day.date}
                    className="flex flex-1 flex-col items-center pb-3 pt-2"
                    style={{ minWidth: DAY_COL_MIN_W }}
                  >
                    <Text variant="body">{day.dayOfWeek}</Text>
                    <Text variant="h2">{day.date}</Text>
                  </div>
                ))}
              </div>

              {/* ── 타임 그리드 ── */}
              <div className="relative flex" style={{ height: gridHeight }}>
                {/* 가로 구분선 */}
                {HOURS.map((hour) => (
                  <div
                    key={`line-${hour}`}
                    className="pointer-events-none absolute inset-x-0 border-b border-grid-line"
                    style={{ top: (hour - 7) * HOUR_HEIGHT }}
                  />
                ))}

                {/* 날짜 컬럼 */}
                {MOCK_DAYS.map((day, dayIndex) => (
                  <div
                    key={day.date}
                    className="relative flex-1 border-l border-grid-line"
                    style={{ minWidth: DAY_COL_MIN_W, height: gridHeight }}
                  >
                    {MOCK_EVENTS.filter((e) => e.dayIndex === dayIndex).map((event) => (
                      <div
                        key={event.id}
                        className="absolute inset-x-0 left-2 cursor-pointer rounded-md rounded-tr-none bg-canvas p-2 shadow-sm transition-shadow hover:shadow-md"
                        style={{
                          top: (event.startHour - 7) * HOUR_HEIGHT,
                          height: event.duration * HOUR_HEIGHT - 10,
                        }}
                      >
                        <Text variant="body">{event.title}</Text>
                        <Text variant="small">{event.time}</Text>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
