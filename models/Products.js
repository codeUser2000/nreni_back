import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import md5 from "md5";
import Like from "./Like";

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
    oldPrice: {
        type: DataTypes.DECIMAL(10,2).UNSIGNED,
        allowNull: false,
    },
    newPrice: {
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
}, {
    sequelize,
    modelName: 'products',
    tableName: 'products',
});

Like.belongsTo(Products, {
    foreignKey: 'productId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Products.hasMany(Like, {
    foreignKey: 'productId',
    as: 'likeCount',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})
export default Products;
