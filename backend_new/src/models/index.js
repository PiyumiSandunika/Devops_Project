const { Sequelize } = require('sequelize');
const CustomerModel = require('./Customer');
const PropertyModel = require('./Property');
const UserModel = require('./User');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const Customer = CustomerModel(sequelize);
const Property = PropertyModel(sequelize);
const User = UserModel(sequelize);

module.exports = {
  sequelize,
  Customer,
  Property,
  User,
};
