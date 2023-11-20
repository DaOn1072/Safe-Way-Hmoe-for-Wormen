const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' https://api.openweathermap.org");
    next();
});

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
        "SELECT * FROM POLICEINFO WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// 안심귀갓길 DB TABLE
app.get('/api/saferoad', (req, res) => {
    connection.query(
        "SELECT * FROM SAFERETURN_ROAD",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// 여성안심지킴이집 DB TABLE
app.get('/api/safehouse', (req, res) => {
    connection.query(
        "SELECT * FROM SAFEGUARDING_HOUSE",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// CCTV DB TABLE
app.get('/api/cctv', (req, res) => {
    connection.query(
        "SELECT * FROM CCTVINFO",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// 신고 DB TABLE
app.get('/api/report', (req, res) => {
    connection.query(
        "SELECT * FROM REPORT",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});



app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO POLICEINFO VALUES (null, ?, ?, ?, ?, ?, ?, now(), 0)";
    let police_office = req.body.police_office;
    let address = req.body.address;
    let phone_number = req.body.phone_number;
    let latitude = req.body.latitude;
    let hardness = req.body.hardness;
    let mail = req.body.mail;


    let params = [police_office, address, phone_number, latitude, hardness, mail];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = "DELETE FROM POLICEINFO WHERE id = ?";
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


// 신고 확인 체크
app.put('/api/report/:id', (req, res) => {
    let sql = "UPDATE REPORT SET checkYN = 'Y' WHERE id = ?";
    let params = [req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
        if (!err) {
            res.status(200).send('Report updated successfully');
        } else {
            res.status(500).send('Failed to update report');
        }
    });
});