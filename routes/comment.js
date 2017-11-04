var express = require('express');
var fv = require('../tools/validator');
const models = require('../models');

var router = express.Router();

router.post('/:idx', (req, res) => {
    if (!fv.isLogin(req, res)) return;
    let commentData = fv.checkData(req, res, 'comment', true);
    if (!commentData) return;
    commentData.createdAt = new Date();
    commentData.postIdx = req.params.idx;
    commentData.username = req.user.username;
    models.Post.findOne({
        where: { idx: req.params.idx }
    })
        .then(post => {
            if (post) return post;
            throw new Error('발견한 폭격지가 없습니다.');
        })
        .then(post => {
            if (!(post.username === req.user.username)) return post;
            throw new Error('스스로 폭격할 수 없습니다.');
        })
        .then(post => {
            if (post.isOpen) {
                post.commentNum += 1;
                post.save();
                return models.Comment.create(commentData);
            }
            throw new Error('폭격중지된 폭격지입니다.');
        })
        .then(comment => {
            res.status(200).json({
                status: { success: true, message: '폭격 성공!' }
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

router.get('/:idx', (req, res) => {
    if (!(req.params && req.params.idx)) return res.status(200).json({
        status: { success: false, message: 'need `postIdx` in params' }
    }).end();

    models.Comment.findAll({
        where: { postIdx: req.params.idx },
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['post_idx'] }
    })
        .then(comments => {
            if (comments) return comments;
            throw new Error('아직 날아온 폭격이 없습니다.');
        })
        .then(comments => {
            res.status(200).json({
                status: { success: true, message: `${comments.length}개의 폭격이 날라왔습니다.` },
                comments: comments
            }).end();
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
});

module.exports = router;