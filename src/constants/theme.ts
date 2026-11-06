export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export type ThemeType = (typeof THEME)[keyof typeof THEME];

export const THEME_STORAGE_KEY = "theme";
