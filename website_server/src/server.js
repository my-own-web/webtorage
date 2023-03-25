const express = require('express');
const app = express(); // express 실행한 것을 받음
const port = 3001;

const axios = require("axios");
const cheerio = require("cheerio"); // 스크래핑 때 사용

// cors policy 무시
const cors = require('cors');
app.use(cors({
    origin: true,
    credentials: true // 크로스 도메인 허용
}));

// POST 요청 통해 서버에서 데이터를 받기 위해 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// crypto 사용
const { pbkdf2Sync } = require('crypto');

//cookie 사용
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// DB(MYSQL) 연동
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config(); // 민감한 정보 숨기기 위해 사용 
const randomSalt = process.env.SALT;

//jwt 사용
const jwt = require('jsonwebtoken');
const { nextTick } = require('process');
const { CLIENT_RENEG_WINDOW } = require('tls');
const { convertToObject } = require('typescript');
const jwt_key = process.env.SECRET_KEY;

// const options = {
//     host: process.env.MYSQL_HOST2,
//     user: process.env.MYSQL_USER2,
//     password: process.env.MYSQL_PASSWORD2,
//     database: process.env.MYSQL_DATABASE2,
//     connectionLimit: 10// 동시에 처리되는 createPool 최대 개수
// }

const options = {
    host: process.env.MYSQL_DEBUG_HOST,
    user: process.env.MYSQL_DEBUG_USER,
    password: process.env.MYSQL_DEBUG_PASSWORD,
    database: process.env.MYSQL_DEBUG_DATABASE,
    connectionLimit: 10// 동시에 처리되는 createPool 최대 개수
}

// 디버그용 로컬 DB
// const options = {
//     host: process.env.MYSQL_DEBUG_HOST,
//     user: process.env.MYSQL_DEBUG_USER,
//     password: process.env.MYSQL_DEBUG_PASSWORD,
//     database: process.env.MYSQL_DEBUG_DATABASE,
//     connectionLimit: 10// 동시에 처리되는 createPool 최대 개수
// }

let globalPool;
function DB_Connection() {
    if (globalPool) return globalPool;
    globalPool = mysql.createPool(options);
    return globalPool;
}

/**
 * {title, description, image, url} 반환
 * @param {*} url_input 
 */
async function scrapTabInfo(url_input) {
    let title, description, image;
    let url = url_input;
    console.log("scrapTabInfo..." + url_input);
    // make http call to url
    try {
        let response = await axios(url_input);
        url = response.request.res.responseUrl;
        // 스크래핑한 html에서 필요한 정보 찾기
        const html = response.data;
        const $ = cheerio.load(html);

        // <title> 태그 - 모든 HTML 문서에 필수
        title = $('head > title').text();
        // <meta name="description"
        description = $("head > meta[name=description]").attr("content");

        // OpenGraph 태그
        image = $("meta[property=og:image]").attr("content");
        if (!description) {
            description = $("meta[property=og:description]").attr("content");
        }

        // Twitter Card 태그
        if (!image) {
            image = $("meta[name=twitter:image]").attr("content");
        }
        if (!description) {
            description = $("meta[name=twitter:description]").attr("content");
        }

        /* 기타 알고리즘 */

        // root url 뽑아내기
        const tmpArray = url_input.split("/", 3);
        const domain = tmpArray[0] + tmpArray[1] + tmpArray[2];

        // favicon을 image로 사용
        if (!image) {
            let imgPath = $("link[rel=icon]").attr("href");
            if (imgPath) image = domain + imgPath;
        }
    } catch (e) {
        // console.log(e);
    }

    console.log("url: " + url + "\ntitle: " + title + "\ndescription: " + description + "\nimage: " + image);

    return { data_url: url, title: title, description: description, image: image };
}

/**
 * req: { url }
 * res: title, description, image
 * 전달받은 URL의 title, description, image를 스크래핑해서 반환
 */
app.post("/api/tabinfo/scrap", async (req, res) => {
    const tabInfo = await scrapTabInfo(req.body.url);
    res.send(tabInfo);
});


