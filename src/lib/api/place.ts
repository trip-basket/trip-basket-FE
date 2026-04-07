import type { OpeningHour, Position } from "@/src/types";
import { api } from "./api-client";
import type { ErrorMessages } from "./api-error";

export const placeApi = {
  get: (placeId: string) => api.get<PlaceDetailResponseApi>(`/api/places/${placeId}`),
};

export const PLACE_TOAST_MESSAGES: Record<string, ErrorMessages> = {
  get: {
    404: "장소 정보를 찾을 수 없습니다",
    502: "Google Places 에 오류가 발생했습니다",
    default: "장소 정보를 불러오는데 실패했습니다",
  },
} as const;

export interface PlaceDetailResponseApi {
  googlePlaceId: string;
  placeName: string;
  formattedAddress: string;
  position: Position;
  openingHours: OpeningHour[];
  priceLevel: number;
  rating: number;
  reviewCount: number;
  photoUrl: string;
  category: string;
}
