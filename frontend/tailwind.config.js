/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Monochromatic black and white theme
        "dark-bg": "#0a0a0a", // Nearly black background
        "dark-secondary": "#1a1a1a", // Dark secondary
        "dark-tertiary": "#2a2a2a", // Dark tertiary
        "dark-border": "#3a3a3a", // Dark border
        "light-bg": "#f5f5f5", // Off-white background
        "light-secondary": "#e8e8e8", // Light secondary
        "light-tertiary": "#d0d0d0", // Light tertiary
        "light-border": "#cccccc", // Light border
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        dark: "0 4px 6px rgba(0, 0, 0, 0.3)",
        "dark-lg": "0 10px 25px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
