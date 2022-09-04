const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User.js');
const { userLoginSchema, userRegisterSchema } = require('../validation.js');

router.post('/register', async (req, res) => {
  // Validate User data
  const { error } = userRegisterSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user(email) already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists!');

  // Hash the user password
  const passwordSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt);

  // Create the new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Add the user to the database
  try {
    const newUser = await user.save();
    res.send({ user: newUser._id });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/login', async (req, res) => {
  // Validate User data
  const { error } = userLoginSchema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check if user has an account
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send('Email does not exists!');

  // Compare the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.send('Password is not correct!');

  res.status(200).send(req.body);
});

module.exports = router;
