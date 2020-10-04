import mongoose from 'mongoose'
const Schema = mongoose.Schema

// create mongoose schema
const useSchema = new Schema({
  title: String
})

// create mongoose model
export default mongoose.model('Use', useSchema)
