/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        koranje: 'rgb(255, 128, 0)',
      },
    },
  },
  plugins: [],
}

