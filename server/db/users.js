const sequelize = require('./connection');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // options
});

module.exports = User;