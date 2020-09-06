module.exports = function (sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: "Please enter your name.",
        },
      },
    },
    score: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  });
  return Player;
};
