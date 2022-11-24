import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';

class Products extends Model {

}

Products.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL.UNSIGNED,
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL,
  },
  shop: {
    type: DataTypes.ENUM('available', 'not available'),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('parent', 'null', 'parentId'),
  },
}, {
  sequelize,
  modelName: 'products',
  tableName: 'products',
});

export default Products;
