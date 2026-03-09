export type BlockCategory =
  | "sightseeing"
  | "food"
  | "shopping"
  | "transport"
  | "accommodation"
  | "activity";

export interface BlockColor {
  base: string;
  tint: string;
  accent: string;
}

export const BLOCK_COLORS: BlockColor[] = [
  {
    base: "var(--block-sky-base)",
    tint: "var(--block-sky-tint)",
    accent: "var(--block-sky-accent)",
  },
  {
    base: "var(--block-indigo-base)",
    tint: "var(--block-indigo-tint)",
    accent: "var(--block-indigo-accent)",
  },
  {
    base: "var(--block-violet-base)",
    tint: "var(--block-violet-tint)",
    accent: "var(--block-violet-accent)",
  },
  {
    base: "var(--block-rose-base)",
    tint: "var(--block-rose-tint)",
    accent: "var(--block-rose-accent)",
  },
  {
    base: "var(--block-teal-base)",
    tint: "var(--block-teal-tint)",
    accent: "var(--block-teal-accent)",
  },
  {
    base: "var(--block-amber-base)",
    tint: "var(--block-amber-tint)",
    accent: "var(--block-amber-accent)",
  },
  {
    base: "var(--block-fuchsia-base)",
    tint: "var(--block-fuchsia-tint)",
    accent: "var(--block-fuchsia-accent)",
  },
  {
    base: "var(--block-slate-base)",
    tint: "var(--block-slate-tint)",
    accent: "var(--block-slate-accent)",
  },
];

export const CATEGORY_LABELS: Record<BlockCategory, string> = {
  sightseeing: "관광",
  food: "음식",
  shopping: "쇼핑",
  transport: "교통",
  accommodation: "숙소",
  activity: "액티비티",
};

export interface OpeningHour {
  day: number;
  open: string;
  close: string;
}

export interface PlaceDetail {
  placeId: string;
  placeName: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  openingHours?: OpeningHour[];
  priceLevel?: number;
  photoUrl?: string;
}

export interface Reaction {
  memberId: string;
}

export interface BlockTodo {
  id: string;
  blockId: string;
  text: string;
  completed: boolean;
}

export interface Place {
  id: string;
  title: string;
  colorIndex: number;
  category?: BlockCategory;
  cost?: number;
  addedBy?: string;
  lockedBy?: string;
  place?: PlaceDetail;
}

export interface CalendarBlock extends Place {
  dayIndex: number;
  startHour: number;
  endHour: number;
  reactions?: Reaction[];
  memo?: string;
}

export const DEFAULT_BLOCK_DURATION = 1;
