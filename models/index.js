const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

User.hasMany(Post, {
    foreignKey: 'userId'
});
Post.belongsTo(User, {
    foreignKey: 'userId'
});
Post.hasMany(Comment, {
    foreignKey: 'postId'
});
Comment.belongsTo(Post, {
    foreignKey: 'postId'
});
Comment.belongsTo(User, {
    foreignKey: 'userId'
});
User.hasMany(Comment, {
    foreignKey: 'userId'
});
module.exports = { User, Post, Comment };

