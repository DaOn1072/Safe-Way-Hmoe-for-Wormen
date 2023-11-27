import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { ClipLoader } from 'react-spinners';

const EmergencyLocation = () => {
  const [closestRoads, setClosestRoads] = useState([]);
  const [closestRoadsData, setClosestRoadsData] = useState([]); 


  // app.put('/api/report/:id', (req, res) => {
  //   let reportId = req.params.id;
  
  //   // 요청 바디로부터 report_data, lat, lon, checkYN, dateInfo 값을 가져옴
  //   let { report_data, lat, lon, checkYN, dateInfo } = req.body;
  
  //   // report_data가 'your_content_here'일 때 '위급상황 발생'으로 변경
  //   if (report_data === 'your_content_here') {
  //     report_data = '위급상황 발생';
  //   }
  
  //   // lat 또는 lon이 null 또는 undefined일 때 값을 변경
  //   if (lat === null || lat === undefined) {
  //     lat = '37.5584642';
  //   }
  //   if (lon === null || lon === undefined) {
  //     lon = '127.0491664';
  //   }
  
  //   // checkYN이 null 또는 undefined일 때 값을 변경
  //   if (checkYN === null || checkYN === undefined) {
  //     checkYN = 'N';
  //   }
  
  //   // dateInfo가 null 또는 undefined일 때 현재 날짜 및 시간 정보 생성
  //   if (dateInfo === null || dateInfo === undefined) {
  //     // 현재 날짜와 시간 정보 생성
  //     let currentDate = new Date();
  //     // 날짜 및 시간 형식 지정 (예: 'YYYY-MM-DD HH:MM:SS')
  //     let formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
  //     // dateInfo 값 업데이트
  //     dateInfo = formattedDate;
  //   }
  
  //   let sql = "UPDATE REPORT SET report_data = ?, lat = ?, lon = ?, checkYN = ?, dateInfo = ? WHERE id = ?";
  //   let params = [report_data, lat, lon, checkYN, dateInfo, reportId];
  
  //   connection.query(sql, params, (err, rows, fields) => {
  //     if (!err) {
  //       res.status(200).send('Report updated successfully');
  //     } else {
  //       res.status(500).send('Failed to update report');
  //     }
  //   });
  // });

  useEffect(() => {
    setClosestRoads(closestRoadsData); // Set the retrieved closestRoadsData
  }, [closestRoadsData]);

  const handlePhoneClick = (closestRoad) => {
    const phoneNumber = closestRoad.phone_number || 'No phone number';
    window.open(`tel:${phoneNumber}`);
  };
  
  const handleEmailClick = (closestRoad) => {
    const email = closestRoad.mail || 'No email';
    const fixedMessage = `${dateInfo} \n${closestRoad.address}에서 위급상황이 인식 되었습니다. \n${closestRoad.police_office}에 주변 순찰을 요청합니다.`;
    window.open(`mailto:${email}?subject=Subject&body=${encodeURIComponent(fixedMessage)}`)
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isAccordionClose, setIsAccordionClose] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [apiLatitude, setApiLatitude] = useState(null);
  const [apiLongitude, setApiLongitude] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [dateInfo, setDateInfo] = useState("[관제 시스템 발송]");
  const [selectedReportId, setSelectedReportId] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);



  useEffect(() => {
    // Fetch data from api/report
    fetch('/api/report')
      .then((response) => response.json())
      .then((data) => {
        // Check if the received data structure matches your expectation
        console.log('API report 데이터:', data);
  
        // Assuming 'lat' and 'har' are keys directly in each object within 'data'
        const latitude = data.map(item => item.lat);
        const longitude = data.map(item => item.lon);
  
        // Ensure that lat and har are retrieved correctly
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
  
        // Set apiLatitude and apiLongitude with the fetched values
        // For example, if you want the first set of lat and har
        setApiLatitude(latitude[0]);
        setApiLongitude(longitude[0]);
  
        // Assuming 'data' contains an array of report information
        setReportData(data); // This should set reportData as an array
      })
      .catch((error) => console.error(error));
  }, []);


  const findClosestLocation = (targetLat, targetLon, customersData) => {
    let closestLocation = null;
    let minDistance = Number.MAX_VALUE;
  
    customersData.forEach(customer => {
      const lat = parseFloat(customer.latitude);
      const lon = parseFloat(customer.longitude);
  
      if (!isNaN(lat) && !isNaN(lon)) {
        const latDiff = lat - targetLat;
        const lonDiff = lon - targetLon;
        const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
  
        if (distance < minDistance) {
          minDistance = distance;
          closestLocation = customer;
        }
      }
    });
  
    return closestLocation;
  };
  
  useEffect(() => {
    if (data.length > 0 && reportData.length > 0 && apiLatitude !== null && apiLongitude !== null) {
      const closestLocations = reportData.map(report => {
        const closestLocation = findClosestLocation(report.lat, report.lon, data);
        return closestLocation;
      });
      setClosestRoads(closestLocations);
      console.log('가장 가까운 위치들:', closestLocations);
    }
  }, [data, reportData, apiLatitude, apiLongitude]);



  const handleConfirmation = (reportId) => {
    setSelectedReportId(reportId); // Set the selected report ID
    setIsConfirmationModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmationSubmit = (reportId) => {
    setIsRefreshing(true); // Show the loader before refreshing
  
    fetch(`/api/report/${reportId}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) {
          alert('신고를 확인했습니다.');
          setIsConfirmationModalOpen(false);
  
          // Update the 'checkYN' value in the reportData
          const updatedReportData = reportData.map(report => {
            if (report.id === reportId) {
              return { ...report, checkYN: 'Y' };
            }
            return report;
          });
  
          setReportData(updatedReportData); // Update the reportData state
  
          // Set the refreshing state to false after a timeout
          setTimeout(() => {
            setIsRefreshing(false);
          }, 2000); // Replace this with actual logic
        } else {
          throw new Error('Failed to update report');
        }
      })
      .catch((error) => {
        console.error(error);
        setIsRefreshing(false); // Hide the loader in case of an error
      });
  };

  useEffect(() => {
    // Fetch data from api/report
    fetch('/api/report')
      .then((response) => response.json())
      .then((data) => {
        // Assuming 'data' contains an array of report information
        // Sort data based on dateInfo in descending order
        data.sort((a, b) => new Date(b.dateInfo) - new Date(a.dateInfo));
        setReportData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;
  console.log('Today:', today);

  // 오늘 날짜의 모든 데이터가 'Y'인지 확인
  const allReportsChecked = reportData
    .filter((emergency) => emergency.dateInfo.startsWith(today))
    .every((emergency) => emergency.checkYN === 'Y');

  // 모든 데이터가 'Y'인 경우, '들어온 정보가 없습니다' 표시
if (!loading && allReportsChecked) {
  return (
    <Box m="20px" marginTop="300px">
      <Typography variant="h3" textAlign="center" mt={5}>
        들어온 신고 데이터가 없습니다.
      </Typography>
    </Box>
  );
}

  let emergencyReports = null; // 필터링된 긴급 보고서를 담을 변수

  // 로딩 중일 때 로딩 스피너를 표시, 아닐 때 보고서를 표시
  if (!loading) {
    // 오늘 날짜의 긴급 보고서 필터링 및 매핑
    const todayEmergencyReports = reportData
    .filter((emergency) => {
      const emergencyDate = emergency.dateInfo.split(' ')[0]; // Extract date part
      return emergencyDate === today && emergency.checkYN !== 'Y';
    })
      .map((emergency, index) => (
        <Accordion key={index} defaultExpanded={isAccordionClose}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
                <Typography color={colors.greenAccent[500]} variant="h3" padding="10px" fontWeight="bold">
                  {`${emergency.dateInfo} 위급상황 발생 ${emergency.lat}, ${emergency.lon}`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize="20px" padding="10px" sx={{color: colors.grey[100]}}>
                  {`근처 도로: ${closestRoads[index]?.address || '데이터 없음'} | 가장 가까운 경찰서: ${closestRoads[index]?.police_office || '데이터 없음'}`}
                </Typography>
                <Box>
                  {/* Button Components */}
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: colors.greenAccent[500], color: 'black', margin: "0px 5px", padding:"5px 20px", fontSize: "18px", fontWeight: "bold" }} 
                    onClick={() => handlePhoneClick(closestRoads[index])}>
                    전화 걸기
                  </Button>
                  <Button 
                    variant="contained"
                    sx={{ backgroundColor: colors.greenAccent[500], color: 'black', margin: "0px 5px", padding:"5px 20px", fontSize: "18px", fontWeight: "bold" }}
                    onClick={() => handleEmailClick(closestRoads[index])}>
                    메일 보내기
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleConfirmation(emergency.id)}
                    sx={{ backgroundColor: colors.redAccent[500], color: colors.grey[100], margin: "10px 35px", padding: "5px 20px", fontSize: "18px", fontWeight: "bold" }}
                  >
                    신고 확인
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
        </Accordion>
      ));

    emergencyReports = todayEmergencyReports; // 변수에 할당
  }


  return (
    <Box m="20px">
      <div style={{ maxHeight: '75vh', overflowY: 'auto' }}>
      {loading ? (
      <div className='container' style={{ margin: "150px" }}>
        <ClipLoader 
          color="aqua"
          loading={loading}
          size={150}
        />
      </div>
    ) : (
      emergencyReports // 필터링된 긴급 보고서 렌더링
      )}
    </div>

      <Dialog open={isConfirmationModalOpen} onClose={handleConfirmationClose} sx={{ fontSize: "16px", color: colors.grey[100] }}>
        <DialogTitle sx={{ fontSize: "28px" }}>위급상황 확인</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: "20px" }}>해당 데이터를 신고 완료 하겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmationSubmit(selectedReportId)} sx={{ background: "white", fontWeight: "bold", fontSize: "16px" }}>확인</Button>
          <Button onClick={handleConfirmationClose} sx={{ background: "grey", fontWeight: "bold", fontSize: "16px" }}>취소</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default EmergencyLocation; 