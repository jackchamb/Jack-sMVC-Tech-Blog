const AuthController = require('../utils/authController');
const { User, Post, Comment } = require('../models');
const router = require('express').Router();

//grab all posts
router.get('/', (req, res) => {
    Post.findAll({
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// grab one post
router.get('/:id', (req, res) => {
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
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// create a post
router.post('/', AuthController, (req, res) => {
    Post.create({
        title: req.body.title,
        postText: req.body.postText,
        userId: req.session.userId
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/:id', AuthController, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            postText: req.body.postText
        },
        {
            where: {
                id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// delete a post
router.delete('/:id', AuthController, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;

        
    