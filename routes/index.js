const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/sign', require('./sign'));
router.use('/users', require('./user'));
router.use('/posts', require('./post'));
router.use('/comments', require('./comment'));

module.exports = router;
