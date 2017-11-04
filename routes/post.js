var express = require('express');
var models = require('../models');
var fv = require('../tools/validator');

var router = express.Router();

router.post('/', (req, res) => {
    if (!fv.isLogin(req, res)) return;
    let postData = fv.checkData(req, res, 'post', true);
    if (!postData) return;
    postData.username = req.user.username;
    postData.isOpen = true;
    postData.createdAt = new Date();
    postData.commentNum = 0;
    models.User.findOne({
        where: { username: req.user.username }
    })
        .then(user => {
            if (user) return models.Post.create(postData);
            throw new Error('너 누구야...');
        })
        .then(post => {
            res.status(200).json({
                status: { success: true, message: '정상적으로 폭격 요청되었습니다.' }
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

router.get('/', (req, res) => {
    models.Post.findAll({
        where: (req.query.username) ? { username: req.query.username } : undefined,
        order: [['createdAt', 'DESC']]
    })
        .then(posts => {
            if (posts) return posts;
            throw new Error('발견된 폭격지가 없습니다.');
        })
        .then(posts => {
            res.status(200).json({
                status: { success: true, message: '폭격지 발견!' },
                posts: posts
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

router.get('/:idx', (req, res) => {
    if (!req.params.idx) return res.status(200).json({
        status: { success: false, message: 'need `idx` in params' }
    }).end();

    models.Post.findOne({
        where: { idx: req.params.idx }
    })
        .then(post => {
            if (post) return post;
            throw new Error('발견된 폭격지가 없습니다.');
        })
        .then(post => {
            res.status(200).json({
                status: { success: true, message: '폭격지를 찾았습니다!' },
                post: post
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

router.put('/:idx/:isOpen', (req, res) => {
    if (!fv.isLogin(req, res)) return;
    if (!(req.params.idx && req.params.isOpen)) return res.status(200).json({
        status: { success: false, message: 'need `idx` and `isOpen` in params' }
    }).end();

    models.Post.findOne({
        where: { idx: req.params.idx }
    })
        .then(post => {
            if (post) return post;
            throw new Error('발견된 폭격지가 없습니다.');
        })
        .then(post => {
            if (post.username === req.user.username) return post;
            throw new Error('내가 만든 폭격지가 아닙니다.');
        })
        .then(post => {
            if (req.params.isOpen === 'true') post.isOpen = true;
            if (req.params.isOpen === 'false') post.isOpen = false;
            return post.save();
        })
        .then(() => {
            res.status(200).json({
                status: { success: true, message: '상태를 변경했습니다.' }
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

module.exports = router;