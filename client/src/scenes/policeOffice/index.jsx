import React, { useState, useEffect } from 'react';
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import CustomerAdd from './CustomerAdd';
import CustomerDelete from './CustomerDelete';
import saveAs from 'file-saver';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';


const Police_office = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "연번", flex: 0.5 },
    { field: "police_office", headerName: "경찰서", flex: 1},
    { field: "address", headerName: "주소", flex: 1, cellClassName: "name-column-cell" },
    { field: "phone_number", headerName: "전화번호", flex: 1 },
    { field: "mail", headerName: "메일주소", flex: 1 },
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
      navigator.msSaveBlob(blob, 'police_office_info.csv');
    } else {
      saveAs(blob, 'police_office_info.csv');
    }
  };

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
          fontSize: "16px",
          fontWeight: "bold"
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
          fontSize: "16px",
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
          components={{
            Toolbar: () => (
              <React.Fragment>
                <CustomToolbar />
              </React.Fragment>
            ),
          }}
        ></DataGrid>
      </Box>
      
    </Box>
  );
}

export default Police_office;