/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-bg': '#050a08',
        'neon-card': '#0a1c14',
        'neon-green': '#00FF88',
        'neon-green-dark': '#00cc6a',
        'neon-text': '#e2e8f0',
        'neon-gray': '#64748b',
      },
        fontFamily: {
        sans: ['Outfit', 'sans-serif'], // Cambiamos Inter por Outfit
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(to right, #00FF88, #008f4c)',
      }
    },
  },
  plugins: [],
}