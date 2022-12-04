import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';

class Cart extends Model {

}

Cart.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    UserId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    status: {
        type: DataTypes.ENUM('active', 'pending', 'deleted'),
        allowNull: false,
        defaultValue: 'pending'
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

export default Cart;
