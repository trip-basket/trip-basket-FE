import { Autocomplete, GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 37.5665, lng: 126.978 };

const mapOptions = {
  mapTypeControl: false, // 왼쪽 상단 Map/Satellite 제거
  streetViewControl: false, // 오른쪽 하단 사람 아이콘 제거
  fullscreenControl: false, // 전체화면 버튼 제거
  zoomControl: true, // 줌 버튼은 유지
};

type Position = {
  lat: number;
  lng: number;
};

export function MapsContent() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry) {
        const newPos = {
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        };
        setPosition(newPos || null);
        mapRef.current?.panTo(newPos);
      }
    }
  };

  return (
    <div className="w-full h-full relative">
      {isLoaded ? (
        <>
          <Autocomplete
            onLoad={(ref) => {
              autoCompleteRef.current = ref;
            }}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="장소를 검색하세요"
              className="absolute inset-0 h-10 border border-gray-300 rounded-md p-4 z-10 bg-white mt-4 mx-4"
            />
          </Autocomplete>
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            center={center}
            zoom={13}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              position: "absolute",
            }}
            options={mapOptions}
          >
            <MarkerF position={position || center} />
          </GoogleMap>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
