import React from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import EmergencyLocation from './report';


const Report = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <div className='protectedTop'>
      <div className='protectedTopLeft'>
        <Box m="20px">
          <Header title="신고 데이터 수신" subtitle="금일 위급상황이 발생된 위치와 날짜 데이터를 제공합니다. 해당 위치에 대해 가장 가까운 파출소에 신고할 수 있습니다." />
              <Box width="100%" height="75vh" style={{ marginBottom: '10px', marginLeft: '10px' }}>
                <EmergencyLocation />
              </Box>
        </Box>
      </div>
    </div>
  );
};

export default Report; 