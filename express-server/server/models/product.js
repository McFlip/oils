import { Use } from "./use.js";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const picHost = '/img/'; // root url for pic host

// child schemas
const prod_gfxSchema = new Schema({
  picture: {
    type: String,
    get: v => `${picHost}${v}`
  }
});

const oilSchema = new Schema({
  photosensitive: Boolean,
  topical: Boolean,
  dilute: Boolean,
  aromatic: Boolean,
  dietary: Boolean
});

// create mongoose schema
const prodSchema = new Schema({
  sku: {
    type: Number,
    index: true,
    sparse: true
  },
  descr: String,
  unit_issue: String,
  size: String,
  wholesale: Number,
  retail: Number,
  pv: Number,
  category: String,
  oil: oilSchema,
  qty: Number,
  wishlist: Boolean,
  pics: [prod_gfxSchema],
  uses: [{ type: ObjectId, ref: 'Use'}],
  recipes: [{ type: ObjectId, ref: 'Recipe' }],
  posts: [{ type: ObjectId, ref: 'Post'}],
  contains: [{ type: ObjectId, ref: 'Product'}],
  containedIn: [{ type: ObjectId, ref: 'Product'}]
});

// create mongoose model
export const Product = mongoose.model('Product', prodSchema);
export const Oil = mongoose.model('Oil', oilSchema);
