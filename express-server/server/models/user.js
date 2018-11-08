const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create mongoose schema
const userSchema = new Schema({
  name: String,
  age: Number
});

// create mongoose model
export default mongoose.model('User', userSchema);
