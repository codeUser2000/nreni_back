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
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
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
