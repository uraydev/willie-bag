const path = require('path')

module.exports = {
  productionSourceMap: false,
  outputDir: path.resolve(__dirname, "../www"),
  publicPath: (process.env.NODE_ENV === 'production') ? '' : '/'
}
