/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a192f',
          800: '#0f2647',
          700: '#16335c',
          600: '#1d4273',
          500: '#275896',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        }
      },
      fontFamily: {
        thai: ['"IBM Plex Sans Thai"', '"Noto Sans Thai"', 'Sarabun', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
