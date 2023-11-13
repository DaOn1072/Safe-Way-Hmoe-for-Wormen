import React from 'react';
import './CommonTable.css';
import { Box, useTheme } from '@mui/system';
import { tokens } from '../../theme';

const CommonTable = props => {
  const { headersName, children } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className='table-post'>
      <Box m="0px 20px 20px 20px" height="30vh" sx={{}}>
        <Box height="40vh" sx={{
          textAlign: "center",
          fontSize: "28px",
          borderSpacing: "0",
          backgroundColor: colors.primary[400],
        }}>
          <table className="common-table" style={{ margin: 'auto', width: '100%' }}>
            <thead>
              <tr>
                {headersName.map((item, index) => (
                  <th
                    className="common-table-header-column"
                    key={index}
                    style={{
                      backgroundColor: colors.primary[200],
                      borderBottom: '1px solid #e8e8e8',
                      padding: '10px 5px',
                      fontSize: '28px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </Box>
      </Box>
    </div>
  );
};

export default CommonTable;