const express = require('express');
const router = express.Router();

const db = require('../../db');
const User = db.user;

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  res.status(200).json(user);
});

module.exports = router;