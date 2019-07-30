import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const inventorySchema = new Schema({
  prod: { type: ObjectId, ref: 'Product' },
  apiKey: String,
  qty: Number,
  wishlist: Boolean
})

export const Inventory = mongoose.model('Inventory', inventorySchema)
