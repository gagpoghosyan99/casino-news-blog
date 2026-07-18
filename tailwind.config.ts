import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        navy: {
          900: "#0a0e17",
          950: "#060912",
        },
        gold: {
          300: "#f5d78e",
          400: "#d4af37",
          500: "#b8962e",
        },
        cyan: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
        danger: {
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
        },
        surface: {
          light: "#ffffff",
          dark: "#0a0e17",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "Georgia", "serif"],
        numeric: ["var(--font-numeric)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-gold": "0 0 40px rgba(212, 175, 55, 0.15)",
        "glow-cyan": "0 0 40px rgba(34, 211, 238, 0.15)",
        "glow-emerald": "0 0 40px rgba(16, 185, 129, 0.12)",
        "glow-danger": "0 0 40px rgba(239, 68, 68, 0.15)",
        "glow-gold-lg": "0 0 60px rgba(212, 175, 55, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        shine: "shine 3s ease-in-out infinite",
        heroReveal: "heroReveal 1s ease-out both",
        heroFadeUp: "heroFadeUp 0.9s ease-out both",
        heroZoom: "heroZoom 2.5s ease-out both",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        glowPulse: "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
