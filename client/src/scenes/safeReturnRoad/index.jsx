import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import saveAs from 'file-saver';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import PieChart from '../../components/PieChart';
import Header from '../../components/Header';
import BarChart from '../../components/BarChart';

const SafeReturnRoad = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "city_county_district", headerName: "시군구", flex: 2 },
    { field: "eup_dong_myeong", headerName: "읍면동명" },
    { field: "safety_bells_cnt", headerName: "안심벨 수", flex: 1, headerAlign: "center", align: "center", cellClassName: "name-column-cell" },
    { field: "cctv_cnt", headerName: "CCTV 수", headerAlign: "center", align: "center" },
    { field: "security_light_cnt", headerName: "보안등 수",  headerAlign: "center", align: "center", flex: 1 },
    { field: "information_sign_cnt", headerName: "안내표시 수", headerAlign: "center", align: "center", flex: 1 },
    { field: "safe_return_road", headerName: "안심귀갓길명", flex: 1 },
    { field: "detailed_location", headerName: "세부위치", flex: 1 },
  ];

  const [data, setData] = useState([]);

  const stateRefresh = () => {
    fetch('/api/saferoad')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    stateRefresh();
  }, []);

  const downloadCSV = () => {
    console.log("downloadCSV function is called");
    const csvData = [
      columns.map((column) => column.headerName).join(','), // Header row
      ...data.map((row) => columns.map((column) => row[column.field]).join(',')), // Data rows
    ].join('\n'); // Join rows with newline character

    const csvContent = "\uFEFF" + csvData; // Add BOM to ensure correct encoding
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) {
      // For IE
      navigator.msSaveBlob(blob, 'safe_return_road_data.csv');
    } else {
      saveAs(blob, 'safe_return_road_data.csv');
    }
  };

  // Calculate sums for each category
  const sums = {
    safety_bells_sum: data.reduce((sum, row) => sum + row.safety_bells_cnt, 0),
    cctv_sum: data.reduce((sum, row) => sum + row.cctv_cnt, 0),
    security_light_sum: data.reduce((sum, row) => sum + row.security_light_cnt, 0),
    information_sign_sum: data.reduce((sum, row) => sum + row.information_sign_cnt, 0),
  };

  // 개수가 0개인 경우의 합
  const sumSafetyBellsZero = data.reduce((sum, row) => (row.safety_bells_cnt === 0 ? sum + 1 : sum), 0);
  const sumCctvZero = data.reduce((sum, row) => (row.cctv_cnt === 0 ? sum + 1 : sum), 0);
  const sumSecurityLightZero = data.reduce((sum, row) => (row.security_light_cnt === 0 ? sum + 1 : sum), 0);
  const sumInformationSignZero = data.reduce((sum, row) => (row.information_sign_cnt === 0 ? sum + 1 : sum), 0);
  

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <button onClick={downloadCSV}>CSV Download</button>
    </GridToolbarContainer>
  );

  return (
    <div className='protectedScenes'>
        <Header title="여성안심 귀갓길 데이터 목록" subtitle="서울시에 위치한 여성안심 귀갓길의 방범 시스템 데이터를 제공합니다.(데이터 제공: 서울 열린데이터 광장)" />
        <div className='protectedTop'>
            <div className='protectedTopLeft'>
            <Box 
            m="7px 0 0 0" height="75vh" 
            sx={{
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiDataGrid-virtaulScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
                    <DataGrid
                        rows={data} // "data.items"는 데이터 배열로 가정
                        columns={columns}
                        components={{
                          Toolbar: () => (
                            <React.Fragment>
                              <CustomToolbar />
                            </React.Fragment>
                          ),
                        }}
                    />
                    </Box>
        </div>
        <div className="protectedTopRight">
        <Box m="0px 20px 20px 20px" height="30vh" sx={{ marginTop: '29px', textAlign: "center"}}>
          <h2> [ 방범 시스템 개수가 0인 경우 합계 ]</h2>
        <Box height="27vh">
                <BarChart/>

            </Box>
          </Box>
        <Box m = "0px 20px 20px 20px" height="40vh" backgroundColor = {colors.primary[400]} sx={{textAlign: "center", padding: "5px"}}>
        <h2> [ 방범 시스템 종류별 합계 ]</h2>
            <Box height="37vh">
                <PieChart/>

            </Box>
        </Box>
        
        </div>
    </div>
    </div>
  );
};

export default SafeReturnRoad;