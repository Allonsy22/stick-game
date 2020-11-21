const db = require('../db');
const config = require('../config/auth.config');
const User = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(() => {
      res.send({ message: 'User was registered successfully!' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// function for testing
const getAll = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).send({ message: error.message });
    });
};

module.exports = {
  signup,
  signin,
  getAll,
};