/**
 * Tailwind Config
 * --------------------------------------------------
 * Extends default Tailwind theme with PlinkOink styling:
 * - Arcade-style dark UI surfaces
 * - Pink brand accents + glow effects
 * - Scans index and all src components for Tailwind classes
 */

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  // Dark UI is core to game identity; class mode reserved for future theme toggles
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        brandPink: '#ff4d8d',
        surfaceDark: '#0b0a0f',
        cardDark: '#18141f',
      },
      boxShadow: {
        pig: '0 8px 20px rgba(0,0,0,0.35)',
      },
      dropShadow: {
        pigGlow: '0 0 14px rgba(255,47,180,0.55)',
      },
    },
  },

  plugins: [],
};
