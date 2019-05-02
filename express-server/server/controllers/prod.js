import { Product, Oil } from '../models/product.js';
import mongoose from 'mongoose'
// import Recipe from '../models/recipe'

/* GET all products. */
export function getProducts (req, res) {
  Product.find({}).sort({category: 1, sku: 1}).exec((error, products) => {
      if (error) res.status(500).send(error)

      res.status(200).send(products);
  });
}

/* GET one product. */
export function getProduct (req, res) {
  const id = mongoose.Types.ObjectId(req.params.id)
  // Product.findById(id).
  Product.aggregate([
    { $match: { _id: id } }, 
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: 'ingredients.product',
        as: 'recipes'
      },
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
        localField: 'contains',
        foreignField: '_id',
        as: 'contains'
      }, 
    },
    {
      $lookup: {
        from: 'products',
        localField: 'containedIn',
        foreignField: '_id',
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
  ]).
  exec((error, product) => {
    if (error) res.status(500).send(error)
    res.status(200).send(product[0]);
  })
}

/* GET product search results. */
/* if query is string, do regex substring match,
   else, do exact match on the sku # */
export function searchProducts(req, res) {
  const k = req.params.category;
  const q = req.query.q;
  let search;
  if (isNaN(q) && q !== 'true') {
    search = {[k]: { "$regex": q, "$options": "i" } };
  } else {
    search = {[k]: q };
  }
  Product.find(search).sort({category: 1, sku: 1}).exec((error, products) => {
    if (error) res.status(500).send(error)

    res.status(200).send(products);
  });
}

// CREATE product
export function createProduct(req, res) {
  const { sku, descr, size, category, qty, wholesale, retail, pv, wishlist, oil, photosensitive, topical, dilute, aromatic } = req.body;
  let product = new Product({ sku, descr, size, category, qty, wholesale, retail, pv, wishlist });
  if (oil) {
    product.oil = new Oil({ photosensitive, topical, dilute, aromatic });
  }

  product.save((error, prod) => {
    if (error) res.status(500).send(error);

    res.status(201).send(prod);
  });
}

/* Delete one product. */
export function deleteProduct(req, res) {
  Product.findByIdAndRemove(req.params.id, (error) => {
    if (error) res.status(500).send(error)

    res.status(200).send(req.params.id)
  })
}

/* Update one product */
export function updateProduct(req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true }).
  populate('contains').
  populate('containedIn').
  exec((error, product) => {
    if (error) res.status(500).send(error)

    res.status(200).send(product);
});
}
