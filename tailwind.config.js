/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#347928",
        "light-green": "#C0EBA6",
        "primary-yellow": "#FCCD2A",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
