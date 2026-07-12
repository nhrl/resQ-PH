/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D32F2F",     // Emergency red
        secondary: "#1976D2",   // Info blue
        success: "#2E7D32",     // Safe green
        background: "#FFFFFF",
        "background-dark": "#111827",
        text: "#111827",
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};