/*** 
 * website, extension에서 DB에 탭 정보 저장
 * res.send({ 
 * success: true/false, 
 * type: client (invalid token) / tab (같은 카테고리에 이미 url 존재),
 * message: "" 
 * })
 */
app.post('/api/tabinfo', async (req, res) => {
    // Verify user
    const clientToken = req.cookies.validuser;
    const decoded = (clientToken) ? jwt.verify(clientToken, jwt_key) : '';

    if (!decoded) {
        console.log("Invalid client token");
        res.send({ success: false, type: "client", message: "로그인이 필요합니다." })
        return;
    }
    clientId = decoded.userId;

    const pool = DB_Connection();
    const conn = await pool.getConnection();

    let body = req.body; // {title, data_url, image, description, date, memo, clientId}
    body = { ...body, title: "", image: "", description: "" }; // sql 오류 방지
    let category = body.category;
    let url = body.data_url.trim(); // 앞뒤 빈칸 제거
    if (!category) { // 빈 문자열 DEFAULT로 변환
        category = "DEFAULT";
    }

    try {//SELECT COUNT(*) AS num FROM tabinfo WHERE data_url='https://www.naver.com/' AND category ='test';

        // 탭 정보 스크래핑
        let tabInfo = await scrapTabInfo(url);
        if (tabInfo.title) body.title = tabInfo.title;
        if (tabInfo.description) body.description = tabInfo.description;
        if (tabInfo.image) body.image = tabInfo.image;
        body.data_url = tabInfo.data_url;

        const [exist] = await conn.query("SELECT COUNT(*) AS num FROM tabinfo WHERE data_url=? AND category=? AND clientId=?", [body.data_url, category, clientId]);
        if (exist[0].num < 1) {//if(exist[0].num<1){ 이걸로 check

            // Check if category exists
            if (category != "DEFAULT") {
                query = 'SELECT id FROM category WHERE name=? AND clientId=?';
                const [row] = await conn.query(query, [category, clientId]);
                if (!row[0]) {
                    // insert new category
                    query = 'INSERT INTO category(name, size, clientId) VALUES(?,1,?)';
                    conn.query(query, [category, clientId]);
                }
            }

            await conn.query(`INSERT INTO tabinfo(category, title, data_url, image, description, date, memo, clientId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [category, body.title, body.data_url, body.image, body.description, body.date, body.memo, body.clientId]);
            // res.send(true);
            res.send({ success: true, type: "", message: "" })
        }
        else {
            // res.send(false);
            res.send({ success: false, type: "tab", message: "중복된 URL 입니다" })
        }
    } catch (err) {
        console.log(err);
    } finally {
        conn.release();
    }
});

app.get('/api/tabinfo', async (req, res) => {
    const pool = DB_Connection();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query("SELECT `category` FROM `tabinfo`")
        console.log(rows);
        res.send(rows);
    } catch (err) {
        console.log(err);
    } finally {
        conn.release();
    }
});

app.post('/api/tabinfo/website', async (req, res, next) => {
    const action = req.body;
    console.log(action); //dbg

    const clientToken = req.cookies.validuser;
    const decoded = (clientToken) ? jwt.verify(clientToken, jwt_key) : '';

    if (decoded) {
        const pool = DB_Connection();
        const conn = await pool.getConnection();
        clientId = decoded.userId;
        let query;
        try {
            switch (action.type) {
                case 'FETCH':
                    break;
                case 'EDITMEMO':
                    //query = "UPDATE tabinfo SET memo=? WHERE id=? AND clientID=?";
                    query = "UPDATE tabinfo SET memo=? WHERE id=? AND clientId=?";
                    conn.query(query, [action.value, action.id, clientId]);
                    //conn.query(query, [action.value, action.id]);
                    break;
                case "REMOVE":
                    query = "DELETE FROM tabinfo WHERE id=? AND clientId=?";
                    //query = "DELETE FROM tabinfo WHERE id=?";
                    conn.query(query, [action.id, clientId]);
                    //conn.query(query, [action.id]);
                    if (action.category != "DEFAULT") {
                        query = 'UPDATE category SET size=size-1 WHERE name=? AND clientId=?';
                        //query = 'UPDATE category SET size=size-1 WHERE name=?';
                        conn.query(query, [action.category, clientId]);
                        //conn.query(query, [action.category]);
                    }
                    break;
                case 'EDITCATEGORY':
                    {
                        query = 'SELECT id FROM category WHERE name=? AND clientId=?';
                        const [row] = await conn.query(query, [action.new_category, clientId]);
                        if (!row[0]) {
                            // insert new category
                            query = 'INSERT INTO category(name, size, clientId) VALUES(?,0,?)';
                            conn.query(query, [action.new_category, clientId]);
                        }
                        // -1 to old category size
                        conn.query('UPDATE category SET size=size-1 WHERE name=?', [action.old_category]);
                        // +1 to new category size
                        conn.query('UPDATE category SET size=size+1 WHERE name=?', [action.new_category]);
                        // update category of tab
                        conn.query('UPDATE tabinfo SET category=? WHERE id=?', [action.new_category, action.id]);
                        break;
                    }
            }
            query = "SELECT * FROM tabinfo WHERE clientID=?";
            const [rows] = await conn.query(query, clientId);
            //const [rows] = await conn.query("SELECT * FROM tabinfo");
            res.send({
                userID: clientId,
                bookmark: rows
            });

        } catch (error) {
            console.log(error);
        } finally {
            conn.release();
        }
    }
    else { /////////////////////
        if (action.type !== 'FETCH')
            res.send("login again!");
    }
});

app.post('/api/category', async (req, res) => {
    const action = req.body;

    const clientId = action.clientId;
    //////////////////
    console.log(clientId);
    ;
    const pool = DB_Connection();
    const conn = await pool.getConnection();

    let query;
    try {
        switch (action.type) {
            case "FETCH": {
                break;
            }
            case "DELETE": {
                /* TODO size=0 확인.
                현재 프런트에서 확인하고 있음. 백엔드에서 확인하는 것으로 수정?
                */

                query = "DELETE FROM category WHERE id=? AND clientId=?";
                conn.query(query, [action.id, clientId]);
                break;
            }
        }
        query = "SELECT * FROM category WHERE clientID=?";
        const [cats] = await conn.query(query, [clientId]);

        console.log(cats); // dbg
        // cats: 객체 배열 {id, name, size, clientId}
        res.send(cats);
    } catch (error) {
        console.log('query:', error);
    } finally {
        conn.release();
    }
});

app.post('/api/user/signup',async(req,res)=>{ 
    const pool = DB_Connection();
    const conn = await pool.getConnection();
    const Email = req.body.email;
    const Id = req.body.id;
    const Password = req.body.password;
    const cryptedPassword = pbkdf2Sync(Password, randomSalt, 65536, 32, "sha512").toString("hex");

    try{
        let query = `SELECT COUNT(*) AS num FROM users WHERE Email=?`;
        const [emails] = await conn.query(query, [Email]);
        query = `SELECT COUNT(*) AS num FROM users WHERE Id=?`;
        const [ids] = await conn.query(query, [Id]);

        if(emails[0].num > 0){
            res.send("Email Exist");
        } else if(ids[0].num > 0){
            res.send('Already Exist');
        }
        else{
            query = `INSERT INTO users(Email, Id, Password) VALUES (?,?,?)`;
            conn.query(query,[Email, Id, cryptedPassword]);
            res.send('New User');
        }
    }catch (error) {
        console.log(error);
    } finally {
        conn.release();
    }
});


app.get('/api/logininfo',async(req,res)=>{  /////////////////
    const clientToken = req.cookies.validuser;
    const decoded = (clientToken) ? jwt.verify(clientToken, jwt_key) : '';

    if (decoded){
        const pool = DB_Connection();
        const conn = await pool.getConnection();
        clientId = decoded.userId;
        try{
            const sql = "SELECT Password FROM users WHERE Id=?";
            const params = [clientId];
            const [rows] = await conn.query(sql,params);
            if (rows[0]){
                const password = rows[0];
                res.send({Id: clientId, Password: password, flag:"Already Logined"});
            }
            else{
                res.send({Id: '',Password:'', flag: "Error Exist"});
            }
        }catch(err){
            console.log(err);
        }finally{
            conn.release();
        }
    }
    else
        res.send({Id: '',Password:'', flag: "Not Logined"});
});

app.post('/api/user/login', async (req, res) => {

    const pool = DB_Connection();
    const conn = await pool.getConnection();
    //console.log(req.body);
    const Id = req.body.Id;
    const Password = req.body.Password;
    const cryptedPassword = pbkdf2Sync(Password, randomSalt, 65536, 32, "sha512").toString("hex");

    try {
        const sql = `SELECT COUNT(*) AS num FROM users WHERE Id=? AND Password=?`;
        const params = [Id, cryptedPassword];
        const [rows] = await conn.query(sql, params);
        if (rows[0].num) {
            const token = jwt.sign({
                userId: Id
            }, jwt_key, {
                expiresIn: '1h' ////////TODO 임시
            });
            res.cookie('validuser', token, { path: '/', maxAge: 3600 * 1000 }); ///////////////TODO 임시 기간 수정하기!
            res.send('OK');
        }
        else {
            res.clearCookie('validuser');
            res.send('Invalid User');
        }
    } catch (error) {
        console.log(error);
    } finally {
        conn.release();
    }
}); //현재 hello 안녕 잠 자고싶다 각각 아이디와 비밀번호로 입력되어 있음

app.post('/api/user/logout', async (req, res) => {
    try {
        res.clearCookie('validuser');
        res.send('Logout');
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/user/quit', async (req, res) => {
    const clientToken = req.cookies.validuser;
    const decoded = (clientToken) ? jwt.verify(clientToken, jwt_key) : '';

    if (decoded){
        const pool = DB_Connection();
        const conn = await pool.getConnection();
        clientId = decoded.userId;
        try{
            res.clearCookie('validuser');
            //clientId user정보 삭제,관련 db 정보들도 삭제
            query = "DELETE FROM users WHERE Id=?";
            conn.query(query, [clientId]);
            query2 = "DELETE FROM tabinfo WHERE clientId=?";
            conn.query(query2,[clientId]);
            query3 = "DELETE FROM category WHERE clientId=?";
            conn.query(query3,[clientId]);
            res.send("해당 사용자의 계정 정보가 삭제되었습니다.");
        }catch(error){
            console.log("Quit Error");
        }finally{
            conn.release();
        }
    }
    else{ //쿠키가 만료되어 회원탈퇴 버튼을 눌렀지만 로그인 정보가 없는 경우
        res.send("로그인 후 해당 기능을 이용해주시기 바랍니다.");
    }
});

app.post('/api/user/changePassword', async(req,res)=>{
    const clientToken = req.cookies.validuser;
    const decoded = (clientToken) ? jwt.verify(clientToken, jwt_key) : '';

    if (decoded){
        //console.log(req.body);
        const newPassword = req.body.newpassword;
        const cryptedPassword = pbkdf2Sync(newPassword, randomSalt, 65536, 32, "sha512").toString("hex");
        const pool = DB_Connection();
        const conn = await pool.getConnection();
        clientId = decoded.userId;

        try{
            let query = `UPDATE users SET Password=? WHERE Id=?`;
            conn.query(query,[cryptedPassword, clientId]);
            res.send("Password Changed");
        }catch(error){
            console.log("Quit Error");
        }finally{
            conn.release();
        }
    }
    else{ //쿠키가 만료되어 비밀번호 변경 페이지에서 확인 버튼을 눌렀지만 로그인 정보가 없는 경우
        res.send("로그인 후 해당 기능을 이용해주시기 바랍니다.");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});