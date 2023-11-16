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
  const targetLatitude = 37.561057;
  const targetLongitude = 127.047944;

  const [data, setData] = useState([]);
  const [closestRoad, setClosestRoad] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('/api/safehouse')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Find the closest road when data changes
    if (data.length > 0) {
      const closestLocation = findClosestLocation(targetLatitude, targetLongitude, data);
      setClosestRoad(closestLocation);
    }
  }, [data, targetLatitude, targetLongitude]);

  const findClosestLocation = (targetLat, targetLon, locations) => {
    let closestLocation = null;
    let minDiff = Number.MAX_VALUE;

    locations.forEach(location => {
      const lat = parseFloat(location.latitude);
      const lon = parseFloat(location.hardness);

      // 대상과 현재 위도/경도 간의 절대 차이를 계산합니다.
      const latDiff = Math.abs(lat - targetLat);
      const lonDiff = Math.abs(lon - targetLon);

      const totalDiff = latDiff + lonDiff;
      // 현재 위치가 더 가까우면 가장 가까운 위치를 업데이트하세요.
      if (totalDiff < minDiff) {
        minDiff = totalDiff;
        closestLocation = location;
      }
    });

    return closestLocation;
  };

  const handleConfirmation = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmationSubmit = () => {
    // 여기에 확인 버튼을 눌렀을 때의 로직 추가
    alert('신고를 확인했습니다.');
    setIsConfirmationModalOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="신고 확인 페이지" subtitle="금일 위급상황이 발생된 위치와 날짜 데이터를 제공합니다. 해당 데이터에 대해 가장 가까운 파출소에 신고할 수 있습니다." />
      <Accordion
        defaultExpanded={isAccordionOpen}  // 여기서 isAccordionOpen을 사용하도록 수정
        onChange={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%"}}>
            <Typography color={colors.greenAccent[500]} variant="h3" padding="10px" fontWeight="bold" >
              {`2023-11-14 15:07:23 위급상황 발생 ${targetLatitude}, ${targetLongitude}`}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize="20px" padding="10px" sx={{color: colors.grey[100]}}>
              {`근처 도로: ${closestRoad?.map_name_address} | 가장 가까운 경찰서: ${closestRoad?.police_signature}`}
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
      <Accordion
          defaultExpanded={false}  // 초기에 닫힌 상태로 시작하도록 설정
          onChange={() => setIsAccordionOpen(!isAccordionOpen)}
        >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%"}}>
            
          <Typography color={colors.greenAccent[500]} variant="h3" padding="10px" fontWeight="bold" >
            2023-11-14 14:28:53 위급상황 발생 37.559337, 127.040945

          </Typography>
        </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="20px" padding="10px" sx={{color: colors.grey[100]}}>
            근처 도로: 서울특별시 성동구 마조로5길 8 | 가장 가까운 경찰서: 성동경찰서
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
      <Accordion
          defaultExpanded={false}  // 초기에 닫힌 상태로 시작하도록 설정
          onChange={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h3" padding="10px" fontWeight="bold" >
            2023-11-14 13:49:17 위급상황 발생 37.560370, 127.036091
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color: colors.grey[100]}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded={false}  // 초기에 닫힌 상태로 시작하도록 설정
          onChange={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h3" padding="10px" fontWeight="bold" >
            2023-11-14 13:02:03 위급상황 발생 37.562530, 127.036123
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color: colors.grey[100]}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
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
