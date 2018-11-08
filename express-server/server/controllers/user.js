import User from '../models/user.js';

/* GET api listing. */
export function ping (req, res) {
  res.status(200).send('api works');
}

/* GET all users. */
export function getUsers (req, res) {
  User.find({}, (err, users) => {
      if (err) res.status(500).send(error)

      res.status(200).json(users);
  });
}

/* GET one users. */
export function getUser (req, res) {
  User.findById(req.param.id, (err, users) => {
      if (err) res.status(500).send(error)

      res.status(200).json(users);
  });
}

/* Create a user. */
export function createUser (req, res) {
  let user = new User({
      name: req.body.name,
      age: req.body.age
  });

  user.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
        message: 'User created successfully'
    });
  });
}
