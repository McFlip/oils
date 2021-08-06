// Base config that is extended for dev & prod
const path = require('path')

module.exports = {
  target: 'node',
  module: {
    rules: [{
      test: /\.js?$/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      exclude: [
        '/node_modules/', '/test/'
      ]
    }]
  },
  output: {
    path: path.join(__dirname, '.build'),
    filename: 'server.js'
  },
  optimization: {
    noEmitOnErrors: true
  }
}
