"use client";

import Image from "next/image";
import { Text } from "@/src/components/ui";
import type { Place, PlaceCategory } from "@/src/types";
import { PlaceAddButton } from "../place-add";
import { OpeningHoursSection } from "./opening-hours-section";

const CATEGORY_LABEL: Record<PlaceCategory, string> = {
  sightseeing: "관광",
  food: "음식",
  shopping: "쇼핑",
  transport: "교통",
  accommodation: "숙소",
  activity: "액티비티",
};

const PRICE_LABEL: Record<number, string> = {
  1: "₩",
  2: "₩₩",
  3: "₩₩₩",
  4: "₩₩₩₩",
};

export function PlaceDetailSheet({ place, onClose }: { place: Place; onClose: () => void }) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Photo */}
      {place.photoUrl && (
        <div className="relative w-full h-32 bg-gray-100">
          <Image
            src={place.photoUrl}
            alt={place.placeName ?? "장소 사진"}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Text variant="h3" className="truncate">
                {place.placeName}
              </Text>
              {place.category && (
                <span className="shrink-0 text-[11px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {CATEGORY_LABEL[place.category]}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{place.formattedAddress}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center h-7 w-7 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-150 shrink-0 ml-2"
            aria-label="닫기"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Rating & Price */}
        {(place.rating !== undefined || place.priceLevel !== undefined) && (
          <div className="flex items-center gap-2 mb-3">
            {place.rating !== undefined && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-sm">&#9733;</span>
                <span className="text-sm text-gray-700 font-medium">{place.rating}</span>
                {place.reviewCount !== undefined && (
                  <span className="text-xs text-gray-400">
                    ({place.reviewCount.toLocaleString()})
                  </span>
                )}
              </div>
            )}
            {place.priceLevel !== undefined && PRICE_LABEL[place.priceLevel] && (
              <>
                {place.rating !== undefined && <span className="text-gray-300 text-xs">·</span>}
                <span className="text-xs text-gray-500 font-medium">
                  {PRICE_LABEL[place.priceLevel]}
                </span>
              </>
            )}
          </div>
        )}

        {/* Opening hours */}
        {place.openingHours && place.openingHours.length > 0 && (
          <OpeningHoursSection hours={place.openingHours} />
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <PlaceAddButton place={place} />
        </div>
      </div>
    </div>
  );
}
