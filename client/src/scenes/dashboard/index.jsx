import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";

import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from 'react';
// import CCTVViewer from "../ccTVViewer";
// import Cctv from "../ccTVViewer/index";
import api_key from "../../api_key.json";

const Dashboard = () => {

  const API_key_CCTV = api_key.API_KEY_CCTV;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cctvStreamURL = `/view/map/openDataCctvStream.jsp?key=${API_key_CCTV}&cctvid=L010233&cctvName=%25EC%2599%2595%25EC%258B%25AD%25EB%25A6%25AC%25EC%2597%25AD%25EC%2598%25A4%25EA%25B1%25B0%25EB%25A6%25AC&kind=Seoul&cctvip=null&cctvch=52&id=179&cctvpasswd=null&cctvport=null`;

  



  const columns = [
    { field: "id", headerName: "연번", flex: 0.5 },
    { field: "police_office", headerName: "경찰서" },
    { field: "name", headerName: "관서명", flex: 1, cellClassName: "name-column-cell" },
    { field: "division", headerName: "구분", headerAlign: "left", align: "left" },
    { field: "phone_number", headerName: "전화번호", flex: 1 },
    { field: "address", headerName: "주소", flex: 1 },
  ];

  const [data, setData] = useState([]); // useState 사용
  const stateRefresh = () => {
    // stateRefresh 함수 정의
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
      
  };

  useEffect(() => {
    stateRefresh(); // 컴포넌트가 로드될 때 데이터 불러오기
  }, []);

    return (
        <Box m = '20px' >
          <Box display = 'flex' justifyContent='space-between' alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          <Box>
            <Button
              sx = {{ backgroundColor: colors.blueAccent[700], 
                      color: colors.grey[100], 
                      fontSize: "14px", 
                      fontWeight: "bold", 
                      padding: "10px 20px"
                    }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports 
            </Button>
          </Box>
          </Box>

          {/* GRID CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            {/* <Box 
              gridColumn="span 3" 
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="61"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                  <EmailIcon 
                    sx={{ color: colors.greenAccent[600], fontSize: "26px"}}
                  />
                }
              />

            </Box>
            <Box 
              gridColumn="span 3" 
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="225"
                subtitle="Sales Obtained"
                progress="0.5"
                increase="+21%"
                icon={
                  <PointOfSaleIcon 
                    sx={{ color: colors.greenAccent[600], fontSize: "26px"}}
                  />
                }
              />
            </Box>
            <Box 
              gridColumn="span 3" 
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="16"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                  <PersonAddIcon 
                    sx={{ color: colors.greenAccent[600], fontSize: "26px"}}
                  />
                }
              />
            </Box>
            <Box 
              gridColumn="span 3" 
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="5,134"
                subtitle="Traffic Inbound"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon 
                    sx={{ color: colors.greenAccent[600], fontSize: "26px"}}
                  />
                }
              />
            </Box> */}

            {/* ROW 2 */}
            <Box
          gridColumn="span 7"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          sx={{
            // customers 표 꾸미기
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[800],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[800],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
          rows={data}
          columns={columns}
        ></DataGrid>
          
        </Box>

              {/* TRANSACTIONS */}
              <Box 
                gridColumn="span 5" 
                gridRow="span 2" 
                backgroundColor = {colors.primary[400]}
                overflow="auto"
              >
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center" 
                  borderBottom={`4px solid ${colors.primary[500]}`} 
                  colors={colors.grey[100]} 
                  p="15px"
                >
                  <Typography 
                    color={colors.grey[100]} 
                    variant="h5" 
                    fontWeight="600"
                    backgroundColor={colors.primary[400]}
                  >
                    서울특별시_송파구_여성_안심귀갓길(2023.01.17)
                  </Typography>
                </Box>
                {mockTransactions.map((transaction, i) => (
                  <Box 
                    key = {`${transaction.txId}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`} 
                    p="15px"
                  >
                    <Box>
                      <Typography 
                        color={colors.greenAccent[500]} 
                        variant="h5" 
                        fontWeight="600"
                    >
                        {transaction.txId}
                      </Typography>
                      <Typography 
                        color={colors.grey[100]} 
                      >
                        {transaction.user}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{transaction.date}</Box>
                  </Box>
                ))}
              </Box>

              {/* 날짜, cctv */}
              <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
       <Typography>Positive response to survey results</Typography>
          </Box>
          </Box>
          <Box
          gridColumn="span 3"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <Typography>Positive response to survey results</Typography>
          </Box>
          </Box>

              {/* ROW 3 */}
              <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h6" fontWeight="600">
            왕십리역오거리 CCTV 실시간 영상
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <video width="480" height="210" controls>
            <source src={cctvStreamURL} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            
            Seoul area
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
        
          </Box>
          {/* test */}
          
          

        
        {/* DataGrid에서 data와 columns를 사용 */}
        {/* <DataGrid rows={Api.state.customers} columns={Api.columns} /> */}
      </Box>
    );
};

export default Dashboard;