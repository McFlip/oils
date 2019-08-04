const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) console.log(`ERROR LOADING .ENV \n${result.error}`)
const env = result.parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  entry: [
    'webpack/hot/poll?1000',
    './server/index'
  ],
  watch: true,
  target: 'node',
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  })],
  module: {
    rules: [{
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(envKeys)
  ],
  output: {
    path: path.join(__dirname, '.build'),
    filename: 'server.js'
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map'
}
