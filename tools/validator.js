const crypto = require('crypto');

const config = require('../config/config');

const CHECK_LIST = {
    user: [
        { property: 'username', reg: /^(?=.*).{1,20}$/, message: '20자 이내의 이름이 필요합니다.' },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/, message: '6~20글자의 대소문자, 숫자가 포함된 암호가 필요합니다.' }
    ],
    post: [
        { property: 'title', reg: /^.{1,20}$/, message: '제목을 20자 이내로 입력해주세요.' },
        { property: 'content', reg: /^.{1,1000}$/gm, message: '내용을 1000자 이내로 입력해주세요.' }
    ],
    comment: [
        { property: 'content', reg: /^.{1,200}$/, message: '코멘트를 200자 이내로 입력해주세요.' }
    ]
};

module.exports = {

    checkData: (req, res, service, isStrict) => {
        let result = {};
        for (let item of CHECK_LIST[service]) {
            // 해당 property가 존재하지 않을 시 isStrict가 true 면 정규식 검사 후 !false
            // 해당 property가 존재하지 않을 시 isStrict가 false 면 pass
            if (req.body[item.property] && item.reg.exec(req.body[item.property])) {
                result[item.property] = req.body[item.property];
            } else {
                if (!isStrict && !req.body[item.property]) continue;
                res.status(200).json({
                    status: { success: false, message: `${item.message}` }
                }).end();
                return false;
            }
        }
        return result;
    },

    isLogin: (req, res) => {
        if (req.user) return true;
        res.status(200).json({
            status: { success: false, message: `로그인이 필요한 서비스입니다.` }
        }).end();
        return false;
    },

    encryptPassword: pw => {
        return crypto.createHash('sha256').update(pw + config.salt).digest('base64');
    }

};