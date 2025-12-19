import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fff8e1",
          100: "#ffefb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#ffc107",
          600: "#ffb300",
          700: "#ffa000",
          800: "#ff8f00",
          900: "#ff6f00"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255, 193, 7, 0.25), 0 0 40px rgba(255, 193, 7, 0.10)",
        glowStrong: "0 0 0 1px rgba(255, 193, 7, 0.35), 0 0 80px rgba(255, 193, 7, 0.15)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(80% 80% at 50% 10%, rgba(255, 193, 7, 0.12) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 60% at 80% 40%, rgba(220, 38, 38, 0.12) 0%, rgba(0,0,0,0) 60%)"
      }
    }
  },
  plugins: []
} satisfies Config;
