import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';


class InformationText extends Model {

}

InformationText.init({
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
    desc: {
        type: DataTypes.TEXT("long"),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'infoText',
    tableName: 'infoText',
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

export default InformationText;
