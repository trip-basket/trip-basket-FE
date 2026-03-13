import type React from "react";
import { getDefaultClassNames } from "react-day-picker";

export const DATE_PICKER_BREAKPOINT = 720;
export const DATE_PICKER_WIDTH_SM = 350;
export const DATE_PICKER_WIDTH_LG = 700;

export const rdpStyleOverrides = {
  "--rdp-accent-color": "var(--brand-500)",
  "--rdp-accent-background-color": "var(--brand-100)",
  "--rdp-today-color": "var(--brand-500)",
  "--rdp-range_start-date-background-color": "var(--brand-500)",
  "--rdp-range_end-date-background-color": "var(--brand-500)",
  "--rdp-range_middle-background-color": "var(--brand-50)",
  "--rdp-day_button-border-radius": "50%",
  "--rdp-selected-border": "none",
  "--rdp-nav_button-width": "40px",
  "--rdp-nav_button-height": "36px",
} as React.CSSProperties;

const defaultClassNames = getDefaultClassNames();

export const calendarClassNames = {
  // biome-ignore lint/style/useNamingConvention: rdp API
  month_caption: `${defaultClassNames.month_caption} !text-sm !font-bold`,
  selected: `${defaultClassNames.selected} !text-sm`,
  today: `${defaultClassNames.today} !font-bold`,
  // biome-ignore lint/style/useNamingConvention: rdp API
  button_previous: `${defaultClassNames.button_previous} !rounded-lg hover:!bg-gray-100 transition-colors`,
  // biome-ignore lint/style/useNamingConvention: rdp API
  button_next: `${defaultClassNames.button_next} !rounded-lg hover:!bg-gray-100 transition-colors`,
};
