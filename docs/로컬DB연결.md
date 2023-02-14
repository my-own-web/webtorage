# 로컬 DB 연결하기 (디버그용)

webtorage.sql를 사용한다.

## 1. DB 생성

1. mysql 설치
2. mysql shell에서 webtorage.sql 실행

    ``` bash
    JS>\connect --mysql root@localhost
    JS>\sql
    SQL>source {webtorage.sql 파일 경로};
    ```

## 2. 서버에 연결된 DB 정보 변경

1. .env 파일에 다음 추가

   ```txt
   MYSQL_DEBUG_HOST=localhost
   MYSQL_DEBUG_USER={username}
   MYSQL_DEBUG_PASSWORD={password}
   MYSQL_DEBUG_DATABASE=webtorage
   ```

2. server.js 코드 변경

```js
const options = {
    host: process.env.MYSQL_DEBUG_HOST,
    user: process.env.MYSQL_DEBUG_USER,
    password: process.env.MYSQL_DEBUG_PASSWORD,
    database: process.env.MYSQL_DEBUG_DATABASE,
    connectionLimit: 10// 동시에 처리되는 createPool 최대 개수
}
```

## 기타

* mysql shell에서 루트 계정 비밀번호 변경:
  >ALTER USER 'root'@'localhost' IDENTIFIED BY 'newPassword';