const webpack = require('webpack')
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) console.log(`ERROR LOADING .ENV \n${result.error}`)
const env = result.parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules/', '/reactTests'],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
}
