/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./wp-templates/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'click-here-dark': '#030A16',
        'click-here-teal': '#2FC2B3',
        'click-here-medium': 'rgba(28, 130, 152, 0.25)',
      }
    },
  },
  plugins: [],
}
