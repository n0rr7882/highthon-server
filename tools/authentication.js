const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization, config.salt, (err, decoded) => {
            if (!err && decoded) {
                req.user = decoded;
            }
        });
    }
    next();
};