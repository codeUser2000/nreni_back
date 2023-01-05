import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';


class Translations extends Model {

}

Translations.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    langCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translation: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'translation',
    tableName: 'translation',
});

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

export default Translations;
