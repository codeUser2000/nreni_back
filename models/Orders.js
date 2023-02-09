import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import CartItems from "./CartItems";
import Cart from "./Cart";
import Products from "./Products";
import Like from "./Like";
import Users from "./Users";

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

// Orders.belongsTo(Users, {
//     foreignKey: 'userId',
//     as: 'orders',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
// });
//
// Users.hasMany(Orders, {
//     foreignKey: 'userId',
//     as: 'userOrder',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
// })


export default Orders;
