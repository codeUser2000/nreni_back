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
    UserId: {
        type: DataTypes.BIGINT.UNSIGNED,
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
    message: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'blockquote',
    tableName: 'blockquote',
});

export default Blockquote;
