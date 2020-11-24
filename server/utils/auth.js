const db = require('../db');
const config = require('../config/auth.config');
const User = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');

const signup = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    totalGames: 0,
    winning: 0,
    winRate: 0,
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

const updateStatistics = (req, res) => {
  User.findOne(
    {
      where: { email: req.body.email },
    })
    .then(user => {
      let { totalGames, winning } = user;
      const newWinRate = getWinRate({ type: req.body.type, winning, totalGames });
      user.update({
        totalGames: db.sequelize.literal('"totalGames" + 1'),
        winRate: newWinRate,
        winning: req.body.type === 'win' ? winning + 1 : winning,
      })
        .then(response => {
          res.status(200).json(response);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

const getWinRate = (props) => {
  let { type, winning, totalGames } = props;
  if (type === 'win') {
    return Math.round(((winning + 1) * 100) / (totalGames + 1));
  }
  return Math.round((winning * 100) / (totalGames + 1));
};

module.exports = {
  signup,
  signin,
  getAll,
  updateStatistics,
};