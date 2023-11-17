import React from 'react';
import { Button } from '@mui/material';

const WeatherButton = ({ cities, setCity }) => {
    console.log('도시정보 확인', cities);

    return (
        <div>
            <Button variant="contained">
                Current Location
            </Button>
            {/* 선택된 도시를 변경하기 위해 setCity 함수를 호출 */}
            {cities.map((item) => (
                <Button 
                    key={item} 
                    variant="contained" 
                    onClick={() => setCity(item)}
                >
                    {item}
                </Button>
            ))}
        </div>
    );
};

export default WeatherButton;