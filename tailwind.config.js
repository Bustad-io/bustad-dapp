/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      dialog: '520px',
      sm: '640px',      
      md: '786px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      animation: {
        'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 1 1000ms',
      },
      textColor: {
        'PrimaryHordeBlue': '#0F0B36',
      },
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
        'DarkPaleBlueDarker': '#211e38',
        'PrimaryHordeBlue': '#0F0B36',
        'Coral': '#FF9649',
        'Negroni': '#FFDABF',
        'PeachOrange': '#FFC499',
        'Tuscanyapprox': '#BE6B30',
        'Anakiwa': '#B1DEFF'
      }
    },
  },
  plugins: [],
}
