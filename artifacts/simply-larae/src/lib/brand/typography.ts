export const brandTypography = {
  fontFamily: {
    primary: "'Inter', system-ui, sans-serif",
  },

  fontWeight: {
    thin: 300,
    regular: 400,
    medium: 500,
  },

  letterSpacing: {
    hero: "0.08em",
    heading: "0.1em",
    label: "0.25em",
    eyebrow: "0.3em",
    button: "0.15em",
  },

  fontSize: {
    hero: "clamp(3.5rem, 8vw, 8rem)",
    h1: "clamp(2.5rem, 5vw, 5rem)",
    h2: "clamp(2rem, 4vw, 4rem)",
    h3: "clamp(1.25rem, 2.5vw, 2rem)",
    body: "1rem",
    small: "0.875rem",
    label: "0.6875rem",
  },

  textTransform: {
    eyebrow: "uppercase" as const,
    navItem: "uppercase" as const,
    button: "uppercase" as const,
    heading: "uppercase" as const,
  },
} as const;
