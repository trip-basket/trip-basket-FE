import type { CalendarBlock, Day, Place } from "../types";

export const MOCK_DAYS: Day[] = [
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

export const MOCK_CALENDAR_BLOCKS: CalendarBlock[] = [
  // { id: "5", title: "버킹엄 궁전", dayIndex: 0, startHour: 9, endHour: 11 },
  // { id: "6", title: "웨스트민스터 사원", dayIndex: 0, startHour: 13, endHour: 15 },
  { id: "7", title: "빅벤", dayIndex: 1, startHour: 10, endHour: 11.5 },
  // { id: "8", title: "세인트 폴 대성당", dayIndex: 2, startHour: 14, endHour: 16 },
];
