import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        paper: "#f4efe4",
        ink: "#171611",
        muted: "#766f61",
        sand: "#d8c7aa",
        clay: "#9d6f4f",
        char: "#27231d",
        cream: "#fffaf0",
        good: "#325b3d",
        bad: "#8b342f",
      },
      borderRadius: {
        xl2: "26px",
      },
      boxShadow: {
        card: "0 24px 80px rgba(23,22,17,0.12)",
        lot: "0 12px 36px rgba(23,22,17,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
