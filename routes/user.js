var express = require('express');
var models = require('../models');
var mkdirp = require('mkdirp');
var gm = require('gm');

var fv = require('../tools/validator');
var router = express.Router();

router.post('/', (req, res) => {
    let userData = fv.checkData(req, res, 'user', true);
    if (!userData) return;
    userData.password = fv.encryptPassword(userData.password);
    models.User.findOne({
        where: { username: req.body.username }
    })
        .then(user => {
            if (!user) return models.User.create(userData);
            throw new Error('이미 존재하는 이름입니다.');
        })
        .then(user => {
            // console.log(req.files.profile);
            if (!(req.files && req.files.profile)) throw new Error('프로필 이미지를 등록해주세요.');
            mkdirp(`${__dirname}/../public/${user.username}`, err => {
                if (err) throw err;
                req.files.profile.mv(`${__dirname}/../public/${user.username}/profile_original`, err => {
                    if (err) throw err;
                    gm(`${__dirname}/../public/${user.username}/profile_original`)
                        .noProfile()
                        .resize(200, 200)
                        .write(`${__dirname}/../public/${user.username}/profile.jpg`, err => {
                            if (err) throw err;
                            res.status(200).json({
                                status: { success: true, message: '가입 성공하였습니다.' }
                            }).end();
                        });
                });
            });
        })
        .catch(err => {
            res.status(200).json({
                status: { success: false, message: err.message }
            }).end();
        });
})

router.get('/:username', (req, res) => {
    if (!req.params.username) return res.status(200).json({
        status: { success: false, message: 'need username in params.' }
    }).end();

    models.User.findOne({
        where: { username: req.params.username }
    })
        .then(user => {
            if (user) return user;
            throw new Error('조회된 유저가 없습니다.');
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