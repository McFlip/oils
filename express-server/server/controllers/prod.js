import Product from '../models/product.js';

/* GET all products. */
export function getProducts (req, res) {
  Product.find({}).sort({category: 1, sku: 1}).exec((err, products) => {
      if (err) res.status(500).send(error)

      res.status(200).send(products);
  });
}

/* GET one posts. */
export function getPost (req, res) {
  Post.findById(req.params.id, (err, posts) => {
      if (err) res.status(500).send(error)

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
  Post.findByIdAndRemove(req.params.id, (err, posts) => {
    if (err) res.status(500).send(error)

    res.status(200).json(posts);
  });
}
