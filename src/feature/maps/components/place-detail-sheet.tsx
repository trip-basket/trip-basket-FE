"use client";

import { Button, Text } from "@/src/components/ui";
import type { PlaceDetail } from "@/src/feature/calendar/types";

export function PlaceDetailSheet({ place, onClose }: { place: PlaceDetail; onClose: () => void }) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <Text variant="h3" className="truncate">
              {place.placeName}
            </Text>
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

        {/* Rating */}
        {place.rating !== undefined && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-500 text-sm">&#9733;</span>
            <span className="text-sm text-gray-700 font-medium">{place.rating}</span>
            {place.reviewCount !== undefined && (
              <span className="text-xs text-gray-400">({place.reviewCount.toLocaleString()})</span>
            )}
          </div>
        )}

        {/* Opening hours (collapsed) */}
        {place.openingHours && place.openingHours.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500">
              {place.openingHours[0]}
              {place.openingHours.length > 1 && (
                <span className="text-gray-400"> 외 {place.openingHours.length - 1}일</span>
              )}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="solid" color="primary" size="sm" fullWidth>
            일정에 추가
          </Button>
          <Button variant="outline" color="neutral" size="sm" fullWidth>
            버킷에 추가
          </Button>
        </div>
      </div>
    </div>
  );
}
