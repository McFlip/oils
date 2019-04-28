import Use from "../models/use.js";
import {Product} from "../models/product.js";
import Recipe from '../models/recipe.js'
import _ from "lodash";

// get uses for item
export function getUses( req, res) {
  const { id, refType } = req.params;
  if (refType == 'product') {
    Product.findById(id).
    populate('uses').
    exec((err, prod) => {
      if (err) res.status(500).send(err)
      res.status(200).send(prod.uses);
    });
  } else {
    Recipe.findById(id).
    populate('uses').
    exec((err, recipe) => {
      if (err) res.status(200).send(err)
      res.status(200).send(recipe.uses)
    })
  }
}

// get single use
export function getUse( req, res ) {
  const { id } = req.params;
  Use.findById(id).populate("products").
  populate("recipes").
  exec((err, use) => {
    if (err) res.status(500).send(err)
    res.status(200).send(use);
  });
}

// remove a reference to a product or recipe
export function removeUse( req, res ) {
  const { id, category, refId } = req.params;
  Use.findById(id, function (err, use) {
    if (err) {
      res.status(500).send(err);
    }
    if (category == 'product') {
      _.remove(use.products, i => i == refId);
      use.markModified('product')
      Product.findById(refId, (err, prod) => {
        if (err) res.status(500).send(err);
        _.remove(prod.uses, i => i == id);
        prod.markModified('uses')
        prod.save();
      });
    } else if (category == 'recipe') {
      _.remove(use.recipes, i => i == refId);
      use.markModified('recipes')
      Recipe.findById(refId, (err, recipe) => {
        if (err) res.status(500).send(err); 
        _.remove(recipe.uses, i => i == id)
        recipe.markModified('uses')
        recipe.save()
      })
    } else {
      res.status(500).send('invalid category')
    }
    use.save();
    res.status(200).send({ id, refId, category });
  });
}

export function addUse( req, res ) {
  const { id, category, refId } = req.params;
  Use.findById(id, function (err, use) {
    if (err) {
      res.status(500).send(err);
    }
    if (category == 'product') {
      use.products.push(refId);
      use.markModified('products')
      Product.findById(refId, (err, prod) => {
        if (err) res.status(500).send(err);
        prod.uses.push(id);
        prod.markModified('uses')
        prod.save();
      });
    } else if (category == 'recipe') {
      use.recipes.push(refId);
      use.markModified('recipes')
      Recipe.findById(refId, (err, recipe) => {
        if (err) res.status(500).send(err); 
        recipe.uses.push(id)
        recipe.markModified('uses')
        recipe.save()
      })
    } else {
      res.status(500).send('invalid category')
    }
    use.save((err) => {if (err) res.status(500).send('didnt save')});
    res.status(200).send(id);
  });
}

export function searchUses( req, res ) {
  const { q } = req.query;
  const search = {'title': { "$regex": q, "$options": "i" } };
  Use.find(search).exec((err, uses) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(uses);
  });
}

export function createUse( req, res) {
  const newUse = new Use;
  newUse.title = req.body.title;
  if (req.body.category == "product") {
    newUse.products.push(req.body.refId);
  } else {
    newUse.recipes.push(req.body.refId);
    // TODO:  Recipe.findById
  }
  newUse.save((err, use) => {
    if (err) res.status(500).send(err);
    if (req.body.category == "product") {
      Product.findById(req.body.refId).
      exec((err, prod) => {
        if (err) res.status(500).send(err)
        prod.uses.push(use._id);
        prod.save((err) => {
          if (err) res.status(500).send(err)
          res.status(200).send(use._id);
        });
      });
    } else {
      Recipe.findById(req.body.refId).
      exec((err, recipe) => {
        if (err) res.status(500).send(err) 
        recipe.uses.push(use._id)
        recipe.save((err) => {
          if (err) res.status(500).send(err)          
          res.status(200).send(use._id)
        })
      })
    }
  });
}
