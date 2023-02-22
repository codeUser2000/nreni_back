import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import Users from "./Users";
import Products from "./Products";


class Like extends Model {

}

Like.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    productId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'like',
    tableName: 'like',
});


export default Like;
