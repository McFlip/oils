const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// create mongoose schema
const postSchema = new Schema({
  title: String,
  content: String,
  image: String
});

// create mongoose model
export default mongoose.model('Post', postSchema);
