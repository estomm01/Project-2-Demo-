module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    user_name: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    zip_code: DataTypes.STRING,
    email: DataTypes.STRING,
    pswd: DataTypes.STRING
  });
  return User;
};
