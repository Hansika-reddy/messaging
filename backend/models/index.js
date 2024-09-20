const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  username: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

sequelize.sync();

module.exports = { sequelize, User };
