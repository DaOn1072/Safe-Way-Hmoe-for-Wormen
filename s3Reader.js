const express = require('express'); // Express 웹 프레임워크를 가져옵니다.
const AWS = require('aws-sdk'); // AWS SDK를 가져옵니다.
const fs = require('fs'); // 파일 시스템 모듈을 가져옵니다.
const { exec } = require('child_process'); // 자식 프로세스를 실행하기 위한 exec 메서드를 가져옵니다.

const app = express(); // Express 앱을 생성합니다.

// AWS SDK 구성
const data = fs.readFileSync('./aws_key.json'); // AWS 키가 저장된 JSON 파일을 읽어옵니다.
const conf = JSON.parse(data); // JSON 데이터를 파싱합니다.

const config = {
  aws_reg: "us-east-1", // AWS 리전 설정
  aws_key: conf.accessKeyId, // AWS 액세스 키
  aws_sec: conf.secretAccessKey, // AWS 비밀 키
};

// S3 객체를 생성합니다.
const s3 = new AWS.S3({
  accessKeyId: config.aws_key, // 액세스 키 설정
  secretAccessKey: config.aws_sec, // 비밀 키 설정
  region: config.aws_reg, // 리전 설정
});

const filePath = './temp/record.wav'; // 저장할 파일 경로

// 파일 존재 여부 확인
const isFileExist = fs.existsSync(filePath); // 해당 경로에 파일이 존재하는지 확인합니다.

if (!isFileExist) {
  // 파일이 존재하지 않는 경우 S3에서 파일을 가져옵니다.
  const params = {
    Bucket: 'chuldongedact', // S3 버킷 이름
    Key: 'record.wav' // S3에서 가져올 파일의 경로 및 이름
  };

  // S3에서 객체를 가져옵니다.
  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err); // 에러 발생 시 콘솔에 로그를 출력합니다.
      // 에러 처리 로직 추가
    } else {
      // 가져온 데이터를 서버에 저장합니다.
      fs.writeFile(filePath, data.Body, 'binary', (err) => {
        if (err) {
          console.error(err); // 파일 저장 중 에러 발생 시 로그를 출력합니다.
          // 에러 처리 로직 추가
        } else {
          console.log('Audio file saved'); // 파일이 성공적으로 저장되었음을 알립니다.

          // 파이썬 파일 실행
          exec('python test.py', (err, stdout, stderr) => {
            if (err) {
              console.error(err); // 파이썬 실행 중 에러 발생 시 로그를 출력합니다.
              console.error('파이썬 파일 실행 중 오류가 발생했습니다.');
              return;
            }
            console.log(stdout); // 파이썬 파일 실행 결과를 출력합니다.
            console.log('파이썬 파일이 성공적으로 실행되었습니다.'); // 실행 완료 메시지
          });
        }
      });
    }
  });
} else {
  console.log('File already exists'); // 파일이 이미 존재하는 경우 메시지를 출력합니다.
}

// 서버 시작
const PORT = 8080; // 서버가 사용할 포트 번호
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // 서버 시작 시 메시지를 출력합니다.
});
