/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        lgx: '1100px',
        mdx: '830px',
        smx: '630px',
      },
    },
  },
  plugins: [],
};
