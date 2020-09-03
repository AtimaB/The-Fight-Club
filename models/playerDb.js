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
  });
  Player.associate = function (models) {
    Player.hasMany(models.Score, {
      onDelete: "cascade",
    });
  };

  return Player;
};
