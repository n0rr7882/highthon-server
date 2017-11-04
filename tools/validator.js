const CHECK_LIST = {
    user: [
        { property: 'id', reg: /^(?=.*)[a-zA-Z0-9]{6,20}$/, message: '6~20자 이내의 대소문자 & 숫자 조합인 ID가 필요합니다.' },
        { property: 'pw', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$/, message: '6~20글자의 대소문자, 숫자가 포함된 암호가 필요합니다.' },
        { property: 'nick', reg: /^(?=.*).{1,20}$/, message: '20자 이내의 닉네임이 필요합니다.' },
        { property: 'phone', reg: /^[0-9]{9,11}$/, message: '전화번호를 \'-\' 없이 입력해주세요.' },
        { property: 'city', reg: /^(?=.*)[^\s]{1,10}$/, message: '시를 확인해 주세요.' },
        { property: 'district', reg: /^(?=.*)[^\s]{1,10}$/, message: '구를 확인해 주세요.' },
        { property: 'town', reg: /^(?=.*)[^\s]{1,10}$/, message: '동을 확인해 주세요.' },
        { property: 'subject', reg: /^(?=.*)[^\s]{1,20}$/, message: '20자 이내의 관심 과목이 필요합니다.' },
        { property: 'userType', reg: /^(student|teacher)$/, message: '올바른 계정 타입이 아닙니다.' }
    ],
    rivUser: [
        { property: 'city', reg: /^(?=.*)[^\s]{1,10}$/, message: '시를 확인해 주세요.' },
        { property: 'district', reg: /^(?=.*)[^\s]{1,10}$/, message: '구를 확인해 주세요.' },
        { property: 'town', reg: /^(?=.*)[^\s]{1,10}$/, message: '동을 확인해 주세요.' },
        { property: 'subject', reg: /^(?=.*)[^\s]{1,20}$/, message: '20자 이내의 관심 과목이 필요합니다.' },
        { property: 'userType', reg: /^(student|teacher)$/, message: '올바른 계정 타입이 아닙니다.' }
    ],
    portfolio: [
        { property: 'title', reg: /^.{1,30}$/, message: '제목을 30자 이내로 입력해주세요.' },
        { property: 'description', reg: /^.{1,1000}$/, message: '설명을 1000자 이내로 입력해주세요.' }
    ],
    course: [
        { property: 'title', reg: /^(?=.*).{4,20}$/, message: '제목을 4 ~ 20글자 사이로 설정해주세요.' },
        { property: 'category', reg: /^(?=.*).{1,20}$/, message: '카테고리 형식에 일치하지 않습니다.' },
        { property: 'unit', reg: /^(?=.*)[0-9]{1,5}$/, message: '단위시간을 99999시간 이내로 설정해주세요.' },
        { property: 'price', reg: /^(?=.*)[0-9]{1,6}$/, message: '가격을 999999원 이내로 설정해주세요.' },
        { property: 'curriculum', reg: /^(?=.*).{1,1000}$/m, message: '커리큘럼을 1000글자 이내로 설정해주세요.' }
    ],
    project: [
        { property: 'title', reg: /^(?=.*).{4,20}$/, message: '제목을 4 ~ 20글자 사이로 설정해주세요.' },
        { property: 'category', reg: /^(?=.*).{1,20}$/, message: '카테고리 형식에 일치하지 않습니다.' },
        { property: 'date', reg: /^(?=.*)([0-9]{4})-([0-9]{2})-([0-9]{2})$/, message: '날짜 형식에 일치하지 않습니다.' },
        { property: 'teamName', reg: /^(?=.*).{1,20}$/, message: '팀 이름을 20글자 이내로 설정해주세요.' },
        { property: 'memberNum', reg: /^(?=.*)[0-9]{1,2}$/, message: '팀 인원을 99명 이내로 설정해주세요.' },
        { property: 'description', reg: /^(?=.*).{1,1000}$/m, message: '프로젝트 설명을 1000글자 이내로 설정해주세요.' }
    ],
    contest: [
        { property: 'title', reg: /^(?=.*).{4,20}$/, message: '제목을 4 ~ 20글자 사이로 설정해주세요.' },
        { property: 'category', reg: /^(?=.*).{1,20}$/, message: '카테고리 형식에 일치하지 않습니다.' },
        { property: 'prizeNum', reg: /^(?=.*)[0-9]{1,6}$/, message: '상금 수를 999999원 이내로 설정해주세요.' },
        { property: 'description', reg: /^(?=.*).{1,1000}$/m, message: '콘테스트 설명을 1000글자 이내로 작성해주세요.' },
        { property: 'fieldEntry', reg: /^(?=.*).{1,1000}$/m, message: '접수 방법을 1000글자 이내로 작성해주세요' },
        { property: 'criteria', reg: /^(?=.*).{1,1000}$/m, message: '심사 기준을 1000글자 이내로 작성해주세요.' },
        { property: 'award', reg: /^(?=.*).{1,1000}$/m, message: '수상 정보를 1000글자 이내로 작성해주세요.' },
        { property: 'startTime', reg: /^(?=.*)([0-9]{4})-([0-9]{2})-([0-9]{2})$/, message: '시작 날짜: 형식에 일치하지 않습니다.' },
        { property: 'endTime', reg: /^(?=.*)([0-9]{4})-([0-9]{2})-([0-9]{2})$/, message: '종료 날짜: 형식에 일치하지 않습니다.' }
    ],
    notice: [
        { property: 'title', reg: /^.{1,30}$/, message: '제목을 30자 이내로 입력해주세요.' },
        { property: 'content', reg: /^.{1,1000}$/, message: '내용을 1000자 이내로 입력해주세요.' }
    ]
};

const DEFAULT_VALUES = {
    user: [
        { property: 'score', value: 0 },
        { property: 'rank', value: 2 }
    ],
    course: [
        { property: 'score', value: 0 },
        { property: 'isOpen', value: true },
        { property: 'numOfStudents', value: 0 }
    ],
    project: [],
    contest: [],
    portfolio: []
};

module.exports = {

    USER_CHECK: {
        1: '6~20자 이내의 대소문자 & 숫자 조합인 ID가 필요합니다.',
        2: '6~20글자의 대소문자, 숫자가 포함된 암호가 필요합니다.',
        3: '20자 이내의 닉네임이 필요합니다.',
        4: '전화번호를 \'-\' 없이 입력해주세요.',
        5: '잘못된 권한정보입니다.',

        31: '시를 확인해 주세요.',
        32: '구를 확인해 주세요.',
        33: '동를 확인해 주세요.',
        34: '20자 이내의 관심 과목이 필요합니다.',
        35: '올바른 계정 타입이 아닙니다.',
        36: '잘못 된 score 형식입니다.'
    },

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