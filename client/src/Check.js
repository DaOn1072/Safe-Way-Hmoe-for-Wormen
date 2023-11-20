// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// const CheckNewReport = ({ onNewReport }) => {
//   const [lastReportId, setLastReportId] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // 주기적으로 새로운 데이터가 추가되었는지 확인하는 요청
//       fetch('/api/report')
//         .then((response) => response.json())
//         .then((data) => {
//           // 데이터가 있고, 마지막으로 받은 ID와 현재 데이터의 첫 번째 ID가 다르면 새로운 데이터가 추가된 것으로 간주
//           if (data.length > 0 && lastReportId !== data[0].id) {
//             setLastReportId(data[0].id); // 마지막으로 받은 ID 업데이트
//             onNewReport(); // 새로운 데이터가 추가되었음을 알림
//             setOpen(true); // Dialog를 열도록 설정
//           }
//         })
//         .catch((error) => console.error(error));
//     }, 5000); // 5초마다 확인 (원하는 간격으로 설정 가능)

//     return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
//   }, [lastReportId, onNewReport]);

//   const handleClose = () => {
//     setOpen(false); // Dialog 닫기
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} style={{ fontSize: '16px' }}>
//       <DialogTitle>위급 상황 안내</DialogTitle>
//       <DialogContent>
//         <p>위급 상황이 발생했습니다.</p>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>닫기</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CheckNewReport;