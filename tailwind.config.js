/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    backgroundColor: theme => ({
      'primary': '#00BFD2',
      'black': '#001A19',
      'gray': '#808C8C',
      'danger': '#e3342f',
      'white': '#ffffff',
      'lightblue': '#C2D5D5'
    }),
    borderColor: theme => ({
      'primary': '#00BFD2',
      'black': '#001A19',
      'gray': '#808C8C',
      'danger': '#e3342f',
      'white': '#ffffff',
      'lightblue': '#C2D5D5'
    }),
    textColor: theme => ({
      'primary': '#00BFD2',
      'black': '#001A19',
      'gray': '#808C8C',
      'danger': '#e3342f',
      'white': '#ffffff',
      'lightblue': '#C2D5D5'
    })  
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: []
}
