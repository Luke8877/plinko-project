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
        pig: '0 8px 20px rgba(0,0,0,0.35)', // soft depth shadow
      },
      dropShadow: {
        pigGlow: '0 0 14px rgba(255,47,180,0.55)', // shape-following neon glow
      },
    },
  },
  plugins: [],
};
