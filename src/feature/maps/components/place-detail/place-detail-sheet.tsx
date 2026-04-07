"use client";

import type { Place } from "@/src/types";
import { PlaceAddButton } from "../place-add";
import { OpeningHoursSection } from "./opening-hours-section";
import { PlaceHeader } from "./place-header";
import { PlacePhoto } from "./place-photo";
import { RatingPrice } from "./rating-price";

export function PlaceDetailSheet({ place, onClose }: { place: Place; onClose: () => void }) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-xl shadow-xl border border-outline overflow-hidden">
      {place.photoUrl && <PlacePhoto url={place.photoUrl} key={place.photoUrl} />}

      <div className="p-4">
        <PlaceHeader
          name={place.name}
          address={place.address}
          category={place.category}
          onClose={onClose}
        />

        <RatingPrice
          rating={place.rating}
          reviewCount={place.reviewCount}
          priceLevel={place.priceLevel}
        />

        {place.openingHours && place.openingHours.length > 0 && (
          <OpeningHoursSection hours={place.openingHours} />
        )}

        <div className="flex gap-2">
          <PlaceAddButton place={place} />
        </div>
      </div>
    </div>
  );
}
