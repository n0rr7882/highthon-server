const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../models');
const config = require('../config/config');
const fv = require('../tools/validator');

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.username) return res.status(200).json({
        status: { success: false, message: '이름을 입력해주세요.' }
    }).end();

    if (!req.body.password) return res.status(200).json({
        status: { success: false, message: '암호를 입력해주세요.' }
    }).end();

    models.User.findOne({
        where: { username: req.body.username }
    })
        .then(user => {
            if (user && (fv.encryptPassword(req.body.password) === user.password)) return user;
            throw new Error('이름이나 암호가 일치하지 않습니다.');
        })
        .then(user => {
            let token = jwt.sign({ username: user.username }, config.salt, { algorithm: "HS256" });
            res.status(200).json({
                status: { success: true, message: '로그인에 성공하였습니다.' },
                token: token,
                user: user
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

router.get('/', (req, res) => {
    if (!fv.isLogin(req, res)) return;
    models.User.findOne({
        where: { username: req.user.username }
    })
        .then(user => {
            if (user) return user;
            throw new Error('존재하지 않는 유저입니다.');
        })
        .then(user => {
            res.status(200).json({
                status: { success: true, message: '조회에 성공하였습니다.' },
                user: user
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

module.exports = router;