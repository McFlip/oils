const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// create mongoose schema
const useSchema = new Schema({
  title: String,
  products: [{ type: ObjectId, ref: 'Product'}],
  recipes: [{ type: ObjectId, ref: 'Recipe' }],
});

// create mongoose model
export default mongoose.model('Use', useSchema);
