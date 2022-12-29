import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import CartItems from "./CartItems";


class Cart extends Model {

}

Cart.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
}, {
    sequelize,
    modelName: 'cart',
    tableName: 'cart',
});

CartItems.belongsTo(Cart, {
    foreignKey: 'cartId',
    as: 'carts',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Cart.hasMany(CartItems, {
    foreignKey: 'cartId',
    as: 'cartItem',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})

export default Cart;
