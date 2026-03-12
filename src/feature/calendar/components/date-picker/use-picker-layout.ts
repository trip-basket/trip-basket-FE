import { useSyncExternalStore } from "react";
import { DATE_PICKER_BREAKPOINT, DATE_PICKER_WIDTH_LG, DATE_PICKER_WIDTH_SM } from "./constants";

function useIsWideScreen() {
  const query = `(min-width: ${DATE_PICKER_BREAKPOINT}px)`;
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => true,
  );
}

export function usePickerLayout() {
  const isWide = useIsWideScreen();
  return {
    numberOfMonths: isWide ? 2 : 1,
    modalWidth: isWide ? DATE_PICKER_WIDTH_LG : DATE_PICKER_WIDTH_SM,
  } as const;
}
