const router = require('express').Router();
const userCommentsRoute = require('./userCommentsRoute');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/userComments', userCommentsRoute);
router.use('/api/posts', postRoutes);
router.use('/api/users', userRoutes);

module.exports = router;