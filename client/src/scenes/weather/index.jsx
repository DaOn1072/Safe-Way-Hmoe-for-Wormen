import React, { useEffect, useState } from 'react';
import api_key from '../../api_key.json';
import '../../App.css';
import WeatherButton from './WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@mui/system";



function Weather({ weather, setWeather }) {
    const API_KEY = api_key.API_KEY_WEATHER;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    

    const [cities, setCities] = useState(['paris', 'new york', 'tokyo', 'seoul']);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null); // Add state for id
    const [error, setError] = useState(null); // Add state for error
    const [icon, setIcon] = useState(null); // Add state for icon
    

    const todayData = () => {
        const week = ['일', '월','화','수','목','금','토'];
        let now = new Date();
        let todayMonth = (now.getMonth()+1) > 9 ? (now.getMonth()+1) : (now.getMonth()+1);
        let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
        let dayOfWeek = week[now.getDay()];
        return todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일'
    }

    useEffect(() => {
        getCurrentLocation(); // Get current location when the component mounts
    }, []); // Empty dependency array to run it only once when mounted

    useEffect(() => {
        if (weather) {
            setId(weather.weather[0].id);
            setIcon(weather.weather[0].icon);
        }
    }, [weather]);
// 현재 위치의 날씨 정보
const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data); // Update the weather state here
    setLoading(false);

    // 아이콘 및 ID 로깅
    console.log('아이콘 확인', data.weather[0].icon);
    console.log('id 확인', data.weather[0].id);
};

// 도시별 날씨 가져오기
const getWeatherByCity = async (cityName) => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`;
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        setWeather(data); // Update the weather state here
        setLoading(false);

        // 아이콘 및 ID 로깅
        console.log('아이콘 확인', data.weather[0].icon);
        console.log('id 확인', data.weather[0].id);
    } catch (error) {
        console.log('잡힌 에러는?', error.message);
        setError(error.message);
    }
};


    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCurrentLocation(latitude, longitude);
        });
    };



    const setCity = (selectedCity) => {
        getWeatherByCity(selectedCity); // Set weather by city name
    };

    return (
        <div className="weather-box" style={{margin: "20px"}}>
        <Header
            title="신고 데이터 게시판"
            subtitle="수신 완료된 데이터가 저장되어 있는 게시판입니다. 신고 접수 여부와 기록을 제공합니다."
        />
            {loading ? (
                <div className='container'>
                    <ClipLoader 
                        color="#ff0000"
                        loading={loading}
                        size={150}
                    />
                </div>
            ):(
            <div className='container'>
                <div>{weather?.name}</div>
                <div id={id}></div>
                <h2>
                    {weather?.main.temp}℃ / {((weather?.main.temp * 9) / 5 + 32).toFixed(2)}℉
                </h2>
                <h3>{weather?.weather[0]?.main}</h3>
                <p>{todayData()}</p> 
                {icon && (
                    <img className="img-fluid" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
                )}
                <WeatherButton cities={cities} setCity={setCity} />
            </div>
            )}
        </div> 
    );
}

export default Weather; 