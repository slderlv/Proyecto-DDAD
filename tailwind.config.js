/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'color1': '#5800FF',
      'color2': '#0096FF',
      'color3': '#00D7FF',
      'color4': '#72FFFF',
      'purple': '#690ca5',
      'lightpurple': '#b225af',
      'white': '#ffffff',
      'black': '#000000',
      'green-300': '#6EE7B7',
      'blue-500': '#3B82F6',
      'purple-600': '#7C3AED'
    },
  },
  plugins: [],
}
