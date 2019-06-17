const Sequelize = require('sequelize');
const env = require('./config/config');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userInfo = require('../models/userInfo.js')(sequelize, Sequelize);
db.pet = require('../models/pet.js')(sequelize, Sequelize);
db.match = require('../models/match.js')(sequelize, Sequelize);

//need to set up relations
db.pet.belongsTo(db.userInfo);
db.userInfo.hasMany(db.pet);
db.userInfo.belongsTo(db.match);
db.match.hasMany(db.pet);

module.exports = db;
