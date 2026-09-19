/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

