const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();

// AWS SDK 구성
const data = fs.readFileSync('./aws_key.json');
const conf = JSON.parse(data);

const config = {
  aws_reg: "us-east-1",
  aws_key: conf.accessKeyId,
  aws_sec: conf.secretAccessKey,
};

const s3 = new AWS.S3({
  accessKeyId: config.aws_key,
  secretAccessKey: config.aws_sec,
  region: config.aws_reg,
});

const filePath = './temp/record.wav'; // 파일 경로

// 파일 존재 여부 확인
const isFileExist = fs.existsSync(filePath);



if (!isFileExist) {
  // S3에서 파일 가져오기
  const params = {
    Bucket: 'chuldongedact', // 버킷 이름
    Key: 'record.wav' // 파일 경로 및 이름
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      // 에러 처리 로직 추가
    } else {
      // 가져온 데이터를 서버에 저장
      fs.writeFile(filePath, data.Body, 'binary', (err) => {
        if (err) {
          console.error(err);
          // 에러 처리 로직 추가
        } else {
          console.log('Audio file saved');

          // 파이썬 파일 실행
          exec('python test.py', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              console.error('파이썬 파일 실행 중 오류가 발생했습니다.');
              return;
            }
            console.log(stdout);
            console.log('파이썬 파일이 성공적으로 실행되었습니다.');
          });
        }
      });
    }
  });
} else {
  console.log('File already exists');
}

// 서버 시작
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
