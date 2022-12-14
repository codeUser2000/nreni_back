import {DataTypes, Model} from "sequelize";
import md5 from "md5";
import sequelize from "../services/sequelize";
import Cart from "./Cart";

const {PASSWORD_SECRET} = process.env;

class Users extends Model {
    static passwordHash = (val) => md5(md5(val) + PASSWORD_SECRET)
}

Users.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthYear: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: 'email',
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
    },
    confirmToken: {
        type: DataTypes.CHAR(36),
        allowNull: true,
    },
    phone: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        unique: 'phone',
    },
    password: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        set(val) {
            if (val) {
                this.setDataValue('password', Users.passwordHash(val))
            }
        },
        get() {
            return undefined;
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'pending', 'deleted'),
        allowNull: false,
        defaultValue: 'pending'
    },
}, {
    sequelize,
    modelName: 'users',
    tableName: 'users'
});

(async () => {
    // const jane = Users.build({ firstName: "Jane", lastName: "Jane", email: "janesjhg@asd.asd",phone: '4545454500', birthYear:"2002-12-31", password: 'hello' });
    // await jane.save();
})()
Cart.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})

Users.hasOne(Cart,{
    foreignKey: 'userId',
    as: 'cart',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})

export default Users
