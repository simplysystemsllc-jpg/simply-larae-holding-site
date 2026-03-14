export const brandSpacing = {
  section: {
    sm: "py-16",
    md: "py-24",
    lg: "py-28",
    xl: "py-36",
  },

  container: {
    default: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    narrow: "max-w-4xl mx-auto px-4 sm:px-6",
    text: "max-w-3xl mx-auto px-4 sm:px-6",
  },

  card: {
    sm: "p-6",
    md: "p-8",
    lg: "p-10 md:p-14",
  },

  gap: {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  },

  gutter: 50,

  rounded: {
    card: "rounded-3xl",
    button: "rounded-full",
    badge: "rounded-full",
    input: "rounded-xl",
    sm: "rounded-2xl",
  },
} as const;
