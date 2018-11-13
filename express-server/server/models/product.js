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
  aromatic: Boolean
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
  uses: [String],
  recipes: [{ type: ObjectId, ref: 'Recipe' }],
  posts: [{ type: ObjectId, ref: 'Post'}]
});

// create mongoose model
export default mongoose.model('Product', prodSchema);
