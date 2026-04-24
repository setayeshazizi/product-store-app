/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          dark: "#050505",
          accent: "#3b82f6",
        }
      },
    },
    plugins: [],
  }