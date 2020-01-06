import Use from '../models/use.js'
import { Product } from '../models/product.js'
import { Recipe } from '../models/recipe.js'
import _ from 'lodash'
import mongoose from 'mongoose'

// get uses for item
export function getUses (req, res) {
  const { id, refType } = req.params
  if (refType === 'product') {
    Product.findById(id)
      .populate('uses')
      .exec((err, prod) => {
        if (err) res.status(500).send(err)
        res.status(200).send(prod.uses)
      })
  } else {
    Recipe.findById(id)
      .populate('uses')
      .exec((err, recipe) => {
        if (err) res.status(200).send(err)
        res.status(200).send(recipe.uses)
      })
  }
}

// get single use
export function getUse (req, res) {
  const id = mongoose.Types.ObjectId(req.params.id)
  Use
    .aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'uses',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: 'recipes',
          localField: '_id',
          foreignField: 'uses',
          as: 'recipes'
        }
      }
    ])
    .exec((err, use) => {
      if (err) res.status(500).send(err)
      res.status(200).send(use[0])
    })
}

// remove a reference to a product or recipe
export function removeUse (req, res) {
  const { id, category, refId } = req.params
  if (category === 'product') {
    Product.findById(refId, (err, prod) => {
      if (err) res.status(500).send(err)
      _.remove(prod.uses, i => i.toString() === id)
      prod.markModified('uses')
      prod.save()
    })
  } else if (category === 'recipe') {
    Recipe.findById(refId, (err, recipe) => {
      if (err) res.status(500).send(err)
      _.remove(recipe.uses, i => i.toString() === id)
      recipe.markModified('uses')
      recipe.save()
    })
  } else {
    res.status(500).send('invalid category')
  }
  res.status(200).send({ id, refId, category })
}

export function addUse (req, res) {
  const { id, category, refId } = req.params
  if (category === 'product') {
    Product.findById(refId, (err, prod) => {
      if (err) res.status(500).send(err)
      prod.uses.push(id)
      prod.markModified('uses')
      prod.save()
    })
  } else if (category === 'recipe') {
    Recipe.findById(refId, (err, recipe) => {
      if (err) res.status(500).send(err)
      recipe.uses.push(id)
      recipe.markModified('uses')
      recipe.save()
    })
  } else {
    res.status(500).send('invalid category')
  }
  res.status(200).send(id)
}

export function searchUses (req, res) {
  const { q } = req.query
  const search = { 'title': { '$regex': q, '$options': 'i' } }
  Use.find(search).exec((err, uses) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).send(uses)
  })
}

export function createUse (req, res) {
  const newUse = new Use()
  newUse.title = req.body.title
  newUse.save((err, use) => {
    if (err) res.status(500).send(err)
    if (req.body.category === 'product') {
      Product.findById(req.body.refId)
        .exec((err, prod) => {
          if (err) res.status(500).send(err)
          prod.uses.push(use._id)
          prod.save((err) => {
            if (err) res.status(500).send(err)
            res.status(200).send(use._id)
          })
        })
    } else {
      Recipe.findById(req.body.refId)
        .exec((err, recipe) => {
          if (err) res.status(500).send(err)
          recipe.uses.push(use._id)
          recipe.save((err) => {
            if (err) res.status(500).send(err)
            res.status(200).send(use._id)
          })
        })
    }
  })
}

export function deleteUse (req, res) {
  const { id } = req.params
  Product.find({ uses: id }, (err, prods) => {
    if (err) res.status(500).send(err)
    prods.map(p => {
      p.uses = _.filter(p.uses, i => i !== id)
      p.save((err) => {
        if (err) res.status(500).send(err)
      })
    })
  })
  Recipe.find({ uses: id }, (err, recipes) => {
    if (err) res.status(500).send(err)
    recipes.map(r => {
      r.uses = _.filter(r.uses, i => i !== id)
      r.save((err) => {
        if (err) res.status(500).send(err)
      })
    })
  })
  Use.findByIdAndRemove(id, (err) => {
    if (err) res.status(500).send(err)
    res.status(200).send(id)
  })
}
