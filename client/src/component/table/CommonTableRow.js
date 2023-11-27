import React from 'react';
import { Box, useTheme } from '@mui/system';
import { tokens } from '../../theme';

const CommonTableRow = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <tr className="common-table-row">
        {React.Children.map(children, (child, index) => (
          <td key={index}>
            <Box
              sx={{
                flex: index === 1 ? '2' : '1',
                padding: '5px',

                display: "flex",
                fontSize: "20px",
                justifyContent: 'center',
                color: index === 4 ? colors.greenAccent[300] : colors.grey[100]
              }}
            >
              <div className='rowTable'>
                {child}
              </div>
            </Box>
          </td>
        ))}
      </tr>
      <tr>
        <td colSpan={React.Children.count(children)}>
          <Box
            sx={{
              height: '1px',
              backgroundColor: colors.grey[100],
            }}
          />
        </td>
      </tr>
    </>
  );
}


export default CommonTableRow;