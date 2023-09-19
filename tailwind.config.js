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
        'click-here-accordion': 'rgba(245, 245, 245, 0.10)',
        'click-here-services-t1': '#00A6A6',
        'click-here-services-t2': '#00818C',
        'click-here-services-t3': '#0092B2',
      }
    },
  },
  plugins: [],
}
