/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['open sans', 'sans-serif'],
      },
      colors: {
        card: '#f6f8fc',
      },
    },
  },
  plugins: [],
})
