/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-purple':'#27023B',
        'dark-slate-gray':'#3D4C47',
        'pale-gold':'#EAFABD',
        'sky-blue':'#bdffe7',
        'light-sky-blue':'#bdd5ff',
        'violet-blue':'#c6bdff',
        'green-white':'#d5ffbd',
        'pale-pink':'#E0C2FF',
      }
    },
  },
  plugins: [],
}

