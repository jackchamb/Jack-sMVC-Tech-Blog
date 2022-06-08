const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'postText', 'createdAt'],
        include: [{
            model: Comment,
            attributes: ['commentText', 'createdAt', 'userId', 'postId'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
            },
            attributes: ['id', 'title', 'postText', 'createdAt'],
            include: [{
                model: Comment,
                attributes: ['commentText', 'createdAt', 'userId', 'postId'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('OnePost', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




    
    
