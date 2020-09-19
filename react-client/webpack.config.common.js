// common config between dev & production

// load env vars from a '.env' file
// or from build environment
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
let envVals = null
try {
  envVals = new Dotenv()
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(`${err}\nLoading ENV VARS from build env`)
  envVals = new webpack.EnvironmentPlugin(['DOMAIN', 'ROOT_URL', 'IMG_HOST'])
}
const plugins = {
  plugins: [ envVals ]
}

// export the base obj that will be extended in other configs
module.exports = {
  entry: ['./src/index.js'],
  ...plugins
}
