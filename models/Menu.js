import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import menuData from "../services/menuData";


class Menu extends Model {

}

Menu.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translationEn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translationRu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translationArm: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu',
});

// (async () => {
//     for (const menu of menuData){
//         await Menu.create({ title: menu.title, link: menu.link, translationEn: menu.translationEn,translationRu: menu.translationRu, translationArm:menu.translationArm});
//     }
//
// })()

// CartItems.belongsTo(Cart, {
//     foreignKey: 'cartId',
//     as: 'carts',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
// });
//
// Menu.hasMany(CartItems, {
//     foreignKey: 'cartId',
//     as: 'cartItem',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
// })

export default Menu;
