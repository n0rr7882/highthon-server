var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/posts', require('./post'));
router.use('/comments', require('./comment'));

module.exports = router;
