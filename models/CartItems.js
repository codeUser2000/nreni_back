import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import Products from "./Products";

class CartItems extends Model {

}

CartItems.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    productId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        default: 0,
    },
    quantity: {
        type: DataTypes.INTEGER,
        min: 1,
        allowNull: false,
        default: 1,
    },
    status: {
        type: DataTypes.ENUM( 'unsold', 'sold out'),
        allowNull: false,
        defaultValue: 'unsold'
    },
}, {
    sequelize,
    modelName: 'cart_item',
    tableName: 'cart_item',
});


CartItems.belongsTo(Products,{
    foreignKey: 'productId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})

Products.hasMany(CartItems,{
    foreignKey: 'productId',
    as: 'product',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})


export default CartItems;
