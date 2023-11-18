import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import { tokens } from "../../theme";
import { useTheme } from "@mui/system";

const WeatherBtn = ({ cities, setCity, updateWeather, cctvData }) => {
    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const totalPages = Math.ceil(cities.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
  
    const visibleCities = cities.slice(start, end);
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    
  
    return (
      <div>
        {/* Show Previous Button if currentPage is greater than 1 */}
        {currentPage > 1 && (
          <Button variant="contained" onClick={handlePreviousPage} sx={{ padding: '0 15px', fontSize: '16px', marginBottom: '10px', background: colors.blueAccent[600] }}>
            Previous
          </Button>
        )}
  
        {/* Show the visibleCities */}
        {visibleCities.map((item) => (
          <Button
            key={item}
            variant="contained"
            onClick={() => setCity(item)}
            sx={{ padding: '0 15px', fontSize: '16px', marginBottom: '10px', marginRight: '1px' }}
          >
            {item}
          </Button>
        ))}
  
        {/* Show Next Button if currentPage is not the last page */}
        {currentPage < totalPages && (
          <Button variant="contained" onClick={handleNextPage} sx={{ padding: '0 15px', fontSize: '16px', marginBottom: '10px', background: colors.blueAccent[600]}}>
            Next
          </Button>
        )}
      </div>
    );
};

export default WeatherBtn;