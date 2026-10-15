import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hind)", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        bazar: {
          primary: "#15803d",
          "primary-content": "#ffffff",
          secondary: "#facc15",
          accent: "#f97316",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f6f8f4",
          "base-300": "#e5e9e0",
          "base-content": "#1f2937",
          info: "#0ea5e9",
          success: "#16a34a",
          warning: "#f59e0b",
          error: "#dc2626",
        },
      },
    ],
  },
};

export default config;
