module.exports = function (sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          validateName(val) {
            if (val.trim().length === 0) {
                throw new Error('Please enter your name.');
                
            }
        },
     },
    },
    score: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    activeState: {
      type: DataTypes.INTEGER,
    },
    playerUUID: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
   
  });
  return Player;
};
