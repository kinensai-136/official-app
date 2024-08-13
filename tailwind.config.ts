import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      yellow: "#facc15",
      primary: {
        100: "#1480f5",
        200: "#4c8df7",
        300: "#6b9af8",
        400: "#85a8fa",
        500: "#9cb6fb",
        600: "#b1c4fc",
      },
      dark: {
        100: "#0A0A0A",
        200: "#191919",
        300: "#272727",
        400: "#5C5C5C",
        500: "#7F7F7F",
        600: "#9A9A9A",
      },
    },
    fontSize: {
      xs: "0.8rem",
      sm: "0.9rem",
      base: "1rem",
      lg: "1.1rem",
      xl: "1.25srem",
      "2xl": "1.5rem",
    },
    borderRadius: {
      none: "0",
      sm: "1.0rem",
      DEFAULT: "1.25rem",
      md: "1.25rem",
      lg: "1.5rem",
      full: "9999px",
    },
  },
  plugins: [],
} satisfies Config
