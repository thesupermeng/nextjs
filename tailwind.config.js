/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/componentsH5/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        topMenu: '#090909',
        sideMenu: '#0E0E0E',
        dark_BG: '#121212',
        button_Dark_Blue: '#151619',
        button_Navy_Blue: '#242B3E',
        tayaRed: '#DE173E',
        tayaGrey: '#191A1D',
        grey: '#9E9E9E',
        white: '#FFFFFF',
        errorRed: '#969696',
        won: '#46C853',
        darkGrey: '#0E0F11',
        yellowGuide: '#FFD621',
        shayuBlue: '#FAC33D'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        height: 'height',
        maxheight: 'max-height',
      },
      placeholderColor: {
        primary: '#969696',
        secondary: '#969696',
        danger: '#969696',
      },
      fontFamily: {
        main: ['"SF Pro"', 'sans-serif'],
      },
      fontSize: {
        13: '13px',
        15: '15px',
        17: '17px',
      },
      keyframes: {
        H5BannerHeader: {
          '0%, 100%': { color: '#FFFFFF' },
          '50%': { color: '#FCC511' },
        },
        H5BannerButton: {
          '0%, 100%': {
            width: '4.95rem',
            height: '2.1rem',
            fontSize: '0.825rem',
          },
          '50%': { width: '4.5rem', height: '2rem', fontSize: '0.75rem' },
        },
        moveTextToLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        audioBlockIn: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        audioBlockOut: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
});
