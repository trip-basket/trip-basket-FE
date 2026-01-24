import { type MapMouseEvent, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import type { Position } from "../types";

export function usePlaceSelection() {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  const [position, setPosition] = useState<Position | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);

  const selectPlace = useCallback(
    async (place: google.maps.places.Place) => {
      await place.fetchFields({ fields: ["location", "id"] });

      if (!place.location || !place.id || !map) {
        return;
      }

      const newPos = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };

      setPosition(newPos);
      setPlaceId(place.id);
      map.panTo(newPos);
    },
    [map],
  );

  const handleMapClick = useCallback(
    async (e: MapMouseEvent) => {
      const clickedPlaceId = e.detail.placeId;
      if (!clickedPlaceId || !placesLib) {
        return;
      }

      e.stop();
      const place = new placesLib.Place({ id: clickedPlaceId });
      await selectPlace(place);
    },
    [placesLib, selectPlace],
  );

  return { position, placeId, placesLib, selectPlace, handleMapClick };
}
