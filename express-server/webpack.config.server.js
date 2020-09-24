// Dev config - extends common config
const commonConfig = require('./webpack.config.common')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
  ...commonConfig,
  entry: [
    'webpack/hot/poll?1000',
    './server/index'
  ],
  watch: true,
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  })],
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    ...commonConfig.optimization,
    namedModules: true
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map'
}
