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

// DB(MYSQL) 연동
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config(); // 민감한 정보 숨기기 위해 사용 

const options = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10// 동시에 처리되는 createPool 최대 개수
}

let globalPool;
function DB_Connection() {
    if (globalPool) return globalPool;
    globalPool = mysql.createPool(options);
    return globalPool;
}

// // 디버그용 category 리스트
// let initialCategory = [{ id: 1, name: 'suchalongnamedcategorylonglonglonglonglong', size: 0}];
// // dbg: 내용 채우기
// for (var i = 2; i <= 5; i++) {
//     initialCategory.push({id: i, name: `category${i}`, size: 0});
// }

app.get('/api/category', async (req, res) => {
    // res.send(initialCategory); // dbg용

    const pool = DB_Connection();
    const conn = await pool.getConnection();

    let query;
    try {
        query = 'SELECT * FROM category';
        const [cats] = await conn.query(query);
        console.log(cats); // dbg
        // cats: 객체 배열 {id, name, size}
        res.send(cats);
    } catch (error) {
        console.log('query:', error);
    } finally {
        conn.release();
    }

});

app.get('/api/content', async (req, res) => {

    const pool = DB_Connection();
    const conn = await pool.getConnection();

    try {
        const query = 'SELECT * FROM tabinfo';
        const [rows] = await conn.query(query);
        console.log(rows); //확인용
        res.send(rows);
    } catch (error) {
        console.log(error);
    } finally {
        conn.release();
    }
});

app.put('/api/remove', async (req, res) => {

    const pool = DB_Connection();
    const conn = await pool.getConnection();
    const date = req.body.date;

    try {
        const query = (`DELETE FROM tabinfo WHERE date=${date}`);
        const [rows] = await conn.query(query);
        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.log(error);
    } finally {
        conn.release();
    }
});

app.put('/api/editMemo', async (req, res) => {

    const pool = DB_Connection();
    const conn = await pool.getConnection();
    console.log(req.body);
    const date = req.body.date;
    const memo = req.body.memo;

    try {
        const query = (`UPDATE tabinfo SET memo='${memo}' WHERE date=${date}`);
        const [rows] = await conn.query(query);
        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.log(error);
    } finally {
        conn.release();
    }
});

app.put('/api/editCategory', async (req, res) => {

    const pool = DB_Connection();
    const conn = await pool.getConnection();
    console.log(req.body);
    const date = req.body.date;
    const category = req.body.category;

    try {
        const query = (`UPDATE tabinfo SET memo='${category}' WHERE date=${date}`);
        const [rows] = await conn.query(query);
        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.log(error);
    } finally {
        conn.release();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});