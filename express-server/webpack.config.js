// Production config - extends common config
const commonConfig = require('./webpack.config.common')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  ...commonConfig,
  entry: './server/index',
  externals: [nodeExternals({
    whitelist: [/^lodash/]
  })],
  mode: 'production'
}
