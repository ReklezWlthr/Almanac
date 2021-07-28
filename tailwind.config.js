module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        darkViolet: '#3A3949',
        vividDark: '#22212B',
        warmGray: '#C9C9C9',
        paleViolet: '#FBF8FF',
        lightViolet: '#BE98D4',
        lightPB: '#A19BDA',
        PB: '#706CA3',
        darkPB: '#4C4A67',
        palePB: '#B2B0C1'
      },
      width:{
        thumb: '23rem',
        ability: '35rem',
        stat: '30rem',
        42: '10.5rem',
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "10/10": "100%"
      },
      height:{
        lyrics: '28rem',
        showCase: '33rem',
        more: '18rem'
      },
      margin: {
        ability: '22.5rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
