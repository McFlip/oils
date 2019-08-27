const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) console.log(`ERROR LOADING .ENV \n${result.error}`)
const env = result.parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/app/node_modules/', '/app/reactTests'],
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
