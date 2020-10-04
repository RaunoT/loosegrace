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
      fontFamily: config('theme.fontFamily.body')
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
      'body': 'Bebas Neue, cursive'
    },
    extend: {
      colors: {
        yellow: '#efe8ba',
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
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      }
    },
  },
  variants: {},
  plugins: [
    globalStyles,
  ],
}
