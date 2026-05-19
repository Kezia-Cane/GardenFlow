import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b0f19",
        surface: "#0e1511",
        "surface-container": "#1a211d",
        "surface-high": "#242c27",
        "surface-variant": "#2f3632",
        primary: "#4edea3",
        "primary-solid": "#10b981",
        secondary: "#4cd7f6",
        tertiary: "#d0bcff",
        "on-surface": "#dde4dd",
        "on-muted": "#94a3b8",
        outline: "#3c4a42",
      },
      boxShadow: {
        glow: "0 0 28px rgba(16, 185, 129, 0.12)",
        panel: "0 18px 50px rgba(0, 0, 0, 0.28)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
