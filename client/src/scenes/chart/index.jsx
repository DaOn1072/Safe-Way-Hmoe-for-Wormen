import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import TwoBarChart from "../../components/TwoBarChart";

const Chart = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <TwoBarChart />
      </Box>
    </Box>
  );
}

export default Chart;