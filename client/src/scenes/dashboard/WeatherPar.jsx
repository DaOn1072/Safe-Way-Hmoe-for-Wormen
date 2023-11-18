import React, { useState } from 'react';
import WeatherT from './Weather'; // Weather 컴포넌트 파일 경로에 맞게 수정하세요.

function WeatherPar() {
    const [weather, setWeather] = useState(null);

    return (
        <div>
            <WeatherT weather={weather} setWeather={setWeather} />
            {/* 기타 다른 컴포넌트들 */}
        </div>
    );
}

export default WeatherPar;