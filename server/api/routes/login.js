const express = require('express');
const router = express.Router();

const User = require('../../db/users');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const { name, email, passwords } = req.body;
  const user = await User.create({ firstName: "Jane", lastName: "Doe" });
  res.status(200).json(user);
});

module.exports = router;