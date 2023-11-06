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

// 연결과 관련된 변수 설정(데이터베이스 설정)
const connection = mysql.createConnection({
    host: conf.host, 
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

// 관서 목록을 보여주는 api 제작
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM POLICEOFFICE WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO POLICEOFFICE VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
    let police_office = req.body.police_office;
    let name = req.body.name;
    let division = req.body.division;
    let phone_number = req.body.phone_number;
    let address = req.body.address;
    let params = [police_office, name, division, phone_number, address];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = "DELETE FROM POLICEOFFICE WHERE id = ?";
    let params = [req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
        if (!err) {
            res.status(204).end(); // 성공적으로 삭제됨을 나타냄
        } else {
            res.status(500).send('Failed to delete the customer');
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));