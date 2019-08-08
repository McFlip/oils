import { Product, Oil, Post } from '../models/product.js'
import { Inventory } from '../models/inventory'
import mongoose from 'mongoose'
import { Recipe, Ingredient } from '../models/recipe'
import _ from 'lodash'

/* GET all products. */
export function getProducts (req, res) {
  if (!req.search) req.search = {}
  Product
    .aggregate([
      { $match: req.search },
      {
        $lookup: {
          from: 'inventories',
          let: { id: '$_id' },
          pipeline: [
            {
              $match:
              {
                $expr:
                {
                  $and:
                    [
                      { $eq: ['$apiKey', req.user.sub] },
                      { $eq: ['$$id', '$prod'] }
                    ]
                }
              }
            }
          ],
          as: 'inventory'
        }
      },
      {
        $project: {
          category: 1,
          sku: 1,
          descr: 1,
          size: 1,
          inventory: 1
        }
      },
      {
        $sort: { category: 1, sku: 1 }
      }
    ])
    .exec((error, prods) => {
      if (error) res.status(500).send(error)
      res.status(200).send(prods)
    })
}

/* GET one product. */
export function getProduct (req, res) {
  const id = mongoose.Types.ObjectId(req.params.id)
  // TODO: optimize each lookup with a pipeline - project only needed data for each subdoc
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
    },
    {
      $lookup: {
        from: 'inventories',
        let: { id: '$_id' },
        pipeline: [
          {
            $match:
              { $expr:
                { $and:
                  [
                    { $eq: [ '$apiKey', req.user.sub ] },
                    { $eq: [ '$$id', '$prod' ] }
                  ]
                }
              }
          }
        ],
        as: 'inventory'
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
    const sku = parseInt(q)
    req.search = { [k]: sku }
  }
  getProducts(req, res)
}

// GET all items on your wishlist
export function getWishlist (req, res) {
  // TODO: generalize this to also get instock items
  Inventory.find({ apiKey: req.user.sub, wishlist: true })
    .populate('prod')
    .exec((err, inv) => {
      if (err) res.status(500).send(err)
      const prods = inv.map(i => {
        const { prod, qty, wishlist } = i
        prod.set('inventory', [{ qty, wishlist }])
        return prod
      })
      res.status(200).send(prods)
    })
}

// CREATE product
export function createProduct (req, res) {
  const { sku, descr, size, category, qty, wholesale, retail, pv, wishlist, oil, photosensitive, topical, dilute, aromatic } = req.body
  const apiKey = req.user.sub
  let product = new Product({ sku, descr, size, category, wholesale, retail, pv })
  if (oil) {
    product.oil = new Oil({ photosensitive, topical, dilute, aromatic })
  }
  product.save((error, p) => {
    if (error) res.status(500).send(error)
    const prod = req.params.id = p._id
    const inv = new Inventory({ prod, qty, wishlist, apiKey })
    inv.save((err) => {
      if (err) res.status(500).send(err)
      getProduct(req, res)
    })
  })
}

/* Delete one product. */
export function deleteProduct (req, res) {
  const { id } = req.params
  // enforce ref integrity with cascade delete
  Product.findById(id)
  // cleanup filesystem
    .then(prod => {
      prod.posts.map((post) => {
        if (post.image) {
          req.gfs.remove({ filename: post.image })
        }
      })
      return prod
    })
    // cleanup inventory
    .then(product => {
      Inventory.deleteMany({ prod: id }).exec()
      return product
    })
    // modify recipe ingredient lists
    .then(prod => {
      Recipe.find({ 'ingredients.product': id })
        .exec((error, recipes) => {
          if (error) console.log(error) // eslint-disable-line no-console
          recipes.forEach(recipe => {
            let vals = _.filter(recipe.ingredients, i => i.product != id) // eslint-disable-line eqeqeq
            recipe.set({ ingredients: vals, Ingredient })
            recipe.save()
          })
        })
      return prod
    })
    // if all goes well delete the prod
    .then(prod => prod.remove())
    .then(res.status(200).send(id))
    .catch(err => res.status(500).send(err))
}

/* Update one product */
export function updateProduct (req, res) {
  const { qty, wishlist } = req.body
  const val = { qty, wishlist }
  const { id } = req.params
  const { sub } = req.user
  Inventory.findOne({ prod: id, apiKey: sub })
    .exec((err, inv) => {
      if (err) res.status(500).send(err)
      // if the inventory item doesn't exist yet, create one
      if (!inv) {
        inv = new Inventory({
          apiKey: sub,
          prod: id,
          qty,
          wishlist
        })
        inv.save((err) => {
          if (err) res.status(500).send(err)
          delete req.body.qty
          delete req.body.wishlist
          Product.findByIdAndUpdate(req.params.id, { $set: req.body })
            .exec((error) => {
              if (error) res.status(500).send(error)
              getProduct(req, res)
            })
        })
      } else {
        inv.update({ $set: val })
          .exec((err) => {
            if (err) res.status(500).send(err)
            delete req.body.qty
            delete req.body.wishlist
            Product.findByIdAndUpdate(req.params.id, { $set: req.body })
              .exec((error) => {
                if (error) res.status(500).send(error)
                getProduct(req, res)
              })
          })
      }
    })
}

export function updateInventory (req, res) {
  const { id } = req.params
  const { sub } = req.user
  Inventory.findOne({ prod: id, apiKey: sub })
    .exec((err, inv) => {
      if (err) res.status(500).send(err)
      // if the inventory item doesn't exist yet, create one
      if (!inv) {
        const { qty, wishlist } = req.body
        inv = new Inventory({
          apiKey: sub,
          prod: id,
          qty,
          wishlist
        })
        inv.save((err) => {
          if (err) res.status(500).send(err)
          getProduct(req, res)
        })
      } else {
        inv.update({ $set: req.body })
          .exec((err) => {
            if (err) res.status(500).send(err)
            getProduct(req, res)
          })
      }
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
