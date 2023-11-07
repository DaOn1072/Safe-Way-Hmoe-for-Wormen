import React, { useState } from 'react';
import api_key from './api_key.json'; 

const ProtectedAreaAPI = () => {
    const [city_code, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [cctvYnData, setCctvYnData] = useState([]);

    const hInputchange = (e) => {
        setCity(e.target.value);
    }

    const API_KEY = api_key.API_KEY_HOME;
    
    function sumCCTVCount(items) {
        let sum = 0;
        for (const item of items) {
            if (item.CCTV_CNT) {
                sum += parseInt(item.CCTV_CNT, 10);
            }
        }
        return sum;
    }

    function getCCTVNotInstalledData(items) {
        return items.filter(item => !item.CCTV_YN || item.CCTV_YN.trim() !== '1');
    }

    function getFacilityTypeDescription(facilityType) {
        switch (facilityType) {
            case '1':
                return '어린이보호구역';
            case '2':
                return '노인보호구역';
            case '3':
                return '장애인보호구역';
            default:
                return '알 수 없음';
        }
    }

    const fetchWeatherData = async () => {
        const cityCode = parseInt(city_code, 10); // 10진수로 파싱
        const url = `/guide/getSafeOpenJson.do?key=${API_KEY}&sidoCd=${cityCode}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const result = await response.json();
            setWeatherData(result);

            // CCTV_YN가 2 또는 NULL인 데이터 추출
            const notInstalledData = getCCTVNotInstalledData(result.items);
            setCctvYnData(notInstalledData);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='ProtectedAreaAPI'>
            <h1>날씨 앱</h1>
            <input
                type="text"
                placeholder='도로명을 입력하시오'
                value={city_code}
                onChange={hInputchange}
            />
            <button onClick={fetchWeatherData}>날씨 정보 확인</button>

            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h2>{weatherData.items.length > 0 ? weatherData.items[0].SIDO_NM : ''}</h2>
                    <p>CCTV_CNT 총 설치된 cctv 수: {sumCCTVCount(weatherData.items)}</p>      
                    <p>CCTV_YN가 2 또는 NULL인 데이터:</p>
                    <ul>
                        {cctvYnData.map(item => (
                            <li key={item.SNCT_SEQ}>
                                FCLTY_NM: {item.FCLTY_NM}, GOV_NM: {item.GOV_NM}, GOV_TEL: {item.GOV_TEL && `(${item.GOV_TEL})`}, FCLTY_TY: {getFacilityTypeDescription(item.FCLTY_TY)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProtectedAreaAPI;