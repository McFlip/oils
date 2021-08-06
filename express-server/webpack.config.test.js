// Test config - extends production config
const path = require('path')
const prodConfig = require('./webpack.config')

module.exports = {
  ...prodConfig,
  entry: './server/server',
  output: {
    path: path.join(__dirname, '.build'),
    filename: 'app.js',
    libraryTarget: 'commonjs2',
    globalObject: 'this',
    libraryExport: 'default'
  },
  mode: 'none'
}
