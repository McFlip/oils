// This is the production config
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const dotenv = require('dotenv')
const result = dotenv.config()
// eslint-disable-next-line no-console
if (result.error) console.log(`ERROR LOADING .ENV \n${result.error}`)
const env = result.parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(envKeys)
  ],
  output: {
    path: path.join(__dirname, '.build'),
    filename: 'server.js'
  },
  mode: 'production'
}
