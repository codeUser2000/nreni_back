import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';

class Categories extends Model {

}

Categories.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    parentId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'categories',
    tableName: 'categories',
});

export default Categories;
