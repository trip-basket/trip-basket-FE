import { useEffect, useRef } from "react";

export function usePlaceAutocomplete(
  containerRef: React.RefObject<HTMLDivElement | null>,
  placesLib: google.maps.PlacesLibrary | null,
  onSelect: (place: google.maps.places.Place) => Promise<void>,
) {
  const initialized = useRef<boolean>(false);

  const onSelectRef = useRef<typeof onSelect>(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!placesLib || !containerRef.current || initialized.current) {
      return;
    }

    initialized.current = true;

    const autocomplete = document.createElement("gmp-place-autocomplete");
    autocomplete.style.color = "black";
    autocomplete.classList.add("bg-white", "border", "border-gray-200", "rounded-md");
    autocomplete.setAttribute("placeholder", "장소를 입력하세요");
    containerRef.current.appendChild(autocomplete);

    // biome-ignore lint/suspicious/noExplicitAny: @types/google.maps 에서 PlaceSelectEvent 타입 미지원
    const handleSelect = async (event: any) => {
      const place = event.placePrediction?.toPlace();
      if (place) {
        await onSelectRef.current(place);
      }
    };

    autocomplete.addEventListener("gmp-select", handleSelect);
    return () => autocomplete.removeEventListener("gmp-select", handleSelect);
  }, [placesLib, containerRef]);
}
