import { useSyncExternalStore } from "react";
import { DATE_PICKER_BREAKPOINT, DATE_PICKER_WIDTH_LG, DATE_PICKER_WIDTH_SM } from "./constants";

/**
 * Determines whether the viewport width is at least the date-picker breakpoint.
 *
 * @returns `true` if the current viewport width is greater than or equal to `DATE_PICKER_BREAKPOINT` pixels, `false` otherwise.
 */
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

/**
 * Compute date-picker layout values based on whether the viewport is wide.
 *
 * @returns An object with `numberOfMonths` (2 on wide screens, 1 otherwise) and `modalWidth` (large picker width on wide screens, small picker width otherwise)
 */
export function usePickerLayout() {
  const isWide = useIsWideScreen();
  return {
    numberOfMonths: isWide ? 2 : 1,
    modalWidth: isWide ? DATE_PICKER_WIDTH_LG : DATE_PICKER_WIDTH_SM,
  } as const;
}
