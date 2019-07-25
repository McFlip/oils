import mongoose from 'mongoose'

const Schema = mongoose.Schema
const inventorySchema = new Schema({
  apiKey: String,
  qty: Number,
  wishlist: Boolean
})

export const Inventory = mongoose.model('Inventory', inventorySchema)
