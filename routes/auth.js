const router = require('express').Router();
const User = require('../models/User.js');
const Joi = require('joi');

// Validation
const userSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post('/register', async (req, res) => {
  // Validate User data
  const { error } = userSchema.validate(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
  }
  res.status(200).send(req.body);

  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  // try {
  //   const newUser = await user.save();
  //   res.send(newUser);
  // } catch (error) {
  //   res.status(404).send(error);
  // }
});

router.post('/login', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  res.status(200).send(user);
});

module.exports = router;
