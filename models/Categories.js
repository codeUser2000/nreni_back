import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/sequelize';

class Categories extends Model {

}

Categories.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.ENUM('ring', 'bracelet', 'necklace', 'earring', 'collection'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'categories',
  tableName: 'categories',
});

export default Categories;
