import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import React, { useState, useEffect } from 'react';


const MonthPieChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [MonthData, setMonthData] = useState([]);

    const processDataFromAPI = (data) => {
        const monthlyData = {}; // 월별 신고량을 저장할 객체 생성
  
        // 데이터를 순회하면서 월 정보 추출 및 신고량 카운팅
        data.forEach((item) => {
            const dateInfo = new Date(item.dateInfo);
            const year = dateInfo.getFullYear();
            const month = (dateInfo.getMonth() + 1).toString().padStart(2, '0');
            const monthKey = `${year}-${month}`; // 년-월 형태의 키 생성
  
            // 해당 년-월의 데이터가 없으면 초기화하고, 있으면 카운트 증가
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = 1;
            } else {
                monthlyData[monthKey]++;
            }
        });
  
        // 월별 신고량 데이터 구조에 맞게 변환
        const processedData = [];
        for (let i = 1; i <= 12; i++) {
          const month = i.toString().padStart(2, '0');
          const monthKey = `2023-${month}`;
        
          const monthCount = monthlyData[monthKey] || 0;
          processedData.push({
            id: monthKey, // 'id' 속성을 'country'에서 'monthKey'로 변경
            label: monthKey, // 'label' 속성을 'monthKey'로 변경
            value: monthCount, // 'value' 속성을 'monthCount'로 변경
            color: "hsl(296, 70%, 50%)",
          });
        }
  
        return processedData;
    };



    useEffect(() => {
        // API에서 데이터 가져오기
        fetch('/api/report')
            .then((response) => response.json())
            .then((data) => {
                // API 응답에 따라 데이터 가공
                const processedData = processDataFromAPI(data); // 실제 API에서 받은 데이터를 가공하는 함수
                setMonthData(processedData); // 가공된 데이터를 state에 설정
            })
            .catch((error) => console.error(error));
    }, []);
    
    const [filteredDataForLegend, setFilteredDataForLegend] = useState([]);

    useEffect(() => {
        // legends에 표시할 데이터 필터링
        const filteredData = MonthData.filter((month) => month.value !== 0);
        setFilteredDataForLegend(filteredData);
    }, [MonthData]);

  return (
<ResponsivePie
      data={MonthData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 6,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
    ]}
    />
  );
};

export default MonthPieChart;