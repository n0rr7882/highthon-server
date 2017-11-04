var express = require('express');
var rp = require('request-promise');
var models = require('../models');

var router = express.Router();

router.post('/', (req, res) => {
    if (req.headers.authorization) {
        return res.status(200).send({
            status: { success: false, message: '로그인해주세요.' }
        }).end();
    }
    rp.get(`https://graph.facebook.com/v2.5/me?access_token=${req.headers.authorization}&fields=id,name,picture`)
        .then(response => JSON.parse(response))
        .then(response => {
            let postData = {};
            postData.userId = response.id;
            postData.usename = response.name;
            postData.profile = response.picture.data.url;
            postData.isOpen = true;
            postData.title = req.body.title;
            postData.content = req.body.content;
            postData.createdAt = new Date();
        })
        .catch(err => {
            res.status(200).send({
                status: { success: false, message: '알 수 없는 원인으로 등록할 수 없습니다.' }
            }).end();
        });
});

module.exports = router;