import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React, { useState, useEffect } from 'react';


const MonthChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [MonthData, setMonthData] = useState([]);

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

  // 빈 데이터 생성 및 채우기
  for (let i = 0; i < 12; i++) {
    const year = new Date().getFullYear();
    const month = (i + 1).toString().padStart(2, '0');
    const monthKey = `${year}-${month}`;

    // 데이터가 없는 경우 0으로 초기화
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
  }

  // 월별 신고량 데이터 구조에 맞게 변환
  const processedData = Object.keys(monthlyData)
  .map((monthKey) => ({
    country: monthKey, // 년-월 형태로 설정
    Month: monthlyData[monthKey], // 해당 월의 신고량
    MonthColor: "hsl(296, 70%, 50%)", // 색상 설정
  }))
  .sort((a, b) => {
    const [aYear, aMonth] = a.country.split('-');
    const [bYear, bMonth] = b.country.split('-');
    return new Date(`${aYear}-${aMonth}`) - new Date(`${bYear}-${bMonth}`);
  });

  return processedData;
      };
    }, []);

  
  return (
    <ResponsiveBar
    data={MonthData}
      theme={{
        // added
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
      keys={["Month"]}
      indexBy="country"
      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 110,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default MonthChart;