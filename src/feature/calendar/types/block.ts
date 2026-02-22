export type BlockCategory =
  | "sightseeing"
  | "food"
  | "shopping"
  | "transport"
  | "accommodation"
  | "activity";

export const CATEGORY_COLORS: Record<BlockCategory, string> = {
  sightseeing: "#3B82F6",
  food: "#F59E0B",
  shopping: "#EC4899",
  transport: "#6366F1",
  accommodation: "#10B981",
  activity: "#F97316",
};

export const CATEGORY_LABELS: Record<BlockCategory, string> = {
  sightseeing: "관광",
  food: "음식",
  shopping: "쇼핑",
  transport: "교통",
  accommodation: "숙소",
  activity: "액티비티",
};

export interface PlaceDetail {
  placeId: string;
  placeName: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  openingHours?: string[];
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
