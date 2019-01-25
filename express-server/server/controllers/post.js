import Post from '../models/post.js';
import Product from '../models/product.js';

/* GET api listing. */
export function ping (req, res) {
  res.status(200).send('api works');
}

/* GET all posts. */
export function getPosts (req, res) {
  Product.findById(req.params.id).
  populate('posts').
  select('posts').
  exec((error, posts) => {
      if (error) res.status(500).send(error)
      res.status(200).send(posts.posts);
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
