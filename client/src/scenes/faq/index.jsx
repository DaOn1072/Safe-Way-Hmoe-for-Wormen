import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const EmergencyLocation = () => {
  const phoneNumber = '01079131645';
  const email = 'zxcv17653@gmail.com';
  const fixedMessage = '2023-11-14 15:07:23 \n서울특별시 성동구 사근동 10길 16 도로에서 위급상황이 인식 되었습니다. \n성동경찰서에 주변 순찰을 요청합니다.';

  const handlePhoneClick = () => {
      window.open(`tel:${phoneNumber}`);
  };

  const handleEmailClick = () => {
      window.open(`mailto:${email}?subject=Subject&body=${encodeURIComponent(fixedMessage)}`)
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [closestRoad, setClosestRoad] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [apiLatitude, setApiLatitude] = useState(null);
  const [apiLongitude, setApiLongitude] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [closestRoads, setClosestRoads] = useState([]);


  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
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
        const longitude = data.map(item => item.har);
  
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
      const lon = parseFloat(customer.hardness);
  
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
        const closestLocation = findClosestLocation(report.lat, report.har, data);
        return closestLocation;
      });
      setClosestRoads(closestLocations);
      console.log('가장 가까운 위치들:', closestLocations);
    }
  }, [data, reportData, apiLatitude, apiLongitude]);
  const handleConfirmation = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmationSubmit = () => {
    // Add logic when confirmation button is clicked
    alert('신고를 확인했습니다.');
    setIsConfirmationModalOpen(false);
  };




  return (
    <Box m="20px">
      <Header title="신고 확인 페이지" subtitle="금일 위급상황이 발생된 위치와 날짜 데이터를 제공합니다. 해당 데이터에 대해 가장 가까운 파출소에 신고할 수 있습니다." />
      
      {/* 여러 위급 상황 블록 생성 */}
      {reportData.map((emergency, index) => (
        
        <Accordion key={index} defaultExpanded={isAccordionOpen}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
              <Typography color={colors.greenAccent[500]} variant="h3" padding="10px" fontWeight="bold">
                {`${emergency.dateInfo} 위급상황 발생 ${emergency.lat}, ${emergency.har}`}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
          <Box display="flex" justifyContent="space-between">
              <Typography fontSize="20px" padding="10px" sx={{color: colors.grey[100]}}>
                {`근처 도로: ${closestRoads[index]?.address || '데이터 없음'} | 가장 가까운 경찰서: ${closestRoads[index]?.police_office || '데이터 없음'}`}
              </Typography>
            <Box>
              <Button 
                sx={{ backgroundColor: colors.greenAccent[500], color: 'black', margin: "0px 5px", padding:"5px 20px", fontSize: "18px", fontWeight: "bold" }}
                variant="contained" onClick={() => window.open('https://minwon.police.go.kr/', '_blank')}>
                웹페이지 열기
              </Button>
              <Button
                sx={{ backgroundColor: colors.greenAccent[500], color: 'black', margin: "0px 5px", padding:"5px 20px", fontSize: "18px", fontWeight: "bold" }} 
                variant="contained" onClick={handlePhoneClick}>
                전화 걸기
              </Button>
              <Button 
                sx={{ backgroundColor: colors.greenAccent[500], color: 'black', margin: "0px 5px", padding:"5px 20px", fontSize: "18px", fontWeight: "bold" }}
                variant="contained" onClick={handleEmailClick}>
                이메일 보내기
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: colors.redAccent[500], color: colors.grey[100], margin: "10px 50px", padding:"5px 20px", fontSize: "18px", fontWeight: "bold" }}
                onClick={handleConfirmation}
              >
                신고 확인
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      ))}

      <Dialog open={isConfirmationModalOpen} onClose={handleConfirmationClose} sx={{fontSize: "16px",color: colors.grey[100]}}>
        <DialogTitle sx={{fontSize: "28px"}}>위급상황 확인</DialogTitle>
        <DialogContent>
          <Typography sx={{fontSize: "20px"}}>해당 데이터를 신고 완료 하겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationSubmit} sx={{background: "white", fontWeight: "bold", fontSize: "16px"}}>확인</Button>
          <Button onClick={handleConfirmationClose} sx={{background: "grey", fontWeight: "bold", fontSize: "16px"}}>취소</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmergencyLocation;