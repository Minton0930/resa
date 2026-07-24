import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbff",
          100: "#d6f4ff",
          200: "#b0e9ff",
          300: "#75d9ff",
          400: "#33c3ff",
          500: "#09a6f5",
          600: "#0084d1",
          700: "#0269a8",
          800: "#075889",
          900: "#0c4a71",
        },
        sun: {
          400: "#ffb648",
          500: "#ff9d1f",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(9, 30, 66, 0.25)",
        glow: "0 0 24px rgba(9, 166, 245, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
