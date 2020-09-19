// common config between dev & production

// load env vars from a '.env' file
const webpack = require('webpack')
const dotenv = require('dotenv')
const result = dotenv.config()
const plugins = {
  plugins: [
    new webpack.EnvironmentPlugin(['DOMAIN', 'ROOT_URL', 'IMG_HOST'])
  ]
}
let envPlugin = null

// attempt to parse .env file
if (result.error) {
  // eslint-disable-next-line no-console
  console.log(`ERROR LOADING .ENV \n${result.error}`)
} else {
  const env = result.parsed
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})
  envPlugin = new webpack.DefinePlugin(envKeys)
}
if (envPlugin) {
  plugins.plugins.push(envPlugin)
}

// export the base obj that will be extended in other configs
module.exports = {
  entry: ['./src/index.js'],
  //   conditionally spread env plugin
  ...plugins
}
