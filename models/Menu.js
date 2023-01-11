import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import menuData from "../services/menuData";


class Menu extends Model {

}

Menu.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translationEn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translationRu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translationArm: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu',
});


export default Menu;
