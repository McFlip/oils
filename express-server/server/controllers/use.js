import Use from '../models/use'
import { Product } from '../models/product'
import { Recipe } from '../models/recipe'
import _ from 'lodash'
import mongoose from 'mongoose'

// get uses for item
export function getUses (req, res, next) {
  const { id, refType } = req.params
  const getItem = refType === 'product' ? Product : Recipe
  getItem.findById(id)
    .populate('uses')
    .exec((err, item) => {
      if (err) return next(err)
      if (!item) {
        res.status(404).send('cannot find item by that ID')
      } else {
        res.status(200).send(item.uses)
      }
    })
}

// get single use
export function getUse (req, res, next) {
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
      /* istanbul ignore if */
      if (err) return next(err)
      res.status(200).send(use[0])
    })
}

// remove a reference to a product or recipe
export function removeUse (req, res, next) {
  const { id, category, refId } = req.params
  let item = null
  if (category === 'product') {
    item = Product
  } else if (category === 'recipe') {
    item = Recipe
  } else {
    next('invalid category')
  }
  item.findById(refId, (err, foundItem) => {
    if (err) return next(err)
    if (foundItem) {
      _.remove(foundItem.uses, i => i.toString() === id)
      foundItem.markModified('uses')
      foundItem.save()
      res.status(200).send({ id, refId, category })
    } else {
      res.status(404).send('unable to find ref by that ID')
    }
  })
}

export function addUse (req, res, next) {
  const { id, category, refId } = req.params
  let item = null
  if (category === 'product') {
    item = Product
  } else if (category === 'recipe') {
    item = Recipe
  } else {
    return next('invalid category')
  }
  item.findById(refId, (err, foundItem) => {
    if (err) return next(err)
    if (!foundItem) {
      res.status(404).send('unable to find item by that ID')
    } else {
      foundItem.uses.push(id)
      foundItem.markModified('uses')
      foundItem.save()
      res.status(200).send(id)
    }
  })
}

export function searchUses (req, res, next) {
  const { q } = req.query
  const search = { 'title': { '$regex': q, '$options': 'i' } }
  Use.find(search).exec((err, uses) => {
    if (err) return next(err)
    res.status(200).send(uses)
  })
}

export function createUse (req, res, next) {
  const { title, category, refId } = req.body
  const newUse = new Use()
  const item = category === 'product' ? Product : Recipe

  if (!title || !category || !refId) return next('missing required param')
  newUse.title = title
  newUse.save((err, use) => {
    /* istanbul ignore if */
    if (err) return next(err)
    item.findById(refId)
      .exec((err, foundItem) => {
        if (err) return next(err)
        if (!foundItem) return next('item not found by refId')
        foundItem.uses.push(use._id)
        foundItem.save((err) => {
          /* istanbul ignore if */
          if (err) return next(err)
          res.status(200).send(use._id)
        })
      })
  })
}

export function deleteUse (req, res, next) {
  const { id } = req.params
  /* istanbul ignore if */
  if (!mongoose.Types.ObjectId(id)) return next('bad id')
  Product.find({ uses: id }, (err, prods) => {
    /* istanbul ignore if */
    if (err) return next(err)
    prods.map(p => {
      p.uses = _.filter(p.uses, i => i !== id)
      p.save((err) => {
        /* istanbul ignore if */
        if (err) return next(err)
      })
    })
  })
  Recipe.find({ uses: id }, (err, recipes) => {
    /* istanbul ignore if */
    if (err) return next(err)
    recipes.map(r => {
      r.uses = _.filter(r.uses, i => i !== id)
      r.save((err) => {
        /* istanbul ignore if */
        if (err) return next(err)
      })
    })
  })
  Use.findByIdAndRemove(id, (err) => {
    /* istanbul ignore if */
    if (err) return next(err)
    res.status(200).send(id)
  })
}
