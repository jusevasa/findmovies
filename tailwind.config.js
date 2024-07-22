/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBlack: 'var(--color-black)',
        darkGray: 'var(--color-gray-900)',
        lightGray: {
          DEFAULT: 'var( --color-gray-100)',
          60: 'var(--color-gray-100-60)',
          36: 'var(--color-gray-100-36)',
          16: 'var(--color-gray-100-16)',
        },
        brightYellow: 'var(--color-yellow-600)',
        brightHYellow: 'var(--color-yellow-700)',
      },
      backgroundImage: {
        'yellow-gradient': 'var(--yellow-gradient)',
      },
      animation: {
        'color-change': 'colorChange 1s infinite',
      },
      keyframes: {
        colorChange: {
          '0%': { backgroundColor: 'var(--color-gray-100)' },
          '50%': { backgroundColor: 'var(--color-gray-100-60)' },
          '100%': { backgroundColor: 'var(--color-gray-100-36)' },
        },
      },
    },
  },
  plugins: [],
};
