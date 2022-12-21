import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import CartItem from "./CartItem";


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
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: 'email',
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'cart',
    tableName: 'cart',
});

CartItem.belongsTo(Cart, {
    foreignKey: 'cartId',
    as: 'carts',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Cart.hasMany(CartItem, {
    foreignKey: 'cartId',
    as: 'cartItem',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})

export default Cart;
