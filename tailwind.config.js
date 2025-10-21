/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hfg-orange': '#FF6B35',
        'hfg-red': '#E63946',
        'hfg-dark': '#1D3557',
      },
    },
  },
  plugins: [],
}

