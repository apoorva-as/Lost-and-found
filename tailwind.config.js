/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d8eafe",
          200: "#baddfd",
          300: "#8cc8fb",
          400: "#58a9f7",
          500: "#2f89f2",
          600: "#1f6de6",
          700: "#1957d2",
          800: "#1b47aa",
          900: "#1c3f86"
        },
        accent: {
          500: "#12b981",
          600: "#059669"
        },
        ink: "#0f172a"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(47, 137, 242, 0.18)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)"
      }
    },
  },
  plugins: [],
};
