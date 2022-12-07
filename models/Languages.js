import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';

class Languages extends Model {

}

Languages.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'language',
    tableName: 'language',
});

export default Languages;
