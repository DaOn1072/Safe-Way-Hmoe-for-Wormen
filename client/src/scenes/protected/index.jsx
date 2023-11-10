import React, { useState, useEffect } from 'react';
import ProtectedAreaAPI from '../../ProtectedAreaAPI';

const Protected = () => {
    const [data, setData] = useState(null);
    const [cctvData, setCCTVData] = useState({
        어린이보호구역: { installed: 0, notInstalled: 0 },
        노인보호구역: { installed: 0, notInstalled: 0 },
        장애인보호구역: { installed: 0, notInstalled: 0 },
    });

    const onDataReceived = (receivedData, installedCCTVData, notInstalledCCTVData) => {
        setData(receivedData);

        // 데이터를 가공하여 CCTV 설치 여부 및 수를 업데이트
        installedCCTVData.forEach(item => {
            const facilityType = getFacilityTypeDescription(item.FCLTY_TY);
            cctvData[facilityType].installed += 1;
        });

        notInstalledCCTVData.forEach(item => {
            const facilityType = getFacilityTypeDescription(item.FCLTY_TY);
            cctvData[facilityType].notInstalled += 1;
        });
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

    return (
        <div className="Protected">
            <ProtectedAreaAPI onDataReceived={onDataReceived} />

            {data && (
                <div>
                    <h2>{data.items.length > 0 ? data.items[0].SIDO_NM : ''}</h2>
                    <p>CCTV_CNT 총 설치된 CCTV 수:</p>
                    <ul>
                        {Object.keys(cctvData).map(facilityType => (
                            <li key={facilityType}>
                                {facilityType}: 설치된 CCTV {cctvData[facilityType].installed}, 설치되지 않은 CCTV {cctvData[facilityType].notInstalled}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Protected;