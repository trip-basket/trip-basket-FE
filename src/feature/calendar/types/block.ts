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
    base: "var(--block-red-base)",
    tint: "var(--block-red-tint)",
    accent: "var(--block-red-accent)",
  },
  {
    base: "var(--block-orange-base)",
    tint: "var(--block-orange-tint)",
    accent: "var(--block-orange-accent)",
  },
  {
    base: "var(--block-yellow-base)",
    tint: "var(--block-yellow-tint)",
    accent: "var(--block-yellow-accent)",
  },
  {
    base: "var(--block-mint-base)",
    tint: "var(--block-mint-tint)",
    accent: "var(--block-mint-accent)",
  },
  {
    base: "var(--block-teal-base)",
    tint: "var(--block-teal-tint)",
    accent: "var(--block-teal-accent)",
  },
  {
    base: "var(--block-lavender-base)",
    tint: "var(--block-lavender-tint)",
    accent: "var(--block-lavender-accent)",
  },
  {
    base: "var(--block-grape-base)",
    tint: "var(--block-grape-tint)",
    accent: "var(--block-grape-accent)",
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
