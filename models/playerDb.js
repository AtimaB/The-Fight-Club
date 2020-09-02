module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Post", {
      name: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
              notNull: {
                  msg: "Please enter your name."
              }
          }
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  });
  return Player;
};