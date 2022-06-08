const apiRoutes = require('./apiRoutes');
const hrRoutes = require('./hr');
const dbRoutes = require('./db');
const router = require('express').Router();

router.use('/api', apiRoutes);
router.use('/hr', hrRoutes);
router.use('/db', dbRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;