import { Product, Oil, Post } from '../models/product.js'
// TODO: refactor all qty and wishlist functions
// eslint-disable-next-line no-unused-vars
import { Inventory } from '../models/inventory'
import mongoose from 'mongoose'
import Recipe from '../models/recipe'
import _ from 'lodash'

/* GET all products. */
export function getProducts (req, res) {
  if (!req.search) req.search = {}
  Product.find(req.search)
    .select('category sku descr size')
    .sort({ category: 1, sku: 1 })
    .populate({
      path: 'inventory',
      select: 'qty wishlist',
      match: { apiKey: req.user.sub }
    })
    .exec((error, products) => {
      if (error) res.status(500).send(error)
      res.status(200).send(products)
    })
}

/* GET one product. */
export function getProduct (req, res) {
  const id = mongoose.Types.ObjectId(req.params.id)
  Product.aggregate([
    { $match: { _id: id } },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: 'ingredients.product',
        as: 'recipes'
      }
    },
    {
      $lookup: {
        from: 'uses',
        localField: 'recipes.uses',
        foreignField: '_id',
        as: 'useTitles'
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'ingredients.product',
        foreignField: '_id',
        as: 'contains'
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'ingredients.product',
        as: 'containedIn'
      }
    },
    {
      $lookup: {
        from: 'uses',
        localField: 'uses',
        foreignField: '_id',
        as: 'uses'
      }
    }
  ])
    .exec((error, product) => {
      if (error) res.status(500).send(error)
      res.status(200).send(product[0])
    })
}

/* GET product search results. */
/* if query is string, do regex substring match,
   else, do exact match on the sku # */
export function searchProducts (req, res) {
  const k = req.params.category
  const q = req.query.q
  req.search = {}
  if (isNaN(q) && q !== 'true') {
    req.search = { [k]: { '$regex': q, '$options': 'i' } }
  } else {
    req.search = { [k]: q }
  }
  getProducts(req, res)
}

// CREATE product
export function createProduct (req, res) {
  const { sku, descr, size, category, qty, wholesale, retail, pv, wishlist, oil, photosensitive, topical, dilute, aromatic } = req.body
  let product = new Product({ sku, descr, size, category, qty, wholesale, retail, pv, wishlist })
  if (oil) {
    product.oil = new Oil({ photosensitive, topical, dilute, aromatic })
  }

  product.save((error, prod) => {
    if (error) res.status(500).send(error)

    res.status(201).send(prod)
  })
}

/* Delete one product. */
export function deleteProduct (req, res) {
  const { id } = req.params
  // enforce ref integrity
  // cleanup filesystem
  Product.findById(id).exec((err, prod) => {
    if (err) res.status(500).send(err)
    prod.posts.map((post) => {
      if (post.image) {
        req.gfs.remove({ filename: post.image })
          .catch(err => res.status(500).send(err))
      }
    })
    Recipe.find({ 'ingredients.product': id })
      .exec((error, recipes) => {
        if (error) res.status(500).send(error)
        recipes.map(recipe => {
          recipe
            .populate('ingredients', (error, r) => {
              if (error) res.status(500).send(error)
              r.ingredients = _.filter(r.ingredients, i => i.product !== id)
              r.markModified('ingredients')
              r.save()
            })
        })
      })
    prod.remove()
    res.status(200).send(id)
  })
}

/* Update one product */
export function updateProduct (req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .exec((error) => {
      if (error) res.status(500).send(error)
      getProduct(req, res)
    })
}

/* Create a post. */
export function createPost (req, res) {
  const image = req.file ? req.file.filename : null
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
    image
  })

  Product.findById(req.body.id)
    .exec((err, prod) => {
      if (err) res.status(500).send(err)
      prod.posts.push(post)
      prod.save(err => {
        if (err) res.status(500).send(err)
        res.status(201).json({
          message: 'Post created successfully'
        })
      })
    })
}

// Get a post
export function getPost (req, res) {
  const { prodId, postId } = req.params
  Product.findById(prodId)
    .exec((err, prod) => {
      if (err) res.status(500).send(err)
      const post = prod.posts.id(postId)
      res.status(200).send(post)
    })
}

// UPDATE a post
export function updatePost (req, res) {
  const { postId } = req.params
  const { id, title, content, deleteImg } = req.body
  const image = req.file ? req.file.filename : null
  Product.findById(id).exec((err, prod) => {
    if (err) res.status(500).send(err)
    const post = prod.posts.id(postId)
    // set the text fields
    post.title = title
    post.content = content
    // set the image
    if (!!image || deleteImg === 'true') {
      req.gfs.remove({ filename: post.image })
        .catch(err => res.status(500).send(err))
        .then(() => {
          post.image = image
          prod.save(err => {
            if (err) res.status(500).send(err)
            res.status(201).json({
              message: 'Post updated successfully'
            })
          })
        })
    }
  })
}

// DELETE a post
export function deletePost (req, res) {
  const { prodId, postId } = req.params
  Product.findById(prodId).exec((err, prod) => {
    if (err) res.status(500).send(err)
    const post = prod.posts.id(postId)
    if (post.image) req.gfs.remove({ filename: post.image })
    post.remove()
    prod.save(err => {
      if (err) res.status(500).send(err)
      res.status(200).json({
        message: 'Post deleted successfully'
      })
    })
  })
}
