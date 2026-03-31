import { useSyncExternalStore } from "react";
import { BREAKPOINT, WIDTH_LG, WIDTH_SM } from "./constants";

export function usePickerLayout() {
  const query = `(min-width: ${BREAKPOINT}px)`;
  const isWide = useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => true,
  );

  return {
    numberOfMonths: isWide ? 2 : 1,
    width: isWide ? WIDTH_LG : WIDTH_SM,
  } as const;
}
