const router = require('express').Router();

const User = require('../models/User.js');
const { userLoginSchema, userRegisterSchema } = require('../validation.js');

router.post('/register', async (req, res) => {
  // Validate User data
  const { error } = userRegisterSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  res.status(200).json(req.body);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/login', (req, res) => {
  // Validate User data
  const { error } = userLoginSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  res.status(200).json(req.body);

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  res.status(200).json(user);
});

module.exports = router;
