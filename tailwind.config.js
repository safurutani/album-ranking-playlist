/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'green': 'var(--green)',
        'primary': 'var(--primary)',
        'accent': 'var(--accent)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'searchOutline': 'var(--searchOutline)',
        'resultText': 'var(--resultText)',
        'searchHover': 'var(--searchHover)',
        'searchTextHover':'var(--searchTextHover)',
        'buttonBg': 'var(--buttonBg)',
        'backBg' : 'var(--backBg)',
        'buttonOutline' : 'var(--buttonOutline)',
        'backOutline': 'var(--backOutline)',
        'buttonHoverOutline': 'var(--buttonHoverOutline)',
        'home': 'var(--home)',
        'title': 'var(--title)',
      },
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
      }
    },
    variants: {
      fill: ['hover', 'focus'],
    }
  },
  plugins: [],
};
