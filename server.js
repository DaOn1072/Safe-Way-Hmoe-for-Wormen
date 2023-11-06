const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

// 연결과 관련된 변수 설정
const connection = mysql.createConnection({
    host: conf.host, 
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

// 관서 목록을 보여주는 api 제작
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM POLICEOFFICE",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));