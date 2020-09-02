module.exports = function (sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Score.associate = function(models) {
  //     Score.belongsTo(models.Player, {
  //         foreignKey: {
  //             allowNull: false
  //         }
  //     });
  // };

  return Score;
};
