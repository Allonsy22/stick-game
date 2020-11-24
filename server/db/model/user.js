module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    totalGames: {
      type: Sequelize.INTEGER,
    },
    winning: {
      type: Sequelize.INTEGER,
    },
    winRate: {
      type: Sequelize.DECIMAL,
    },
  });

  // User.sync({ force: true });

  return User;
};