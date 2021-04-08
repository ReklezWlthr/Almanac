module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        darkViolet: '#3A3949',
        vividDark: '#22212B',
        warmGray: '#C9C9C9',
        paleViolet: '#FBF8FF'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
