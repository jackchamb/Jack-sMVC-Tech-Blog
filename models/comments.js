const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comments extends Model {}
    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        userId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrence: {
                model: 'Users',
                key: 'id'
            }
        },
        postId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrence: {
                model: 'Posts',
                key: 'id'
            }
        }
     }, 
     {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments'
    }
    );
module.exports = Comments;