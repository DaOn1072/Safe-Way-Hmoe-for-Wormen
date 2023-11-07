const bodyParser = require('body-parser');
const { query } = require('express');
const express = require('express');
const airdata = require('./airdata'); //여기서 만들어논 함수를 사용할거다
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}))



router.post('/location',function (req,res){ ///프론트에서 fetch로 요청한 location 친구

    console.log("연결 1!!!")    //확인용
    airdata(req.body.sidoName,(error, {air}={})=>{  //airdata함수에 fetch해준 req->body->sidoName를 보내준다
        if(error){      //에러 발생시
            console.log("가나다라마바사!!");
            return res.send({error})
        }
        return res.send(air);   // airdata에서 받은 객체를 프론틀앤드로 보내준다. 
    })
})


module.exports = router;