import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import CustomerAdd from './CustomerAdd';
import CustomerDelete from './CustomerDelete';


const Police_office = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "연번", flex: 0.5 },
    { field: "police_office", headerName: "경찰서" },
    { field: "name", headerName: "관서명", flex: 1, cellClassName: "name-column-cell" },
    { field: "division", headerName: "구분", headerAlign: "left", align: "left" },
    { field: "phone_number", headerName: "전화번호", flex: 1 },
    { field: "address", headerName: "주소", flex: 1 },
    {
      field: "delete",
      headerName: "설정",
      flex: 0.5,
      renderCell: (params) => (
        <CustomerDelete id={params.row.id} stateRefresh={stateRefresh} />
      ),
    },
  ];

  const [data, setData] = useState([]);

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
        <CustomerAdd stateRefresh={stateRefresh} /> {/* stateRefresh 함수를 props로 전달 */}
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        ></DataGrid>
      </Box>
      
    </Box>
  );
}

export default Police_office;