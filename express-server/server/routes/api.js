// Import dependencies
import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();
import * as PostController from '../controllers/post.js';
import * as ProdController from '../controllers/prod.js';

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
router.post('/posts', PostController.createPost);

export {router as api};
