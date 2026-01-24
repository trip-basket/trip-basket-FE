import {
  APIProvider,
  Map as GoogleMap,
  type MapMouseEvent,
  Marker,
  useApiIsLoaded,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

const center: Position = { lat: 37.5665, lng: 126.978 };

type Position = {
  lat: number;
  lng: number;
};

function Maps() {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const isLoaded = useApiIsLoaded();

  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  const autocompleteInitialized = useRef(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  // ref 로 변경
  const positionRef = useRef<Position | null>(null);
  const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);

  console.log(currentPlaceId);

  mapRef.current = map;

  useEffect(() => {
    if (
      !placesLib ||
      !map ||
      !autocompleteContainerRef.current ||
      autocompleteInitialized.current
    ) {
      return;
    }

    autocompleteInitialized.current = true;

    // PlaceAutocompleteElement 를 @types/google.maps 에서 지원하지 않음
    // 따라서 document.createElement 로 인스턴스를 생성
    const autocomplete = document.createElement("gmp-place-autocomplete");

    autocomplete.style.color = "black";

    // 2. 배경색 및 기타 스타일 (기존 코드)
    autocomplete.classList.add("bg-white", "border", "border-gray-200", "rounded-md");
    autocomplete.setAttribute("placeholder", "장소를 입력하세요");

    autocompleteContainerRef.current.appendChild(autocomplete);

    // biome-ignore lint/suspicious/noExplicitAny: @types/google.maps 에서 PlaceSelectEvent 타입을 정의하지 않음
    const handlePlaceSelect = async (event: any) => {
      const place = event.placePrediction.toPlace();

      if (!place) {
        return;
      }

      await place.fetchFields({ fields: ["location", "id"] });

      if (place.location && place.id) {
        const newPos = {
          lat: place.location.lat(),
          lng: place.location.lng(),
        };

        positionRef.current = newPos;
        mapRef.current?.panTo(newPos);
        setCurrentPlaceId(place.id);
      }
    };

    autocomplete.addEventListener("gmp-select", handlePlaceSelect);

    return () => {
      autocomplete.removeEventListener("gmp-select", handlePlaceSelect);
    };
  }, [placesLib, map]);

  const onMapClick = async (e: MapMouseEvent) => {
    const placeId = e.detail.placeId;

    if (placeId) {
      e.stop();

      if (placesLib) {
        const place = new placesLib.Place({ id: placeId });
        await place.fetchFields({ fields: ["location", "id"] });

        if (place.location && place.id) {
          const newPos = {
            lat: place.location.lat(),
            lng: place.location.lng(),
          };

          positionRef.current = newPos;
          mapRef.current?.panTo(newPos);
          setCurrentPlaceId(place.id);
        }
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div ref={autocompleteContainerRef} className="absolute h-10 z-10 mt-4 mx-4 inset-x-0" />
      <GoogleMap
        defaultCenter={center}
        defaultZoom={13}
        onClick={onMapClick}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        zoomControl={true}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          position: "absolute",
        }}
      >
        <Marker position={positionRef.current || center} />
      </GoogleMap>
    </>
  );
}

export function MapsContent() {
  return (
    <div className="w-full h-full relative">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Maps />
      </APIProvider>
    </div>
  );
}
