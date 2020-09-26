// development config
const commonConfig = require('./webpack.config.common')

module.exports = {
  ...commonConfig,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules/', '/reactTests'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
