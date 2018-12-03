import Product from '../models/product.js';

/* GET all products. */
export function getProducts (req, res) {
  Product.find({}).sort({category: 1, sku: 1}).exec((error, products) => {
      if (error) res.status(500).send(error)

      res.status(200).send(products);
  });
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

/* GET one posts. */
export function getPost (req, res) {
  Post.findById(req.params.id, (error, posts) => {
      if (error) res.status(500).send(error)

      res.status(200).json(posts);
  });
}

/* Create a post. */
export function createPost (req, res) {
  let post = new Post({
      title: req.body.title,
      categories: req.body.categories,
      content: req.body.content
  });

  post.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
        message: 'Post created successfully'
    });
  });
}

/* Delete one post. */
export function deletePost (req, res) {
  Post.findByIdAndRemove(req.params.id, (error, posts) => {
    if (error) res.status(500).send(error)

    res.status(200).json(posts);
  });
}

/* Update one product */
export function updateProduct(req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true }, function (error, product) {
    if (error) res.status(500).send(error)

    res.status(200).send(product);
});
}
