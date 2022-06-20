/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem'
      },
      width: {
        120: '30rem'
      },
      height: {
        23: '5.75rem'
      },

      colors: {
        'DarkPaleBlue': '#262343',
        'Coral': '#FF9649',
        'Negroni': '#FFDABF',
        'PeachOrange': '#FFC499'
      }
    },
  },
  plugins: [],
}
