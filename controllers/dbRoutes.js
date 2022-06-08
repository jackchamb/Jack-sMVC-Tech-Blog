const router = require('express').Router();
const AuthController = require('../controllers/authController');
const { User, Post, Comment } = require('../models');
//grab all posts
router.get('/', AuthController, (req, res) => {
    Post.findALL({
        Where: {
            userId: req.user.id
        },
        attributes: ['id', 'title', 'postText', 'createdAt'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['username']
        }, 
        {
            model: Comment,
            attributes: ['commentText', 'createdAt', 'userId', 'postId'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// grab one post
router.get('/:id', AuthController, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'postText', 'createdAt'],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['commentText', 'createdAt', 'userId', 'postId'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('editPost', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// create a new post
router.get('/new', AuthController, (req, res) => {
    res.render('newPost');
});
module.exports = router;



