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
