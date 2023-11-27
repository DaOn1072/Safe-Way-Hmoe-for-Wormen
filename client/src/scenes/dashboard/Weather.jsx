import React, { useEffect, useState } from 'react';
import api_key from '../../api_key.json';
import cctv_key from '../../api_key.json';
import '../../App.css';
import WeatherBtn from './WeatherBtn';
import ClipLoader from "react-spinners/ClipLoader";
import { tokens } from "../../theme";
import { useTheme } from "@mui/system";



function WeatherT({ weather, setWeather }) {
    const CCTV_API_KEY = cctv_key.API_KEY_HOME;
    const API_KEY = api_key.API_KEY_WEATHER;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [updateWeather, setUpdateWeather] = useState(false);
    

    const [cities, setCities] = useState(['seoul', 'busan', 'gwangju', 'daegu', 'Incheon', 'Daejeon', 'Ulsan', 'Namyangju', 'Sejong', 'Suwon', 'Changwon', 'Pohang', 'Paju', 'Cheonan', 'Asan', 'gongju', 'Gwangyang', 'Gumi']);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null); // Add state for id
    const [error, setError] = useState(null); // Add state for error
    const [icon, setIcon] = useState(null); // Add state for icon
    

    const todayData = () => {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        let now = new Date();
        let todayYear = now.getFullYear(); // 현재 년도
        let todayMonth = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
        let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
        let dayOfWeek = week[now.getDay()];
    
        // 현재 시간과 분
        let hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
        let minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
    
        return todayYear + '년 ' + todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일 ' + hours + '시 ' + minutes + '분';
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
    console.log('데이터 확인', data);
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



    const [cctvData, setCCTVData] = useState([]); // CCTV 데이터 상태 추가

    useEffect(() => {
      // 컴포넌트가 마운트될 때 API를 호출하여 CCTV 데이터를 가져옴
      fetch('/api/cctv') // 해당 엔드포인트에 요청을 보냄
          .then(response => response.json()) // JSON 형태로 변환
          .then(data => {
              // 가져온 CCTV 데이터를 상태에 저장
              setCCTVData(data);
          console.log("경로 데이터 확인", data)
          })
          .catch(error => {
              console.error('CCTV 데이터를 불러오는 데 실패했습니다:', error);
          });
  }, []);
    
  const [selectedCityCCTVData, setSelectedCityCCTVData] = useState(null);

// Function to find matching CCTV data for the selected city
const findCCTVDataForCity = (selectedCity) => {
  const cityCCTVData = cctvData.find((cctv) => cctv.cctvName.toLowerCase() === selectedCity.toLowerCase());
  if (cityCCTVData) {
    setSelectedCityCCTVData(cityCCTVData);
  } else {
    setSelectedCityCCTVData(null);
  }
};

// Update the URL for the iframe based on the selected city
const getIframeURL = () => {
  if (selectedCityCCTVData) {
    const { cctvId, cctvUrl, cctvKind, cctvIp, cctvCh, cctv_id, cctvPaw, cctvPort } = selectedCityCCTVData;
    return `http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=${CCTV_API_KEY}&cctvid=${cctvId}&cctvName=${cctvUrl}&kind=${cctvKind}&cctvip=${cctvIp}&cctvch=${cctvCh}&id=${cctv_id}&cctvpasswd=${cctvPaw}&cctvport=${cctvPort}`;
  }
  return ''; // Return an empty string if no matching data found
};

// Call this function when a city button is clicked
const setCity = (selectedCity) => {
  findCCTVDataForCity(selectedCity);
  // Other code related to getting weather by city...
  // Update the weather based on the selected city
  getWeatherByCity(selectedCity);
  setUpdateWeather(!updateWeather);
};


    return (
      <div className="weather-box" style={{ margin: "20px", maxWidth: "100%" }}>
        <WeatherBtn cities={cities} setCity={setCity} updateWeather={updateWeather} />
        {loading ? (
          <div className='container' style={{margin: "150px"}}>
              <ClipLoader 
                  color="aqua"
                  loading={loading}
                  size={150}
                  
              />
          </div>
      ):(
        <div style={{ display: "flex", flexWrap: "wrap" }}> {/* 부모 div */}
          <div className='container' style={{ margin: "5px", marginLeft: "50px", marginTop: "10px", flex: "1 1 300px" }}>
            <h1 style={{ color: colors.greenAccent[500] }}>{weather?.name}</h1>
            <h2>{todayData()}</h2>
            <div id={id}></div>
            <h3>{weather?.weather[0]?.main}</h3>
            {icon && (
              <img className="img-fluid" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} style={{width: "120px", height: "120px"}}/>
            )}
            <h2>
              {weather?.main.temp}℃ / {((weather?.main.temp * 9) / 5 + 32).toFixed(2)}℉
            </h2>
          </div>
          <div style={{ margin: "50px", marginLeft: "0px", flex: "1 1 300px" }}>
  {selectedCityCCTVData && (
    <div>
      <iframe
        title="External Video"
        src={getIframeURL()} // Use the function to get the URL dynamically
        width="100%" 
        height="300"
        style={{ maxWidth: "800px", transform: "scale(1.0)" }} 
      />
      <div>
        <p style={{ textAlign: "center", color: colors.greenAccent[500]}}>*실제 상황과 최대 60초 정도 차이날 수 있습니다. 경찰청(UTIC)제공</p>
      </div>
    </div>
  )}
</div>
      
          </div>
        )}
      </div>
    );
}

export default WeatherT; 