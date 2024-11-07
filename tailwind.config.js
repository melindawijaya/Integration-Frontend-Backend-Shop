/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00ffff',
        'neon-blue-dark': '#00cccc',
      },
    },
  },
  plugins: [],
};