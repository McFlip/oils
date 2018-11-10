const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create mongoose schema
const postSchema = new Schema({
  title: String,
  categories: String,
  content: String
});

// create mongoose model
export default mongoose.model('Post', postSchema);
