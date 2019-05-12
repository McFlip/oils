// Import dependencies
import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();
import * as PostController from '../controllers/post.js';
import * as ProdController from '../controllers/prod.js';
import * as UseController from '../controllers/use.js';
import * as RecipeController from "../controllers/recipe.js";
import multer from 'multer'
const upload = multer({ dest: './uploads' })

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';
const dbOpts = { useNewUrlParser: true };

// Connect to mongodb
mongoose.connect(dbHost, dbOpts)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

/* GET api listing. */
router.get('/', PostController.ping);

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
router.get('/products/:id/posts', PostController.getPosts);

/* GET one posts. */
router.get('/posts/:id', PostController.getPost);

/* Delete post */
router.delete('/posts/:id', PostController.deletePost);

/* Create a post. */
router.post('/posts', upload.single('image'), PostController.createPost);

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
