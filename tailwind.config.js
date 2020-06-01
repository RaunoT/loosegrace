/**
 * Global Styles Plugin
 *
 * This plugin modifies Tailwind’s base styles using values from the theme.
 * https://tailwindcss.com/docs/adding-base-styles#using-a-plugin
 */
const globalStyles = ({ addBase, config }) => {
  addBase({
    body: {
      color: config('theme.colors.white'),
    }
  });
}

module.exports = {
  purge: [
    './**/*.html',
    './**/*.css'
  ],
  theme: {
    fontFamily: {
      'display': 'Lobster, cursive',
      'body': 'Open Sans, sans-serif'
    },
    extend: {
      colors: {
        yellow: '#efe8ba',
        black: '#000',
        white: '#fff',
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '7rem'
      },
      screens: {
        'xl-down': {'max': '1279px'},
        'lg-down': {'max': '1023px'},
        'md-down': {'max': '767px'},
        'sm-down': {'max': '639px'}
      }
    },
  },
  variants: {},
  plugins: [
    globalStyles,
  ],
}
