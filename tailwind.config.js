const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [
    // plugin(function ({ addBase }) {
    //   addBase({ html: { fontSize: "0.9375rem" } });
    // }),
  ],
  darkMode: "selector",
};
