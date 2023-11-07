const express = require('express');             //익스프레스 모듈 가져오기 
const app = express();
const cors = require('cors');                   //cors를 사용하고 싶다
const bodyParser = require('body-parser');      //body-parser을 사용하고 싶다
const port =5000;                               //서버포트는 5000번 포트
const route = require('./routes/index');        //router가 있는 곳이다 만들 index.js다
app.use(bodyParser.json());

app.use(cors());
app.use('/', route);
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);   //익스프레스 연결 확인
})