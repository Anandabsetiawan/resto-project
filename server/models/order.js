'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Order.belongsTo(models.Menu, {
        foreignKey: 'productId'
      })
    }
  }
  Order.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ProductId is required'
        },
        notNull: {
          msg: 'ProductId is required'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId is required'
        },
        notNull: {
          msg: 'UserId is required'
        }
      }
    },
    totalPrice: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};