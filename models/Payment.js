import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import Products from "./Products";


class Payment extends Model {

}


Payment.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    cartName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cartNumber: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cvv:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }
}, {
    sequelize,
    modelName: 'products',
    tableName: 'products',
});


export default Payment;
