// Get dependencies
import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'

// Get our API routes
import { api } from './routes/api.js'

const app = express()

// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Cross Origin middleware
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  next()
})

// passport auth
app.use(passport.initialize())

// Set our api routes
app.use('/', api)

export default app
