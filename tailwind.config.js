/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["oswald"],
        notosanskr: 'Noto Sans KR'
      },
      inset: { 
        '3b': '-28px',
        'custom': '17px',
        'custom2': '89px',
        '5l': '-18px',
        'leftcustom': '12px',
        'leftcustom2': '66px',
        'leftcustom3': '12px',
        'custom3': '65px',

      },
      width: {
        'custom': '45px',
        'custom2': '80px',
      },
      backgroundImage: {
        'dotted-pattern': 'radial-gradient(#000 1px, transparent 1px)',
        'fade-mask': 'linear-gradient(to bottom right, black 10%, transparent 70%)'
      },
      backgroundSize: {
        'dot-size': '4px 4px',
      },
      backgroundPosition: {
        'dot-position': '-19px -19px',
      },
      fontSize: {
        '11s': '11px',     
        '15s': '18px',     
        'custom': '1.125rem',    
        'title': '2.75rem',     
        'huge': '4rem',         
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

