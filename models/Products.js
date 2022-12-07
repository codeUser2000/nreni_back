import {DataTypes, Model} from 'sequelize';
import sequelize from '../services/sequelize';
import md5 from "md5";

class Products extends Model {

}

Products.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL.UNSIGNED,
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL,
    },
    shop: {
        type: DataTypes.ENUM('available', 'not available'),
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            let avatar = this.getDataValue('avatar');
            if (!avatar) {
                const email = this.getDataValue('email').toLowerCase();
                return  `https://www.gravatar.com/avatar/${md5(email)}?d=wavatar`;
            }
            return avatar
        }
    }

}, {
    sequelize,
    modelName: 'products',
    tableName: 'products',
});

export default Products;
