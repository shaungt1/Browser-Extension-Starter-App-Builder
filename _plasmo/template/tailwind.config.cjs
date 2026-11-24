/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{ts,tsx}', './{components,contents,core}/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { 500: '#6366f1', 600: '#4f46e5' } }
    }
  },
  plugins: []
}
