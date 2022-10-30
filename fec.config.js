module.exports = {
  jsx: 'react',
  extendWebpack (config) {
    config.set('externals', {
      // jquery: 'jQuery'
    })
  }
}
