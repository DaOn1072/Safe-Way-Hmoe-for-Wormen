// React 컴포넌트 'CommonTableColumn'은 테이블의 열(td)을 정의하고, 
// 그 안에 자식 요소를 표시하는 역할을 합니다.
// MUI 라이브러리의 'Box' 컴포넌트와 'useTheme' 훅을 사용하여 스타일을 적용하며,
// 'tokens' 함수로 테마에 맞는 색상 설정을 적용합니다.

import React from 'react';
import { Box, useTheme } from '@mui/system'; // MUI에서 제공하는 'Box'와 테마 훅을 불러옵니다.
import { tokens } from '../../theme'; // 테마 색상 토큰을 불러옵니다.

const CommonTableColumn = ({ children }) => { // props로 전달받은 자식 요소(children)를 사용합니다.
  const theme = useTheme(); // 현재 테마를 가져오기 위해 'useTheme' 훅을 사용합니다.
  const colors = tokens(theme.palette.mode); // 테마 모드에 맞는 색상 토큰을 가져옵니다.

  return (
    <td className="common-table-column"> {/* 테이블의 열(td)을 정의합니다. */}
      <Box sx={{ width: "100%" }}> {/* 자식 요소를 감싸는 박스를 정의하고, 전체 너비를 설정합니다. */}
        <div className='columnPost'> {/* 자식 요소를 감싸는 div로, 스타일 클래스 'columnPost'를 사용합니다. */}
          {children} {/* props로 전달받은 자식 요소를 출력합니다. */}
        </div>
      </Box>
    </td>
  );
};

// 해당 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default CommonTableColumn;
