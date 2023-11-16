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
      <Box m="0px 20px 20px 20px" height="50vh" sx={{}}>
        <Box height="50vh" sx={{
          textAlign: "center",
          fontSize: "24px",
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
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                      borderBottom: '0.2px solid #e6e6e6',
                      padding: '5px',
                      fontSize: '22px',
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