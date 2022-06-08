const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
    }, {
        hooks: {
            async beforeCreate(UserData) {
                UserData.password = await bcrypt.hash(UserData.password, 10);
                return UserData;
            },
            async beforeUpdate(UserDataUpdate) {
                UserDataUpdate.password = await bcrypt.hash(UserDataUpdate.password, 10);
                return UserDataUpdate;
            }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
    );
module.exports = User;
 
