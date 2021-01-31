/* eslint-disable no-console */
import mongoose from 'mongoose'
import { Router } from 'express'
import * as ProdController from '../controllers/prod.js'
import * as UseController from '../controllers/use.js'
import * as RecipeController from '../controllers/recipe.js'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import multer from 'multer'
import GridFSStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import { MockMongoose } from 'mock-mongoose'

const mockMongoose = new MockMongoose(mongoose)
const router = new Router()
Grid.mongo = mongoose.mongo

// For production, log in with user name & pw
const { DB_UNAME, DB_PW, NODE_ENV } = process.env
/* istanbul ignore next */
const dbHost = NODE_ENV === 'production'
  ? `mongodb://${DB_UNAME}:${DB_PW}@database/mean-docker`
  : 'mongodb://database/mean-docker'
// Avoid Mongoose deprecation warnings
const dbOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
const maxTries = 6 // max connection attempts
const retryTime = 10 // seconds between connection attempts
let attempt = 1
let gfs = null // gridfs-stream needs connection obj for constructor
// Connect to mongodb
// Recursive promises to handle mongoose reject on 1st connection failure
async function connect () {
  return new Promise(async (resolve, reject) => {
    /* istanbul ignore if */
    if (NODE_ENV !== 'test') {
      await mongoose.connect(dbHost, dbOpts)
        .then((conn) => resolve(conn))
        .catch((error) => {
          console.log(`Connection Attempt ${attempt} / ${maxTries} Failed!`)
          console.log(error)
          if (attempt < maxTries) {
            console.log(`retrying connection in ${retryTime} seconds`)
            attempt += 1
            setTimeout(() => resolve(connect()), retryTime * 1000)
          } else {
            console.log('Max Connection Attempts to MongoDB Exceeded!')
            reject(error)
          }
        })
    } else {
      // For testing, use mockMongoose in-mem DB
      mockMongoose.prepareStorage()
        .then(() => {
          mongoose.connect(dbHost, dbOpts)
            .then((conn) => resolve(conn))
        })
    }
  })
}
const conn = connect()
  .then(() => {
  // stream reader for downloads
    gfs = Grid(mongoose.connection.db)
    console.log('####### MongoDB Connected ###### ', Date())
    return mongoose.connection
  })
  .catch(
    /* istanbul ignore next */
    err => {
      console.log(err)
      // to exit the Docker container, kill the grandparent process
      process.kill(process.ppid)
    })

// Setting up the storage element
let storage = new GridFSStorage({ db: conn })

// Multer configuration for single file uploads
let upload = multer({
  storage: storage
}).single('image')

// Pass the gfs interface to controllers via req
const gfsMidWare = (req, res, next) => {
  req.gfs = gfs
  next()
}

// Passport auth config
let ppOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new Strategy(ppOpts, (jwtPayload, done) => {
  // TODO: check for admin priv in users collection
  return done(null, jwtPayload)
}))

// GET a single post
router.get('/products/:prodId/posts/:postId', ProdController.getPost)

// DELTEE a single post
router.delete('/products/:prodId/posts/:postId', gfsMidWare, ProdController.deletePost)

/* UPDATE a post. */
router.post('/posts/:postId', upload, gfsMidWare, ProdController.updatePost)

/* Create a post. */
router.post('/posts', upload, ProdController.createPost)

// Downloading a single file
router.get('/images/:filename', (req, res) => {
  gfs.collection('fs')
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (err) res.status(500).send(err)
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: 'error'
      })
    }
    // create read stream
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: 'fs'
    })
    // set the proper content type
    res.set('Content-Type', files[0].contentType)
    // Return response
    return readstream.pipe(res)
  })
})

/* GET all products. */
router.get('/products', passport.authenticate('jwt', { session: false }), ProdController.getProducts)

/* GET one product. */
router.get('/products/:id', passport.authenticate('jwt', { session: false }), ProdController.getProduct)

/* GET product search results. */
router.get('/products/search/:category', passport.authenticate('jwt', { session: false }), ProdController.searchProducts)

// GET wishlist
router.get('/wishlist', passport.authenticate('jwt', { session: false }), ProdController.getWishlist)

/* UPDATE product. */
router.post('/products/:id', passport.authenticate('jwt', { session: false }), ProdController.updateProduct)

// UPDATE inventory for a product
router.post('/inventory/:id', passport.authenticate('jwt', { session: false }), ProdController.updateInventory)

// CREATE product
router.post('/products', passport.authenticate('jwt', { session: false }), ProdController.createProduct)

/* Delete product */
router.delete('/products/:id', gfsMidWare, ProdController.deleteProduct)

// CREATE a use
router.post('/uses', UseController.createUse)

// GET item uses
router.get('/uses/:id/:refType', UseController.getUses)

// REMOVE a product or recipe from a use
router.delete('/uses/:id/:category/:refId', UseController.removeUse)

// ADD a product or recipe to a use
router.post('/uses/:id/:category/:refId', UseController.addUse)

// SEARCH through uses
router.get('/uses/search', UseController.searchUses)

// GET one use
router.get('/uses/:id', UseController.getUse)

// DELETE use
router.delete('/uses/:id', UseController.deleteUse)

// SEARCH recipes
router.get('/recipes/search', RecipeController.searchRecipes)

// GET one recipe
router.get('/recipes/:id', RecipeController.getRecipe)

// CREATE recipe
router.post('/recipes/create', RecipeController.createRecipe)

// UPDATE recipe
router.post('/recipes/:id', RecipeController.updateRecipe)

// DELETE recipe
router.delete('/recipes/:id', RecipeController.deleteRecipe)

// Hello message for testing
router.get('/', (req, res) => {
  res.status(200).send('Hello World!\r\n\r\n')
})

// For testing - shutdown Mongo DB after tests
router.delete('/mockmongoose', (req, res) => {
  mockMongoose.killMongo()
    .then(() => {
      res.status(200).send('MongoDB Disconnected\r\n')
    })
    .catch((err) => {
      console.log('unable to kill mockmongoose')
      console.error(err)
    })
})

// bad route
router.all('*', (req, res) => {
  res.sendStatus(404)
})

export { router as api }
