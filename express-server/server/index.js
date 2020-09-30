import http from 'http'
import https from 'https'
import app from './server'
import fs from 'fs'

// if we are in production, load https cert & key
// else in dev just use plain http
let serverOpts = null
const { NODE_ENV, DOMAIN } = process.env
if (NODE_ENV === 'production') {
  serverOpts = {
    key: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN}/fullchain.pem`)
  }
}
const server = serverOpts === null ? http.createServer(app) : https.createServer(serverOpts, app)
let currentApp = app
server.listen(3000)
if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
