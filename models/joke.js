const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Joke = sequelize.define("Joke", {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    response : {
        type:DataTypes.STRING,
        allowNull:false
    }
  });

  return Joke;
};
