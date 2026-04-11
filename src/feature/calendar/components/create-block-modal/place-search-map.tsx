"use client";

import { useMutation } from "@tanstack/react-query";
import {
  APILoadingStatus,
  APIProvider,
  Map as GoogleMap,
  type MapMouseEvent,
  Marker,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useCallback, useRef, useState } from "react";
import { Text } from "@/src/components/ui";
import { usePlaceAutocomplete } from "@/src/feature/maps/hooks/use-place-autocomplete";
import { getErrorMessage, PLACE_TOAST_MESSAGES, placeApi } from "@/src/lib/api";
import { toast } from "@/src/lib/toast";
import type { Place } from "@/src/types";
import { toPlaceCategory } from "@/src/types";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

interface PlaceSearchMapProps {
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
}

export function PlaceSearchMap({ selectedPlace, onPlaceSelect }: PlaceSearchMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-inset border border-outline h-[360px]">
        <Text variant="small" color="soft">
          지도를 불러올 수 없습니다
        </Text>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <PlaceSearchMapInner selectedPlace={selectedPlace} onPlaceSelect={onPlaceSelect} />
    </APIProvider>
  );
}

function PlaceSearchMapInner({ selectedPlace, onPlaceSelect }: PlaceSearchMapProps) {
  const status = useApiLoadingStatus();
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(DEFAULT_CENTER);

  const placeDetailMutation = useMutation({
    mutationFn: (data: { googlePlaceId: string }) => placeApi.get(data.googlePlaceId),
    onError: (error) => toast.error(getErrorMessage(error, PLACE_TOAST_MESSAGES.get)),
  });

  const selectPlace = useCallback(
    async (gPlace: google.maps.places.Place) => {
      await gPlace.fetchFields({ fields: ["id"] });
      if (!gPlace.id || !map) {
        return;
      }

      const placeData = await placeDetailMutation.mutateAsync({ googlePlaceId: gPlace.id });
      const newPlace: Place = {
        ...placeData,
        category: toPlaceCategory(placeData.category),
      };

      setPosition(newPlace.position);
      map.panTo(newPlace.position);
      onPlaceSelect(newPlace);
    },
    [map, placeDetailMutation, onPlaceSelect],
  );

  const handleMapClick = useCallback(
    async (e: MapMouseEvent) => {
      const clickedPlaceId = e.detail.placeId;
      if (!clickedPlaceId || !placesLib) {
        return;
      }

      e.stop();
      const gPlace = new placesLib.Place({ id: clickedPlaceId });
      try {
        await selectPlace(gPlace);
      } catch (_) {
        // place fetch 실패 시 무시 (toast에서 처리됨)
      }
    },
    [placesLib, selectPlace],
  );

  usePlaceAutocomplete(autocompleteContainerRef, placesLib, selectPlace);

  if (status === APILoadingStatus.LOADING) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-inset border border-outline h-[400px]">
        <Text variant="small" color="soft">
          로딩 중...
        </Text>
      </div>
    );
  }

  const markerPosition = selectedPlace?.position ?? position;

  return (
    <div className="flex flex-col gap-2">
      {/* 선택된 장소 표시 */}
      <div className="flex items-center gap-2 h-8 px-1">
        {selectedPlace ? (
          <>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="text-action shrink-0"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="currentColor"
              />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
            <Text variant="small" weight="medium">
              {selectedPlace.placeName}
            </Text>
            {selectedPlace.formattedAddress && (
              <Text variant="caption" color="soft" className="truncate">
                {selectedPlace.formattedAddress}
              </Text>
            )}
          </>
        ) : (
          <Text variant="small" color="soft">
            지도에서 장소를 클릭하거나 검색하세요
          </Text>
        )}
      </div>

      {/* 지도 */}
      <div className="relative rounded-lg overflow-hidden border border-outline h-[400px]">
        <div ref={autocompleteContainerRef} className="absolute top-3 left-3 right-3 z-10 h-10" />
        <GoogleMap
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={13}
          onClick={handleMapClick}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          zoomControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          {selectedPlace && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>
    </div>
  );
}
