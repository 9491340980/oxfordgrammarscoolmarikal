import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a1f3c",
          50: "#f3f6fb",
          100: "#e4ebf5",
          800: "#0d2547",
          900: "#081a33",
          950: "#050f1f",
        },
        gold: {
          DEFAULT: "#e2a018",
          light: "#f6c445",
          soft: "#fce6ab",
        },
        // Fresh tints used to alternate sections (replaces the dull beige).
        cream: {
          DEFAULT: "#fff4e2",
          dark: "#ffe9c9",
        },
        mint: "#dcf7e7",
        sky: "#e2edfd",
        // Pulled from the school crest — the brand's real colours.
        coral: {
          DEFAULT: "#f0523a",
          light: "#ff8a6e",
          soft: "#ffd8d0",
        },
        leaf: {
          DEFAULT: "#12a150",
          light: "#4ade80",
          soft: "#c6f2d8",
        },
        amber: {
          DEFAULT: "#fbaa2a",
          soft: "#ffe3b0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -20px rgba(10,31,60,0.25)",
        card: "0 10px 40px -18px rgba(10,31,60,0.30)",
        gold: "0 14px 40px -16px rgba(199,154,62,0.45)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.7s ease both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
