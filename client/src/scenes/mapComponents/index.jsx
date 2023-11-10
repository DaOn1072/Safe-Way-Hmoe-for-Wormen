import React, { useEffect } from 'react';

const MapComponent = () => {
  // Google Maps API 초기화 함수
  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 }, // 초기 지도 중심 좌표
      zoom: 8, // 초기 확대 수준
    });

    // 추가적인 맵 설정 및 마커, 폴리라인 등을 추가할 수 있습니다.
  };

  // useEffect를 사용하여 Google Maps API 스크립트 로딩 및 초기화
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8pxPVOA99rfUEm0I_pVaj_Jk4MWN1XZE&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = initMap; // 스크립트 로딩 완료 시 초기화 함수 호출
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거 (선택 사항)
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;