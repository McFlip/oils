// This is the production config
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './server/index',
  target: 'node',
  externals: [nodeExternals({
    whitelist: [/^lodash/]
  })],
  module: {
    rules: [{
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    path: path.join(__dirname, '.build'),
    filename: 'server.js'
  },
  mode: 'production'
}
