import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React, { useState, useEffect } from 'react';


const HourlyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    // API에서 데이터 가져오기
    fetch('/api/report')
      .then((response) => response.json())
      .then((data) => {
        // API 응답에 따라 데이터 가공
        const processedData = processDataFromAPI(data); // 실제 API에서 받은 데이터를 가공하는 함수

        setHourlyData(processedData); // 가공된 데이터를 state에 설정
      })
      .catch((error) => console.error(error));
  }, []);

  const processDataFromAPI = (data) => {
    // 시간대별 신고량을 저장할 객체 생성
    const hourlyData = {};

    // 현재 날짜를 가져오기 위해 Date 객체 사용
    const currentDate = new Date();

    // API에서 받아온 데이터를 순회하면서 시간 정보 추출 및 신고량 카운팅
    data.forEach((item) => {
      const dateInfo = new Date(item.dateInfo);

      // 현재 날짜와 동일한 날짜의 데이터만 처리
      if (
        dateInfo.getDate() === currentDate.getDate() &&
        dateInfo.getMonth() === currentDate.getMonth() &&
        dateInfo.getFullYear() === currentDate.getFullYear()
      ) {
        const hour = dateInfo.getHours(); // 시간 정보 추출

        // 시간대별로 신고량 카운팅
        if (!hourlyData[hour]) {
          hourlyData[hour] = 1; // 해당 시간대의 데이터가 없으면 초기화
        } else {
          hourlyData[hour]++; // 해당 시간대의 데이터가 있으면 카운트 증가
        }
      }
    });

    // 시간대별 신고량 데이터 구조에 맞게 변환
    const processedData = Array.from({ length: 24 }).map((_, hour) => ({
      country: `${hour.toString().padStart(2, '0')}:00`, // 시간대 설정
      Today: hourlyData[hour] || 0, // 해당 시간대의 신고량 또는 0
      TodayColor: "hsl(296, 70%, 50%)", // 색상 설정
    }));

    return processedData;
  };

  
  return (
    <ResponsiveBar
    data={hourlyData}
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
      keys={["Today"]}
      indexBy="country"
      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "set2" }}
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

export default HourlyChart;