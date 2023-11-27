import React, { useEffect } from 'react';

const EmergencyLocation = () => {
  const reportData = []; 
  
  // handleConfirmationSubmit 함수 정의
  const handleConfirmationSubmit = (reportId) => {
    let updatedReportData = reportData.map(report => {
      if (report.report_data === 'your_content_here') {
        report.report_data = '위급상황 발생';
      }
      if (report.lat === null) {
        report.lat = '37.5584642';
      }
      if (report.lon === null) {
        report.lon = '127.0491664';
      }
      if (report.checkYN === null) {
        report.checkYN = 'N';
      }
      return report;
    });
  
    fetch(`/api/report/${reportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReportData),
    })
    .then(response => {
      // Handle response
    })
    .catch(error => {
      // Handle error
    });
  };

  // handleSpacePress 함수 정의
  const handleSpacePress = (event) => {
    if (event.code === 'Space') {
      handleConfirmationSubmit(); // 스페이스바를 눌렀을 때 handleConfirmationSubmit 함수 호출
    }
  };

  // useEffect를 사용하여 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('keydown', handleSpacePress);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleSpacePress);
    };
  }, []);

  // 나머지 코드

  // 컴포넌트 반환
  return (
    <></>
  )

};

export default EmergencyLocation;