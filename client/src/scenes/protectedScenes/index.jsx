import "./protected.css"
import React, { useState } from 'react';
import ProtectedAreaAPI from '../../ProtectedAreaAPI';
import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { DataGrid, } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import BarChart from "../../components/BarChart";


export default function ProtectedScenes() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const leftStyle = {
        backgroundColor: colors.primary[400],
    };    
    const lightStyle = {
        backgroundColor: colors.primary[500],
    };    
    const greenStyle = {
        color: colors.greenAccent[500],
    }

    const [data, setData] = useState({
        items: [] // 빈 배열로 초기화
    });
    const [cctvYnData, setCctvYnData] = useState([]); // 추가
    const [cctvData, setCCTVData] = useState({
        어린이보호구역: { installed: 0, notInstalled: 0 },
        노인보호구역: { installed: 0, notInstalled: 0 },
        장애인보호구역: { installed: 0, notInstalled: 0 },
    });

    // const onDataReceived = (receivedData, receivedCctvYnData) => {
    //     setData(receivedData);
    //     setCctvYnData(receivedCctvYnData); // 업데이트
    // }
    // function sumCCTVCount(items) {
    //     let sum = 0;
    //     for (const item of items) {
    //         if (item.CCTV_CNT) {
    //             sum += parseInt(item.CCTV_CNT, 10);
    //         }
    //     }
    //     return sum;
    // }

    const onDataReceived = (receivedData, installedCCTVData, notInstalledCCTVData) => {
        setData(receivedData);
    
        // 데이터를 초기화
        const initialCctvData = {
            어린이보호구역: { installed: 0, notInstalled: 0 },
            노인보호구역: { installed: 0, notInstalled: 0 },
            장애인보호구역: { installed: 0, notInstalled: 0 },
        };
    
        // 설치된 CCTV와 설치되지 않은 CCTV 데이터를 새로운 객체에 합산
        installedCCTVData.forEach(item => {
            const facilityType = getFacilityTypeDescription(item.FCLTY_TY);
            initialCctvData[facilityType].installed += 1;
        });
    
        notInstalledCCTVData.forEach(item => {
            const facilityType = getFacilityTypeDescription(item.FCLTY_TY);
            initialCctvData[facilityType].notInstalled += 1;
        });
    
        // 초기화된 데이터로 업데이트
        setCCTVData(initialCctvData);
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
    

    const columns = [
        {
            field: "FCLTY_NM",
            headerName: "대상 시설명",
            flex: 1,
            cellClassName: "name-column-cell",
        },
        {
            field: "GOV_NM",
            headerName: "관리기관명",
            flex: 1,
        },
        {
            field: "GOV_TEL",
            headerName: "관리기관전화번호",
            flex: 1,
        },
        {
            field: "FCLTY_TY",
            headerName: "시설종류",
            flex: 0.5,
            valueGetter: (params) => {
                switch (params.row.FCLTY_TY) {
                    case '1':
                        return '어린이보호구역';
                    case '2':
                        return '노인보호구역';
                    case '3':
                        return '장애인보호구역';
                    default:
                        return '알 수 없음';
                }
            },
        },
    ];


    return (
        <div className='protectedScenes'>
            <Header title="보호구역 데이터" subtitle="전국 보호구역(어린이, 노인, 장애인) 데이터를 제공합니다. " />
            <ProtectedAreaAPI onDataReceived={onDataReceived} />
            <div className='protectedTop'>
                <div className='protectedTopLeft'>
                        <Box m="7px 0 0 0" height="45vh" backgroundColor={colors.primary[400]} sx={{
                            width: "100%",
                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid--cell": {
                                color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: colors.blueAccent[700],
                              },
                            "& .MuiDataGrid-virtaulScroller": {
                                backgroundColor: colors.primary[400],
                            },
                            "& .MuiCheckbox-root": {
                                color: `${colors.greenAccent[200]} !important`,
                            }
                        }}>
                        <DataGrid
                            rows={data.items} // "data.items"는 데이터 배열로 가정
                            columns={columns}
                            getRowId={(row) => row.SNCT_SEQ} // SNCT_SEQ를 ID로 사용
                        />
                        </Box>
            </div>
            <div className="protectedTopRight">
            <Box m = "0px 20px 20px 20px" height="45vh" backgroundColor = {colors.primary[400]} sx={{ padding: "20px", fontSize: "19px", color: colors.grey[100]}}>
            {data && (
                <div>
                    <h2>{data.items.length > 0 ? data.items[0].SIDO_NM : ''}</h2>
                    <p>보호구역별 설치된 CCTV 수</p>
                    <ul>
                        {Object.keys(cctvData).map(facilityType => (
                            <li key={facilityType} style={{ marginBottom: '10px' }}>
                                <span style={greenStyle}>{facilityType}</span><br /> 설치된 CCTV {cctvData[facilityType].installed}, 설치되지 않은 CCTV {cctvData[facilityType].notInstalled}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </Box>
            
            </div>
        </div>
        <Box className='protectedBottom' sx={{marginTop: "6px", color: colors.grey[100]}} style={leftStyle}>
        <span className='protectedName' style={greenStyle}>#. 시도코드</span>
                    
            <div className='protectedBottomLeft' style={lightStyle}>

            <div className='protectedBottomInfo'>

            <div class="data-container">
    <div class="data-item">11: 서울</div>
    <div class="data-item">26: 부산</div>
    <div class="data-item">27: 대구</div>
    <div class="data-item">28: 인천</div>
    <div class="data-item">29: 광주</div>
    <div class="data-item">30: 대전</div>
    <div class="data-item">31: 울산</div>
    <div class="data-item">36: 세종</div>
    <div class="data-item">41: 경기</div>
    <div class="data-item">42: 강원</div>
    <div class="data-item">43: 충북</div>
    <div class="data-item">44: 충남</div>
    <div class="data-item">45: 전북</div>
    <div class="data-item">46: 전남</div>
    <div class="data-item">47: 경북</div>
    <div class="data-item">48: 경남</div>
    <div class="data-item">50: 제주</div>
</div>
</div>
    

            </div>
            </Box>
            <div class="utic" style={greenStyle}>*해당 데이터는 경찰청(utic)로부터 제공 받았습니다.</div>
            </div>

    )
}