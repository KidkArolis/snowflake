const path = require('path')

module.exports = {
  entry: '.',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /.js$/,
      loaders: 'buble-loader',
      // include: [path.join(__dirname, 'app'),
      query: {
        objectAssign: 'Object.assign',
        jsx: 'React.h'
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
}
