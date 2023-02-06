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
    customerId: {
        type: DataTypes.STRING,
    },
    paymentIntent: {
        type: DataTypes.STRING,
    },
    products: {
        type: DataTypes.JSON,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        allowNull: false,
    },
    deliveryStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'orders',
    tableName: 'orders',
});


export default Orders;
