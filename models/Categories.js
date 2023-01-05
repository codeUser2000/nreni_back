import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import Products from "./Products";
import categoryData from "../services/categoryData";
import Menu from "./Menu";

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


// (async () => {
//     for (const category of categoryData){
//         await Categories.create({type: category.type});
//     }
//
// })()

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
