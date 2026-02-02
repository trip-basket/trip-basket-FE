export const HOUR_HEIGHT = 72;
export const TIME_COL_W = 56;
export const DAY_COL_MIN_W = 180;

export const HOURS = Array.from({ length: 18 }, (_, i) => i + 7); // 7 ~ 24

export const MOCK_DAYS = [
  { dayOfWeek: "월", date: 16 },
  { dayOfWeek: "화", date: 17 },
  { dayOfWeek: "수", date: 18 },
  { dayOfWeek: "목", date: 19 },
  { dayOfWeek: "금", date: 20 },
  { dayOfWeek: "토", date: 21 },
  { dayOfWeek: "일", date: 22 },
];

export const MOCK_EVENTS = [
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
