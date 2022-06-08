const router = require('express').Router();
const AuthController = require('../utils/authController');
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', AuthController, (req, res) => {
    if (req.session) {
        Comment.create({
            commentText: req.body.commentText,
            userId: req.session.userId,
            postId: req.body.postId
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => { if (!dbCommentData){
        res.status(404).json({ message: 'No comment found with this id' });
        return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;
