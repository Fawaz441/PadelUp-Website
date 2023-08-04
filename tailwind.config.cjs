/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#0100D5",
        green:"#BFFD01",
        offWhite:"#F8FAFB",
        lightBlue:"#D2DBF7"
      }
    },
  },
  plugins: [],
});
