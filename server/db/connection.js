const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:allonsy53306@:5432/users')
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:');
  });

module.exports = sequelize;