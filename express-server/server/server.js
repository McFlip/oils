// Get dependencies
import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import fs from 'fs'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
// import path from 'path'
// import rfs from 'rotating-file-stream'
// Get our API routes
import { api } from './routes/api.js'

const app = express()
// Config for CORS - set to Domain or http://localhost:8080 if deploying full stack
// Leave as '*' for public API
const ACAO = process.env.ALLOW_ORIGIN || '*'
// predefined log format
const LF = process.env.LOG_FORMAT || 'combined'
// appending log
const { NODE_ENV } = process.env
const accessLogStream = NODE_ENV !== 'test'
  ? fs.createWriteStream('/var/log/access.log', { flags: 'a' })
  : null
/*
// config logging with rotating log files
const LR = process.env.LOG_ROTATION || '1d'
const accessLogStream = rfs('access.log', {
  interval: LR, // rotate daily
  path: path.join(__dirname, 'log')
})
*/
// use middlewares
app.use(helmet())
// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Cross Origin middleware
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', ACAO)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  next()
})
// passport auth
app.use(passport.initialize())
// logs
if (NODE_ENV !== 'test') {
  app.use(morgan(LF, { stream: accessLogStream }))
  app.use(morgan('dev'))
}
// default compression - use opts obj to config
app.use(compression())

// Set our api routes
app.use('/', api)

export default app
