// Import dependencies
import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();
// import * as PostController from '../controllers/post.js';
import * as ProdController from '../controllers/prod.js';
import * as UseController from '../controllers/use.js';
import * as RecipeController from "../controllers/recipe.js";
import multer from 'multer'
import GridFSStorage from 'multer-gridfs-storage'
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';
const dbOpts = { useNewUrlParser: true };
let gfs = null
// Connect to mongodb
const conn = mongoose.connect(dbHost, dbOpts)
.then(() => {
  // stream reader for downloads
  gfs = Grid(mongoose.connection.db)
  
  console.log('MongoDB Connected')
  return mongoose.connection
})
.catch(err => console.log(err));

// Setting up the storage element
let storage = new GridFSStorage({ db: conn })

// Multer configuration for single file uploads
let upload = multer({
  storage: storage
}).single('image');

/* GET api listing. */
// router.get('/', PostController.ping);

/* Create a post. */
router.post('/posts', upload, ProdController.createPost);

// Downloading a single file
router.get('/images/:filename', (req, res) => {
  gfs.collection('fs')
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    // create read stream
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: "fs"
    });
    // set the proper content type 
    res.set('Content-Type', files[0].contentType)
    // Return response
    return readstream.pipe(res);
  });
});

/* GET all products. */
router.get('/products', ProdController.getProducts);

/* GET one product. */
router.get('/products/:id', ProdController.getProduct);

/* GET product search results. */
router.get('/products/search/:category', ProdController.searchProducts);

/* UPDATE product. */
router.post('/products/:id', ProdController.updateProduct);

// CREATE product
router.post('/products', ProdController.createProduct);

/* Delete post */
router.delete('/products/:id', ProdController.deleteProduct);

/* GET all posts. */
// router.get('/products/:id/posts', PostController.getPosts);

/* GET one posts. */
// router.get('/posts/:id', PostController.getPost);

/* Delete post */
// router.delete('/posts/:id', PostController.deletePost);

// CREATE a use
router.post('/uses', UseController.createUse);

// GET item uses
router.get('/uses/:id/:refType', UseController.getUses);

// Remove a product or recipe from a use
router.delete('/uses/:id/:category/:refId', UseController.removeUse);

// Remove a product or recipe from a use
router.post('/uses/:id/:category/:refId', UseController.addUse);

// SEARCH through uses
router.get('/uses/search', UseController.searchUses);

// GET one use
router.get('/uses/:id', UseController.getUse);

// DELETE use
router.delete('/uses/:id', UseController.deleteUse)

// SEARCH recipes
router.get("/recipes/search", RecipeController.searchRecipes);

// GET one recipe
router.get("/recipes/:id", RecipeController.getRecipe);

// CREATE recipe
router.post("/recipes/create", RecipeController.createRecipe)

// UPDATE recipe
router.post('/recipes/:id', RecipeController.updateRecipe)

// DELETE recipe
router.delete('/recipes/:id', RecipeController.deleteRecipe)

export {router as api};
