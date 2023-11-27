import React from 'react'

const AudioTest = () => {

// 클라이언트에서 GET 요청 보내기
fetch('/getResult')
  .then(response => response.text())
  .then(data => {
    console.log('서버로부터 받은 데이터:', data);
  })
  .catch(error => {
    console.error('데이터를 받는 중 오류 발생:', error);
  });

  return (
    <div>AudioTest</div>
  )
}

export default AudioTest