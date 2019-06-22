// module.exports = function (sequelize, DataTypes) {
//   var Example = sequelize.define("Example", {
//     text: DataTypes.STRING,
//     description: DataTypes.TEXT
//   });
//   return Example;
// };

module.exports = function (sequelize, DataTypes) {
  var Match = sequelize.define("Match", {
    pet_match: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pet_rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Match;
}
