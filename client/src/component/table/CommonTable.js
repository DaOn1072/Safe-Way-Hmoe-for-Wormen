// React 컴포넌트 'CommonTable'는 테이블 형식의 데이터를 화면에 출력하는 역할을 합니다.
// MUI 라이브러리의 'Box' 컴포넌트와 'useTheme' 훅을 사용하여 스타일과 테마를 적용하며,
// 'tokens' 함수를 통해 동적으로 테마에 맞는 색상을 설정합니다.

import React from 'react';
import './CommonTable.css'; // 테이블의 공통 스타일을 정의한 CSS 파일을 불러옵니다.
import { Box, useTheme } from '@mui/system'; // MUI에서 제공하는 'Box'와 테마 훅을 불러옵니다.
import { tokens } from '../../theme'; // 테마 색상 토큰을 불러옵니다.

const CommonTable = props => {
  // props로 전달받은 'headersName'과 'children'을 사용합니다.
  const { headersName, children } = props;
  
  // 현재 테마를 가져오기 위해 'useTheme' 훅을 사용합니다.
  const theme = useTheme();
  
  // 테마 모드(다크 모드, 라이트 모드 등)에 맞는 색상 토큰을 가져옵니다.
  const colors = tokens(theme.palette.mode);

  return (
    <div className='table-post'> {/* 테이블을 감싸는 외부 div 요소입니다. */}
      <Box m="0px 20px 20px 20px" height="50vh"> {/* 테이블의 마진과 높이를 설정합니다. */}
        <Box
          height="50vh"
          sx={{
            textAlign: "center", // 텍스트를 중앙에 정렬합니다.
            fontSize: "24px", // 기본 글꼴 크기를 설정합니다.
            borderSpacing: "0", // 테이블 셀 간의 간격을 제거합니다.
            backgroundColor: colors.primary[400], // 테마에 따라 배경색을 설정합니다.
          }}
        >
          {/* 실제 테이블 구조를 정의합니다. */}
          <table className="common-table" style={{ margin: 'auto', width: '100%' }}>
            <thead> {/* 테이블의 헤더 부분을 정의합니다. */}
              <tr> {/* 각 헤더 행을 정의합니다. */}
                {headersName.map((item, index) => (
                  <th
                    className="common-table-header-column" // 공통 테이블 헤더 스타일을 지정합니다.
                    key={index} // 각 헤더 항목에 고유한 키 값을 할당합니다.
                    style={{
                      backgroundColor: colors.blueAccent[700], // 헤더의 배경색을 설정합니다.
                      color: colors.grey[100], // 텍스트 색상을 설정합니다.
                      borderBottom: '0.2px solid #e6e6e6', // 하단 테두리 스타일을 적용합니다.
                      padding: '5px', // 셀의 여백을 설정합니다.
                      fontSize: '22px', // 글꼴 크기를 설정합니다.
                      fontWeight: 'bold', // 글꼴 두께를 설정합니다.
                    }}
                  >
                    {item} {/* 각 헤더 항목에 해당하는 이름을 출력합니다. */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody> {/* 테이블의 본문 부분으로, 전달받은 자식 요소들을 렌더링합니다. */}
              {children}
            </tbody>
          </table>
        </Box>
      </Box>
    </div>
  );
};

// 해당 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default CommonTable;
