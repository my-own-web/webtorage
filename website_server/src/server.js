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

app.post('/api/tabinfo', async(req,res) =>{
    const body = req.body;
    const pool = DB_Connection();
    const conn = await pool.getConnection();
  
    try{//SELECT COUNT(*) AS num FROM tabinfo WHERE data_url='https://www.naver.com/' AND category ='test';

      const [exist] = await conn.query(`SELECT COUNT(*) AS num FROM tabinfo WHERE data_url='${body.data_url}' AND category = '${body.data_url}'`);
      if(exist[0].num<1){//if(exist[0].num<1){ 이걸로 check
        await conn.query(`INSERT INTO tabinfo(category, title, data_url, image, description, date, memo) 
        VALUES ('${body.category}', '${body.title}', '${body.data_url}', '${body.image}', '${body.description}', '${body.date}', '${body.memo}')`);
        res.send(true);
      }
      else{
        res.send(false);
      }
    }catch(err){
      console.log(err);
    }finally{
      conn.release();
    }
});
  
app.get('/api/tabinfo', async(req, res)=>{
    const pool = DB_Connection();
    const conn = await pool.getConnection();
    try{
      const [rows] = await conn.query("SELECT `category` FROM `tabinfo`")
      console.log(rows);
      res.send(rows);
    }catch(err){
      console.log(err);
    }finally{
      conn.release();
    }
});
  
app.post('/api/tabinfo/website', async (req, res)=>{
  const action = req.body;
  console.log(action); //dbg

  const pool = DB_Connection();
  const conn = await pool.getConnection();
  let query;
  try{
    switch(action.type){
      case 'FETCH':
        break;
      case 'EDITMEMO':
        query = "UPDATE tabinfo SET memo=? WHERE id=?";
        conn.query(query, [action.value, action.id]);
        break;
      case "REMOVE":
        query = "DELETE FROM tabinfo WHERE id=?";
        conn.query(query, [action.id]);
        if(action.category != "DEFAULT"){
          query = 'UPDATE category SET size=size-1 WHERE name=?';
          conn.query(query, [action.category]);
        }
        break;
      case 'EDITCATEGORY':
        {
          query = 'SELECT id FROM category WHERE name=?';
          const [row] = await conn.query(query, [action.new_category]);
          if(!row[0]) {
            // insert new category
            query = 'INSERT INTO category(name) VALUES(?)';
            conn.query(query, [action.new_category]);
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
    query = "SELECT * FROM tabinfo";
    const [rows] = await conn.query(query);
    res.send(rows);
  } catch(error){
    console.log(error);
  } finally{
    conn.release();
  }


});

app.get('/api/category', async (req, res) => {
    // res.send(initialCategory); // dbg용

    const pool = DB_Connection();
    const conn = await pool.getConnection();

    let query;
    try{
        query = 'SELECT * FROM category';
        const [cats] = await conn.query(query);
        console.log(cats); // dbg
        // cats: 객체 배열 {id, name, size}
        res.send(cats);
    } catch(error){
        console.log('query:', error);
    } finally{
        conn.release();
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});