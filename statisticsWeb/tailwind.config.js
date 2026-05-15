// // tailwind.config.js - Add xs breakpoint
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       screens: {
//         'xs': '475px',
//       },
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//       },
//       colors: {
//         brand: {
//           50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
//           400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
//           800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
//         },
//         profit: { light: '#10b981', dark: '#059669' },
//         loss: { light: '#ef4444', dark: '#dc2626' },
//         warning: { light: '#f59e0b', dark: '#d97706' }
//       },
//       boxShadow: {
//         'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
//         'card-dark': '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
//       }
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
        },
        profit: { light: '#10b981', dark: '#059669' },
        loss: { light: '#ef4444', dark: '#dc2626' },
        warning: { light: '#f59e0b', dark: '#d97706' }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-dark': '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
      }
    },
  },
  plugins: [],
};