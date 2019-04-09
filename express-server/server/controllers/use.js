import Use from "../models/use.js";
import {Product} from "../models/product.js";
import _ from "lodash";

// get uses for item
export function getUses( req, res) {
  const { id, refType } = req.params;
  if (refType == 'product') {
    Product.findById(id).
    populate('uses').
    exec((err, prod) => {
      if (err) res.status(500).send(error)
      res.status(200).send(prod.uses);
    });
  } else {
    // TODO: Recipe.find
  }
}

// remove a reference to a product or recipe
export function removeUse( req, res ) {
  const { id, category, refId } = req.params;
  Use.findById(id, function (err, use) {
    if (err) {
      res.status(500).send(error);
    }
    if (category == 'product') {
      use.products = _.filter(use.products, i => i != refId);
      Product.findById(refId, (err, prod) => {
        if (err) res.status(500).send(error);
        prod.uses = _.filter(prod.uses, i => i == refId);
        prod.save();
      });
    } else if (category == 'recipe') {
      use.recipes = _.filter(use.recipes, i => i != refId);
    } else {
      res.status(500).send('invalid category')
    }
    use.save();
    res.status(200).send({id,refId});
  });
}

export function addUse( req, res ) {
  const { id, category, refId } = req.params;
  Use.findById(id, function (err, use) {
    if (err) {
      res.status(500).send(error);
    }
    if (category == 'product') {
      use.products.push(refId);
      Product.findById(refId, (err, prod) => {
        if (err) res.status(500).send(error);
        prod.uses.push(id);
        prod.save();
      });
    } else if (category == 'recipe') {
      use.recipes.push(refId);
    } else {
      res.status(500).send('invalid category')
    }
    use.save();
    res.status(200).send(id);
  });
}

export function searchUses( req, res ) {
  const { q } = req.query;
  const search = {'title': { "$regex": q, "$options": "i" } };
  Use.find(search).exec((err, uses) => {
    if (err) {
      res.status(500).send(error);
    }
    res.status(200).send(uses);
  });
}
