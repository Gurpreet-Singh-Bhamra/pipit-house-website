/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        harbour: {
          50: "#f3f7f8",
          100: "#e1ecef",
          200: "#c9dce1",
          500: "#3d7a8c",
          700: "#1f4f5c",
          800: "#174654",
          900: "#0f3d4c",
        },
        sand: {
          50: "#fbf8f3",
          100: "#f4efe6",
          500: "#c4b39a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
