# Trump's Fact폭격장

* 모든 응답 코드는 서버측에서 발생한 `500`, `404`에러를 제외하고 `200`으로 동일합니다.
* 빠른 개발을 위해 CRUD중 일부는 개발하지 않았습니다.

## `POST /users`

```
request body data
    username: TESTNAME
    password: Asdf!234
    profile: [image file]
```
response:
```
{
    "status": {
        "success": true,
        "message": "가입 성공하였습니다."
    }
}
```


## `POST /sign`
```
request body data
    username: TESTNAME
    password: Asdf!234
```
response:
```
{
    "status": {
        "success": true,
        "message": "로그인에 성공하였습니다."
    },
    "token": {
        "data": "eyJhbGciOiJIUzI1NiIsInR..."
    },
    "user": {
        "username": "테스트2",
        "password": "5oAEewKsMWlQYxr..."
    }
}
```


## `GET /sign`
```
request headers
    authorization: eyJhbGciOiJIUzI1NiIsInR...
```
response:
```
{
    "status": {
        "success": true,
        "message": "조회에 성공하였습니다."
    },
    "user": {
        "username": "테스트",
        "password": "5oAEewKsMWlQYxro..."
    }
}
```
 
## `POST /posts`
```
request headers
    authorization: eyJhbGciOiJIUzI1NiIsInR...
request body data:
    title: 좀 갈궈주세요...
    content: 시험을 앞두고 있는데도 페이스북을 하..
```
response:
```
{
    "status": {
        "success": true,
        "message": "정상적으로 폭격 요청되었습니다."
    }
}
```

## `GET /posts`
```
request querystring
    username: TESTNAME (선택)
```
response:
```
{
    "status": {
        "success": true,
        "message": "폭격지 발견!"
    },
    "posts": [
        {
            "idx": 2,
            "username": "TEST",
            "isOpen": true,
            "title": "너무 잘못 산듯",
            "content": "가나다라마바사아자차카타파하",
            "commentNum": 2,
            "createdAt": "2017-11-04T18:35:22.000Z"
        }
    ]
}
```


## `GET /posts/{idx}`
```
request params
    idx: 1 (post idx)
```
response:
```
{
    "status": {
        "success": true,
        "message": "폭격지를 찾았습니다!"
    },
    "post": {
        "idx": 2,
        "username": "TEST",
        "isOpen": true,
        "title": "너무 잘못 산듯",
        "content": "가나다라마바사아자차카타파하",
        "commentNum": 3,
        "createdAt": "2017-11-04T18:35:22.000Z"
    }
}
```
 
## `PUT /posts/{idx}/{isOpen}`
```
request params
    idx: 1 (post idx)
    isOpen: true/false
```
response:
```
{
    "status": {
        "success": true,
        "message": "상태를 변경했습니다."
    }
}
```

## `POST /comments/{idx}`
```
request headers
    authorization: eyJhbGciOiJIUzI1NiIsInR...
request params
    idx: 1 (post idx)
request body data
    content: 와 그쪽도 정말 만만찮...
```
response:
```
{
    "status": {
        "success": true,
        "message": "폭격 성공!"
    }
}
```


## `GET /comments/{idx}`
```
request params
    idx: 1 (post idx)
```
response:
```
{
    "status": {
        "success": true,
        "message": "1개의 폭격이 날라왔습니다."
    },
    "comments": [
        {
            "idx": 1,
            "postIdx": 1,
            "username": "test2",
            "content": "asdfasdfasdf",
            "createdAt": "2017-11-04T18:01:44.000Z"
        }
    ]
}
```

## profile URL

```
n0rr.kro.kr:3333/{username}/profile.jpg
```
