import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { ClipLoader } from 'react-spinners';

const HourlyData = () => {
  const [closestRoads, setClosestRoads] = useState([]);
  const [closestRoadsData, setClosestRoadsData] = useState([]); 

  // ... existing useEffect block to fetch and process data

  useEffect(() => {
    setClosestRoads(closestRoadsData); // Set the retrieved closestRoadsData
  }, [closestRoadsData]);



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isAccordionClose, setIsAccordionClose] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [apiLatitude, setApiLatitude] = useState(null);
  const [apiLongitude, setApiLongitude] = useState(null);
  const [reportData, setReportData] = useState([]);
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
  
        // Assuming 'lat' and 'har' are keys directly in each object within 'data'
        const latitude = data.map(item => item.lat);
        const longitude = data.map(item => item.lon);
  
        // Set apiLatitude and apiLongitude with the fetched values
        // For example, if you want the first set of lat and har
        setApiLatitude(latitude[0]);
        setApiLongitude(longitude[0]);
  
        // Assuming 'data' contains an array of report information
        setReportData(data); // This should set reportData as an array
      })
      .catch((error) => console.error(error));
  }, []);




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
    <Box m="20px"  display="flex" justifyContent="center" alignItems="center" marginLeft="170px" marginTop="120px">
      <Typography  display="flex" variant="h3" textAlign="center" mt={5}>
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
        <Box key={index} >
        <Box m="0px" >
              <Box display="flex" justifyContent="space-between" 
              sx={{ width: "100%" , 
                    margin: "0px"  , 
                    padding: "5px 12px",
                }}
              >
                <Typography color={colors.grey[100]} variant="h3" padding="15px 30px" fontWeight="bold" border={`4px solid ${colors.primary[500]}`} >
                  {`${emergency.dateInfo} 위급상황 발생 ${emergency.lat} | ${emergency.lon}`}
                </Typography>
              </Box>
            </Box>
        </Box>
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
          marginLeft="170px" marginTop="120px"
        />
      </div>
    ) : (
      emergencyReports // 필터링된 긴급 보고서 렌더링
      )}
    </div>
    </Box>
  );
};

export default HourlyData; 