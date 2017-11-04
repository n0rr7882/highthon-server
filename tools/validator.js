const CHECK_LIST = {
    user: [
        { property: 'username', reg: /^(?=.*).{1,20}$/, message: '20자 이내의 이름이 필요합니다.' },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/, message: '6~20글자의 대소문자, 숫자가 포함된 암호가 필요합니다.' }
    ],
    post: [
        { property: 'title', reg: /^.{1,20}$/, message: '제목을 20자 이내로 입력해주세요.' },
        { property: 'content', reg: /^.{1,1000}$/, message: '내용을 1000자 이내로 입력해주세요.' }
    ],
    comment: [
        { property: 'comment', reg: /^.{1,200}$/, message: '코멘트를 200자 이내로 입력해주세요.' }
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
                return new Error(item.message);
            }
        }
        return result;
    },

    initData: (serviceData, service) => {
        for (let item of INIT_LIST[service]) {
            serviceData[item.property] = item.defaultValue;
        }
        return serviceData;
    },

    isLogin: (req) => {
        if (req.user) return true;
        return false;
    },

    isAdmin: (req) => {
        if (req.user.rank === 3) return true;
        return false;
    },

    isNotDenied: (req) => {
        if (req.user.rank !== 1) return true;
        return false;
    }

};