import React, { useState, useEffect } from 'react';
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
// import { saveAs } from 'file-saver';


const SafeReturnRoad = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

//   const downloadCSV = () => {
//     const csvData = [                // 배열 형태로 CSV 데이터 생성
//       columns.map((column) => column.headerName).join(','), // 헤더 행 생성
//       ...data.map((row) => columns.map((column) => row[column.field]).join(',')), // 각 데이터 행 생성
//     ].join('\n'); // 각 행을 개행 문자로 연결

//     const csvContent = "\uFEFF" + new Blob([csvData], { type: 'text/csv;charset=utf-8' });
//     saveAs(csvContent, 'safe_return_road_data.csv');
//   };

  const columns = [
    { field: "city_county_district", headerName: "시군구", flex: 1 },
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
    // stateRefresh 함수 정의
    fetch('/api/saferoad')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
      
  };

  useEffect(() => {
    stateRefresh(); // 컴포넌트가 로드될 때 데이터 불러오기
  }, []);

  return (
    <Box m="20px">

      <Box m="40px 0 0 0" height="70vh" sx={{
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
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}>
        <DataGrid
          rows={data}
          columns={columns}
        //   components={{ Toolbar: () => <GridToolbar onClick={downloadCSV} /> }}
        />
      </Box>
      
    </Box>
  );
}

export default SafeReturnRoad;