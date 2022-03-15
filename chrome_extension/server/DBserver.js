const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dotenv = require("dotenv").config()

const mysql = require("mysql2/promise");
const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 400,
};

let globalPool; //DB 통신에 필요한 기본적인 정보

function DB_connection(){
  if(globalPool){
    return globalPool
  }
  globalPool = mysql.createPool(options);

  return globalPool;
}

app.post('/tabinfo', async(req,res) =>{
  const body = req.body;
  const pool = DB_connection();
  const conn = await pool.getConnection();

  try{
    const [exist] = await conn.query(`SELECT COUNT(*) AS num FROM tabinfo WHERE data_url='${body.data_url}'`);
    if(exist[0].num<1){//if(exist[0].num<1){ 이걸로 check
      await conn.query(`INSERT INTO tabinfo(category, title, data_url, image, description)
       VALUES ('${body.category}', '${body.title}', '${body.data_url}', '${body.image}', '${body.description}')`);
      res.send(true);
    }
    else{
      res.send(false);
    }
  }catch(err){
    console.error(err);
  }finally{
    conn.release();
  }
});

app.get('/tabinfo', async(req, res)=>{
  const pool = DB_connection();
  const conn = await pool.getConnection();
  try{
    const [rows] = await conn.query("SELECT `category` FROM `tabinfo`")
    console.log(rows);
    res.send(rows);
  }catch(err){
    console.error(err);
  }finally{
    conn.release();
  }
});

app.listen(port,(req, res) =>{
  console.log(`server has started on port ${port}`);
});