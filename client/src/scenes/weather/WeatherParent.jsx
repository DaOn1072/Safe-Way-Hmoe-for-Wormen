import React, { useState } from 'react';
import Weather from './index'; // Weather 컴포넌트 파일 경로에 맞게 수정하세요.

function WeatherParent() {
    const [weather, setWeather] = useState(null);

    return (
        <div>
            <Weather weather={weather} setWeather={setWeather} />
            {/* 기타 다른 컴포넌트들 */}
        </div>
    );
}

export default WeatherParent;