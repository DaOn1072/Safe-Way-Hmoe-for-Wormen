import Header from "../../components/Header";
import HourlyChart from "../../components/HourlyChart";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import WeekChart from "../../components/WeekChart";
import MonthBarChart from "../../components/MonthChart";

const Line = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className='protectedTop'>
      <div className='protectedTopLeft'>
        <Box m="20px">
          <Header title="날짜별 통계 차트" subtitle="위급상황 발생 신고가 들어온 횟수를 일, 주, 월 단위 그래프로 표현해 신고량을 제공합니다." />
  
          <div style={{ flexDirection: 'column', color: colors.grey[100] }}>
            {/* 첫 번째와 두 번째 차트 */}
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <Box width="56%" height="35vh" style={{ marginBottom: '10px', marginLeft: '10px' }}>
                <h3 style={{ marginLeft: "50px" }}>하루 신고량</h3>
                <HourlyChart />
              </Box>
  
              <Box width="44%" height="35vh" style={{ marginBottom: '20px', marginLeft:"-30px" }}>
                <h3 style={{ marginLeft: "50px" }}>주간 신고량</h3>
                <WeekChart />
              </Box>
            </div>
  
            {/* 세 번째 차트 */}
            <Box style={{ flexGrow: 1 }} height="35vh" sx={{ marginLeft: '10px' }}>
              <h3 style={{ marginLeft: "50px" }}>월별 신고량</h3>
              <MonthBarChart />
            </Box>
          </div>
        </Box>
      </div>
    </div>
  );
}  
  
export default Line;