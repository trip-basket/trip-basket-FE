import {
  APILoadingStatus,
  APIProvider,
  Map as GoogleMap,
  Marker,
  useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { useRef } from "react";
import { DEFAULT_CENTER } from "./constants";
import { usePlaceSelection } from "./hooks";
import { usePlaceAutocomplete } from "./hooks/use-place-autocomplete";

function Maps() {
  const status = useApiLoadingStatus();
  const autocompleteContainerRef = useRef<HTMLDivElement>(null);

  const { position, placesLib, selectPlace, handleMapClick } = usePlaceSelection();

  usePlaceAutocomplete(autocompleteContainerRef, placesLib, selectPlace);

  if (status === APILoadingStatus.LOADING) {
    return (
      <div className="flex items-center justify-center border border-gray-200 rounded-md p-4 bg-gray-50 h-full w-full">
        <p>로딩 중... 잠시만 기다려주세요.</p>
      </div>
    );
  }

  if (status === APILoadingStatus.AUTH_FAILURE || status === APILoadingStatus.FAILED) {
    return (
      <div className="flex items-center justify-center border border-gray-200 rounded-md p-4 bg-gray-50 h-full w-full">
        <p className="text-gray-500 text-sm text-center">
          지도를 표시하는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  return (
    <>
      <div ref={autocompleteContainerRef} className="absolute h-10 z-10 mt-4 mx-4 inset-x-0" />
      <GoogleMap
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={13}
        onClick={handleMapClick}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        zoomControl={true}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <Marker position={position || DEFAULT_CENTER} />
      </GoogleMap>
    </>
  );
}

export function MapsContent() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center border border-gray-200 rounded-md p-4 bg-gray-50 h-full w-full">
        <p className="text-gray-500 text-sm text-center">
          지도를 표시하는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <APIProvider apiKey={apiKey}>
        <Maps />
      </APIProvider>
    </div>
  );
}
