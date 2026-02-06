import type { Place } from "../types";

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
  { dayOfWeek: "월", date: 23 },
  { dayOfWeek: "화", date: 24 },
  { dayOfWeek: "수", date: 25 },
  { dayOfWeek: "목", date: 26 },
  { dayOfWeek: "금", date: 27 },
  { dayOfWeek: "토", date: 28 },
  { dayOfWeek: "일", date: 29 },
];

export const MOCK_PLACES: Place[] = [
  { id: "1", title: "히드로 공항" },
  { id: "2", title: "대영박물관" },
  { id: "3", title: "런던아이" },
  { id: "4", title: "타워브릿지" },
];
