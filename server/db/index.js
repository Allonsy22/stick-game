const config = require('../config/db.config');
const Sequelize = require('sequelize');


const sequelize = new Sequelize(`${config.dialect}://${config.USER}:${config.PASSWORD}@:${config.PORT}/${config.DB}`)
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:');
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./model/user')(sequelize, Sequelize);

module.exports = db;