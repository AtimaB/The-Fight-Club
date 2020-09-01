module.exports = function (sequelize, DataTypes) {
  var fightclub = sequelize.define("fightclub", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
  });
  return fightclub;
};
