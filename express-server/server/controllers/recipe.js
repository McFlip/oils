import { Recipe } from '../models/recipe.js'

// get recipe
export function getRecipe (req, res) {
  const { id } = req.params
  Recipe.findById(id)
    .populate('ingredients.product')
    .populate('uses')
    .exec((err, recipe) => {
      if (err) res.status(500).send(err)
      let r = {
        title: recipe.title,
        directions: recipe.directions,
        uses: [],
        ingredients: []
      }
      recipe.uses.map((use) => {
        let u = {
          _id: use._id,
          title: use.title
        }
        r.uses.push(u)
      })
      recipe.ingredients.map((ingredient) => {
        let i = {
          _id: ingredient._id,
          qty: ingredient.qty,
          product: {
            _id: ingredient.product._id,
            descr: ingredient.product.descr
          }
        }
        r.ingredients.push(i)
      })
      res.status(200).send(r)
    })
}
// GET search results
export function searchRecipes (req, res) {
  const { q } = req.query
  const search = { 'title': { '$regex': q, '$options': 'i' } }
  Recipe.find(search).exec((err, recipes) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).send(recipes)
  })
}
// CREATE a recipe
export function createRecipe (req, res) {
  const { title } = req.body
  let recipe = new Recipe({ title })
  recipe.directions = 'brand new recipe'
  recipe.save((err, r) => {
    if (err) res.status(500).send(err)
    res.status(201).send(r)
  })
}
// UPDATE recipe
export function updateRecipe (req, res) {
  Recipe.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .populate('ingredients.product')
    .populate('uses')
    .exec((err, recipe) => {
      if (err) res.status(500).send(err)
      let r = {
        title: recipe.title,
        directions: recipe.directions,
        uses: [],
        ingredients: []
      }
      recipe.uses.map((use) => {
        let u = {
          _id: use._id,
          title: use.title
        }
        r.uses.push(u)
      })
      recipe.ingredients.map((ingredient) => {
        let i = {
          _id: ingredient._id,
          qty: ingredient.qty,
          product: {
            _id: ingredient.product._id,
            descr: ingredient.product.descr
          }
        }
        r.ingredients.push(i)
      })
      res.status(200).send(r)
    })
}

export function deleteRecipe (req, res) {
  const { id } = req.params
  // cascade delete ref
  Recipe.findByIdAndRemove(id, (error) => {
    if (error) res.status(500).send(error)
    res.status(204)
  })
}
