const express = require('express');
const app = express(); // express 실행한 것을 받음
const port = 3001;

// cors policy 무시
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // 크로스 도메인 허용
}));

// POST 요청 통해 서버에서 데이터를 받기 위해 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // DB(MYSQL) 연동
// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv').config(); // 민감한 정보 숨기기 위해 사용 

// const options = {
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   connectionLimit: // 동시에 처리되는 createPool 최대 개수
// }
// // database는 table 아님 

// let globalPool;
// function DB_Connection() {
//   if (globalPool) return globalPool;
//   globalPool = mysql.createPool(options);
//   return globalPool;
// }

// 디버그용 category 리스트
var initialCategory = ['suchalongnamedcategorylonglonglonglonglong'];
// dbg: 내용 채우기
for (var i = 1; i <= 40; i++) {
    initialCategory.push(`category${i}`);
}

app.get('/api', async (req, res) => {
    res.send(initialCategory);
    console.log('sent');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})