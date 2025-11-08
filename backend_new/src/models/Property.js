const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sqft: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    garages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('For_sale', 'For_rent'),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'properties',
    timestamps: false,
  });
};
