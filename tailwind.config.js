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
        kleur: 'rgb(255, 60, 0)',
        kleur2: 'rgb(190, 44, 0)'
      }
    },
  },
  plugins: [],
}

