const router = require('express').Router();

const User = require('../models/User.js');
const { userLoginSchema, userRegisterSchema } = require('../validation.js');

router.post('/register', async (req, res) => {
  // Validate User data
  const { error } = userRegisterSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user(email) already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists!');

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/login', async (req, res) => {
  // Validate User data
  const { error } = userLoginSchema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check if user has an account
  const userExists = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (userExists) return res.send(userExists);

  res.status(200).send(req.body);

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  res.status(200).send(user);
});

module.exports = router;
