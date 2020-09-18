// common config between dev & production

// load env vars from a '.env' file
const webpack = require('webpack')
const dotenv = require('dotenv')
const result = dotenv.config()
let envPlugin = null
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

// export the base obj that will be extended in other configs
module.exports = {
  entry: ['./src/index.js'],
  //   conditionally spread env plugin
  ...envPlugin && { plugins: [
    envPlugin
  ] }
}
