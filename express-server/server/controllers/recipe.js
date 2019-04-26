// import Use from "../models/use.js";
// import {Product} from "../models/product.js";
import Recipe from "../models/recipe.js";
import _ from "lodash";
import marked from "marked";

// get recipe
export function getRecipe(req, res) {
  const { id } = req.params;
  Recipe.findById(id).
  populate("ingredients.product").
  populate("uses").
  exec((err, recipe) => {
    if (err) res.status(500).send(err)
    const md = marked(recipe.directions);
    let r = {
      title: recipe.title,
      directions: md,
      uses: [],
      ingredients: []
    };
    recipe.uses.map((use) => {
      let u = {
        _id: use._id,
        title: use.title
      };
      r.uses.push(u);
    });
    recipe.ingredients.map((ingredient) => {
      let i = {
        qty: ingredient.qty,
        product: {
          _id: ingredient.product._id,
          descr: ingredient.product.descr
        }
      };
      r.ingredients.push(i);
    })
    res.status(200).send(r);
  });
}
// GET search results
export function searchRecipes( req, res ) {
  const { q } = req.query;
  const search = {'title': { "$regex": q, "$options": "i" } };
  Recipe.find(search).exec((err, recipes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(recipes);
  });
}
// CREATE a recipe
export function createRecipe( req, res ) {
  const { title } = req.body
  let recipe = new Recipe({title})
  recipe.save((err, r) => {
    if (err) res.status(500).send(err)
    res.status(201).send(r)
  })
}
