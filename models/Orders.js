import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import CartItems from "./CartItems";
import Cart from "./Cart";

class Orders extends Model {

}

Orders.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    productId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        allowNull: false,
    },
    deliveryStatus: {
        type: DataTypes.ENUM('deliver', 'not deliver'),
        allowNull: false,
        defaultValue: 'not deliver'
    },
}, {
    sequelize,
    modelName: 'orders',
    tableName: 'orders',
});


export default Orders;
