import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';

class Blockquote extends Model {

}

Blockquote.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT("long"),
    }
}, {
    sequelize,
    modelName: 'blockquote',
    tableName: 'blockquote',
});

export default Blockquote;
