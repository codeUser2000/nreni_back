import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import Products from "./Products";

class Categories extends Model {

}

Categories.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('ring', 'bracelet', 'necklace', 'earring', 'collection'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'categories',
    tableName: 'categories',
});

Products.belongsTo(Categories, {
    foreignKey: 'categoryId',
    as: 'categories',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Categories.hasMany(Products, {
    foreignKey: 'categoryId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})
export default Categories;
