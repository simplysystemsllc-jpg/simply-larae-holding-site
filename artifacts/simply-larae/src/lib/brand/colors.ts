export const brandColors = {
  primaryBlush: "#EED4CF",
  softRose: "#D9A9A3",
  taupeAccent: "#8E6E67",
  warmCocoa: "#6E544E",
  pearlBackground: "#F5E7E3",
  white: "#FFFFFF",

  text: {
    primary: "#6E544E",
    muted: "#8E6E67",
    light: "#B09999",
  },

  border: {
    default: "#E8D5CF",
    subtle: "#F0E4E0",
    strong: "#D9A9A3",
  },

  surface: {
    background: "#F5E7E3",
    card: "#FFFFFF",
    overlay: "rgba(238,212,207,0.15)",
  },
} as const;

export type BrandColors = typeof brandColors;
