import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { useTheme } from "@mui/system";

const Police_office = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "연번", flex: 0.5 },
    { field: "police_office", headerName: "경찰서" },
    { field: "name", headerName: "name", flex: 1, cellClassName: "name-column-cell" },
    { field: "division", headerName: "구분", headerAlign: "left", align: "left" },
    { field: "phone_number", headerName: "Phone Number", flex: 1 },
    { field: "address", headerName: "주소", flex: 1 },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // API를 호출하여 데이터를 가져옵니다. (API 경로를 실제 경로로 수정해야 합니다.)
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
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
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

export default Police_office;