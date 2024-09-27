const request = require('request')
const serviceKey = '(서비스키)'
//공공데이터 포털에서 받은 내 서비스키 

var parse = require('json-parse')
const airdata = (sidoName, callback) => {       // index.js에서 보내준 시/도 이름을 여기서 받았다.

    console.log("에어데이타!!!!!!");            //진입햇는지 확인용

    const url = 'http://www.utic.go.kr/guide/getRoadAccJson.do?key?';
    //api사용하기 위한 url이다. 끝에 '?'물음표를 붙여야된다.

    //요청시 필요한 정보들을 붙여 준다 ,,,뭐뭐필요한지 명세에 적혀있다
    var queryParams = encodeURIComponent('ServiceKey') + '=' + serviceKey;   //서비스키

    request(
        {
        url: url + queryParams, // url과 queryParams합쳐놓은거 
        method: 'GET'
        }, function (error, response, body) 
        {
        // console.log(url+queryParams);
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        // console.log('Reponse received', body);

        callback(undefined,{    //body를 air이름으로 만들어서 index.js에 보내준다
            air:body
        })
        });
        
}

module.exports = airdata;
