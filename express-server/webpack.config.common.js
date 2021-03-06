// Base config that is extended for dev & prod
const path = require('path')

module.exports = {
  target: 'node',
  module: {
    rules: [{
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/
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
