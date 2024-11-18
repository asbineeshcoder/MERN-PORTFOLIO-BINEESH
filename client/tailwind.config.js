
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "primary": "#1A5319",
        "secondary": "#508D4E",
        "tertiary": "#80AF81",
        "others": "#D6EFD8",
        "orange": "#ad6200",
        "header": "#3d753b",
        "green": "#8df573",
      }
    },

    screens: {
      sm: { max: "1000px" },

     /* md: { max: "768px" }, */

      lg: { max: "2024px" },

    }
  },

  plugins: [],
}