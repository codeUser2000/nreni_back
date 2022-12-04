import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';

class CartItem extends Model {

}

CartItem.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    ProductId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    CartId: {
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

export default CartItem;
