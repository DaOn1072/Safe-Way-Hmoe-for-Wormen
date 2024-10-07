// React 컴포넌트 'CommonTableRow'는 테이블의 행(tr)을 정의하고, 
// 그 안에 자식 요소를 배치하는 역할을 합니다.
// 'useTheme' 훅과 'tokens'를 사용하여 테마 색상을 동적으로 설정하며,
// 각 테이블 셀(td)의 스타일을 지정합니다.

import React from 'react';
import { Box, useTheme } from '@mui/system'; // MUI에서 제공하는 'Box'와 테마 훅을 불러옵니다.
import { tokens } from '../../theme'; // 테마 색상 토큰을 불러옵니다.

const CommonTableRow = ({ children }) => { // props로 전달받은 자식 요소(children)를 사용합니다.
  const theme = useTheme(); // 현재 테마를 가져오기 위해 'useTheme' 훅을 사용합니다.
  const colors = tokens(theme.palette.mode); // 테마 모드에 맞는 색상 토큰을 가져옵니다.

  return (
    <>
      <tr className="common-table-row"> {/* 테이블의 행(tr)을 정의합니다. */}
        {/* 자식 요소들을 순회하며 각 요소를 테이블 셀(td)로 출력합니다. */}
        {React.Children.map(children, (child, index) => (
          <td key={index}> {/* 각 셀에 고유한 key를 부여하여 생성합니다. */}
            <Box
              sx={{
                flex: index === 1 ? '2' : '1', // 두 번째 셀은 다른 셀보다 2배 넓게 설정합니다.
                padding: '5px', // 셀의 내부 여백을 설정합니다.
                display: "flex", // flexbox 레이아웃을 적용합니다.
                fontSize: "20px", // 텍스트 크기를 설정합니다.
                justifyContent: 'center', // 내용물을 중앙에 배치합니다.
                color: index === 4 ? colors.greenAccent[300] : colors.grey[100] // 4번째 셀은 다른 색상으로 설정합니다.
              }}
            >
              <div className='rowTable'> {/* 셀 내부의 내용을 감싸는 div입니다. */}
                {child} {/* 자식 요소를 출력합니다. */}
              </div>
            </Box>
          </td>
        ))}
      </tr>
      <tr>
        <td colSpan={React.Children.count(children)}> {/* 자식 요소의 개수만큼 열을 합칩니다. */}
          <Box
            sx={{
              height: '1px', // 1px 높이의 선을 설정합니다.
              backgroundColor: colors.grey[100], // 선의 배경색을 테마에 맞게 설정합니다.
            }}
          />
        </td>
      </tr>
    </>
  );
};

// 해당 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default CommonTableRow;
