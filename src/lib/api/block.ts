import { api } from "./api-client";
import type { ErrorMessages } from "./api-error";

export const blockApi = {
  list: (roomId: string) => api.get<BlockListResponseApi>(`/api/rooms/${roomId}/blocks`),
  get: (roomId: string, blockId: string) =>
    api.get<BlockResponseApi>(`/api/rooms/${roomId}/blocks/${blockId}`),
  create: (roomId: string, data: CreateBlockRequestApi) =>
    api.post<BlockResponseApi>(`/api/rooms/${roomId}/blocks`, data),
};

export const BLOCK_TOAST_MESSAGES: Record<string, ErrorMessages> = {
  list: {
    403: "방 접근 권한이 없습니다",
    404: "방을 찾을 수 없습니다",
    default: "블록 목록을 불러오지 못했습니다",
  },
  get: {
    403: "방 접근 권한이 없습니다",
    404: "블록을 찾을 수 없습니다",
    default: "블록 정보를 불러오지 못했습니다",
  },
  create: {
    403: "방 접근 권한이 없습니다",
    404: "방 또는 장소를 찾을 수 없습니다",
    502: "장소 정보를 불러오는 데 실패했습니다",
    default: "블록 생성을 실패했습니다",
  },
} as const;

export interface CreateBlockRequestApi {
  status: "bucket" | "scheduled";
  googlePlaceId: string;
  name: string;
  startTime?: string;
  endTime?: string;
}

interface PositionApi {
  lat: number;
  lng: number;
}

interface OpeningHourApi {
  day: number;
  open: string;
  close: string | null;
}

interface BlockPlaceResponseApi {
  googlePlaceId: string;
  placeName: string;
  position: PositionApi;
  category: string | null;
  formattedAddress: string;
  rating: number | null;
  reviewCount: number | null;
  openingHours: OpeningHourApi[];
  priceLevel: number | null;
  photoUrl: string | null;
}

interface BlockListPlaceApi {
  placeId: string;
  placeName: string;
  lat: number;
  lng: number;
}

export interface BlockListItemApi {
  id: string;
  roomId: string;
  status: "bucket" | "scheduled";
  place: BlockListPlaceApi;
  name: string;
  startTime: string | null;
  endTime: string | null;
  timezoneId: string | null;
  startUtcOffsetMinutes: number | null;
  endUtcOffsetMinutes: number | null;
  addedBy: string;
  addedAt: string;
  reactions: { memberId: string; type: string }[];
}

export interface BlockListResponseApi {
  blocks: BlockListItemApi[];
}

export interface BlockResponseApi {
  id: string;
  roomId: string;
  status: "bucket" | "scheduled";
  place: BlockPlaceResponseApi;
  name: string;
  startTime: string | null;
  endTime: string | null;
  timezoneId: string | null;
  startUtcOffsetMinutes: number | null;
  endUtcOffsetMinutes: number | null;
  cost: number | null;
  memo: string | null;
  addedBy: string;
  addedAt: string;
  reactions: { memberId: string; type: string }[];
  todos: { id: string; text: string; completed: boolean }[];
}
