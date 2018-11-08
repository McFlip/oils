// Import dependencies
import mongoose from 'mongoose';
import { Router } from 'express';
const router = new Router();
import User from '../models/user.js';
import * as UserController from '../controllers/user.js';

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';
const dbOpts = { useNewUrlParser: true };

// Connect to mongodb
mongoose.connect(dbHost, dbOpts)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

/* GET api listing. */
router.get('/', UserController.ping);

/* GET all users. */
router.get('/users', UserController.getUsers);

/* GET one users. */
router.get('/users/:id', UserController.getUser);

/* Create a user. */
router.post('/users', UserController.createUser);

export {router as api};
