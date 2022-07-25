// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        kumbhsans: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        violet: "#5964E0",
        lightviolet: "#939BF4",
        verydarkblue: "#19202D",
        midnight: "#121721",
        lightgray: "#F4F6F8",
        gray: "#9DAEC2",
        darkgray: "#6E8098",
      },
      screens: {
        lg: "1440px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
