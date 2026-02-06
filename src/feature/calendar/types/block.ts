/** 장소 기본 정보 (Bucket용) */
export interface Place {
  id: string;
  title: string;
}

/** 캘린더에 배치된 블록 (시간 정보 포함) */
export interface CalendarBlock extends Place {
  dayIndex: number;
  /** 시작 시각 (7 = 07:00, 9.5 = 09:30) */
  startHour: number;
  /** 종료 시각 (10 = 10:00, 11.5 = 11:30) */
  endHour: number;
}

/** 기본 블록 duration (시간 단위) */
export const DEFAULT_BLOCK_DURATION = 1;
