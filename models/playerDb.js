module.exports = function (sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name.",
        },
      },
    },
    score: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    playerUUID: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  });
  return Player;
};
