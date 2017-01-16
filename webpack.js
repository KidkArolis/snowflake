var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackOptions = require('./webpack.config.js')

module.exports = function (app) {
  app.use(webpackDevMiddleware(webpack(webpackOptions), {
    publicPath: '/dist',
    stats: { colors: true },
    noInfo: false,
    quiet: false
  }))
}
