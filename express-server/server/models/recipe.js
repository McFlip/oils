/* eslint-disable no-unused-vars */
import { Product } from './product'
import { Use } from './use'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

// child schema
const ingredientSchema = new Schema({
  product: { type: ObjectId, ref: 'Product', index: true },
  qty: String
})

// create mongoose schema
const recipeSchema = new Schema({
  title: String,
  ingredients: [ingredientSchema],
  directions: String,
  uses: [{ type: ObjectId, ref: 'Use', index: true }]
})

// create mongoose model
export const Recipe = mongoose.model('Recipe', recipeSchema)
export const Ingredient = mongoose.model('Ingredient', ingredientSchema)
