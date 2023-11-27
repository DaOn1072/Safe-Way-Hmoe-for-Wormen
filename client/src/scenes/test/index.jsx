import { useEffect } from 'react';

function SetupWebSocket({ setReportData }) {
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
  
      socket.onopen = () => {
        console.log('WebSocket 연결 성공');
  
        socket.onmessage = (event) => {
          const newData = JSON.parse(event.data);
          console.log('새로운 데이터 도착:', newData);
  
          setReportData(prevData => [...prevData, newData]);
        };
      };
  
      socket.onerror = (error) => {
        console.error('WebSocket 에러:', error);
      };
  
      return () => {
        socket.close();
      };
    }, [setReportData]);
  }

export default SetupWebSocket;