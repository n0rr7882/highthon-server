# Trump's Fact폭격장

> 2017 1st Highthon 출품작인 'Trump's Fact폭격장'의 API서버입니다.

## setup

### node 모듈 설치
```
$ npm install
```

### graphicsmagick 설치
```
$ sudo apt-get install graphicsmagick
```

### db 설정
```
(mysql) > create database highthon;
```

### `/config/sequelize.json`, `/config/config.json` 설정
```json
{
    "port": 3333, // 포트
    "jwtAlgorithm": "HS256", // 토큰발급시 사용 알고리즘
    "algorithm": "sha256", // password 알고리즘
    "salt": "~!@#$%^&*()_+HIGHTHON+_)(*&^%$#@!~", // salt
    "reset": false // 구동시 db reset 여부
}
```

### 서버 실행
```
$ npm start
```

## 클라이언트
https://github.com/purplebeen/Highthon