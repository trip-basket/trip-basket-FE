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

export interface OpeningHour {
  day: number;
  open: string;
  close: string | null;
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
  placeDetail?: PlaceDetail;
}

export interface CalendarBlock extends Place {
  dayIndex: number;
  startHour: number;
  endHour: number;
  reactions?: Reaction[];
  memo?: string;
}

export const DEFAULT_BLOCK_DURATION = 1;
