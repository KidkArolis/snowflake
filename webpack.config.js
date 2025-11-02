const path = require('path')

module.exports = (env = {}, argv = {}) => {
  const mode = argv.mode || 'development'
  const isProduction = mode === 'production'

  return {
    mode,
    entry: path.resolve(__dirname, 'app/index.js'),
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: 'bundle.js',
      clean: true
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'app'),
          use: {
            loader: 'swc-loader',
            options: {
              sourceMaps: !isProduction,
              jsc: {
                target: 'es2019',
                parser: {
                  syntax: 'ecmascript',
                  jsx: true
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: !isProduction
                  }
                }
              }
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js']
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public')
      },
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 5173,
      hot: true
    }
  }
}
