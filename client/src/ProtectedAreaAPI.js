import React, { useState, useEffect } from 'react';
import api_key from './api_key.json';

const ProtectedAreaAPI = ({ onDataReceived }) => {
    const [city_code, setCity] = useState('');
    const [error, setError] = useState(null);

    const hInputChange = (e) => {
        setCity(e.target.value);
    }

    const API_KEY = api_key.API_KEY_HOME;

    const fetchWeatherData = async () => {
        const cityCode = parseInt(city_code, 10);
        const url = `/guide/getSafeOpenJson.do?key=${API_KEY}&sidoCd=${cityCode}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const result = await response.json();

            // 데이터를 가공하여 설치된 CCTV와 설치되지 않은 CCTV 데이터를 생성
            const installedCCTVData = result.items.filter(item => item.CCTV_YN && item.CCTV_YN.trim() === '1');
            const notInstalledCCTVData = result.items.filter(item => !item.CCTV_YN || item.CCTV_YN.trim() !== '1');

            // 데이터를 상위 컴포넌트로 전달
            onDataReceived(result, installedCCTVData, notInstalledCCTVData);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='ProtectedAreaAPI' >
            <input
                type="text"
                placeholder='시도코드를 입력하시오'
                value={city_code}
                onChange={hInputChange}
                style={{margin: "3px", padding: "5px"}}
            />
            <button onClick={fetchWeatherData}>정보 확인</button>

            {error && <p>{error}</p>}
        </div>
    );
}

export default ProtectedAreaAPI;