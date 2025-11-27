/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brandPink: '#ff4d8d',
        surfaceDark: '#0b0a0f',
        cardDark: '#18141f',
      },
      boxShadow: {
        glow: '0 0 20px #ff4d8d55',
      },
    },
  },
  plugins: [],
};
