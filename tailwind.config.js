/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#005b96',
        'deep-water': '#03396c',
      }
    },
  },
  plugins: [],
}

