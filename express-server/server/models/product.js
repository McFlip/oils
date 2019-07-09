import { Ingredient } from './recipe'
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const picHost = '/img/' // root url for pic host

// child schemas
/*
const gfxSchema = new Schema({
  picture: {
    type: String,
    get: v => `${picHost}${v}`
  }
})
*/

const inventorySchema = new Schema({
  apiKey: String,
  qty: Number,
  wishlist: Boolean
})

const oilSchema = new Schema({
  photosensitive: Boolean,
  topical: Boolean,
  dilute: Boolean,
  aromatic: Boolean,
  dietary: Boolean
})

const postSchema = new Schema({
  title: String,
  content: String,
  image: String
})

// create mongoose schema
const prodSchema = new Schema({
  sku: {
    type: Number,
    index: true,
    sparse: true
  },
  descr: String,
  unitIssue: String,
  size: String,
  wholesale: Number,
  retail: Number,
  pv: Number,
  category: String,
  oil: oilSchema,
  uses: [{ type: ObjectId, ref: 'Use' }],
  posts: [postSchema],
  ingredients: [Ingredient.schema],
  inventory: [inventorySchema]
})

// create mongoose model
export const Product = mongoose.model('Product', prodSchema)
export const Oil = mongoose.model('Oil', oilSchema)
export const Post = mongoose.model('Post', postSchema)
