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

Like.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'userLike',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Users.hasMany(Like, {
    foreignKey: 'userId',
    as: 'like',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})
Like.belongsTo(Products, {
    foreignKey: 'productId',
    as: 'productLike',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Products.hasMany(Like, {
    foreignKey: 'productId',
    as: 'likeCount',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})

export default Like;
