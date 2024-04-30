/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    extend: {
      screens: {
        xs: "520px",
      },
      colors: {
        "custom-gray-100": "#DBDBDB",
        "custom-gray-200": "#737373",
        "custom-gray-300": "#676767",
        "custom-gray-400": "#413e3e",
      },
      fontFamily: {
        sans: ["Asap", "sans-serif"],
      },
    },
  },
  plugins: [],
};
