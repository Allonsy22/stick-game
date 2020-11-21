const db = require('../db');
const User = db.user;

const { API_KEY } = require('../config/email.config');
const quickemailverification = require('quickemailverification').client(API_KEY).quickemailverification();

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Email is already in use!'
      });
      return;
    }

    next();
  });
};

checkForEmailValidation = (req, res, next) => {
  quickemailverification.verify(req.body.email, function (err, response) {
    if (response.body.result !== 'valid') {
      res.send({ message: "Email address doesn't exist" });
    } else if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail,
  checkForEmailValidation,
};

module.exports = verifySignUp;