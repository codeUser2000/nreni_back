import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import md5 from "md5";

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
    countProduct: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10,2).UNSIGNED,
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL,
    },
    shop: {
        type: DataTypes.ENUM('available', 'not available'),
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    like: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        default: 0,
    }
}, {
    sequelize,
    modelName: 'products',
    tableName: 'products',
});

export default Products;
