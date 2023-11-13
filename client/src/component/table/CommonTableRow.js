import React from 'react';
import { Box, useTheme } from '@mui/system';
import { tokens } from '../../theme';

const CommonTableRow = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <tr className="common-table-row">
      {React.Children.map(children, (child, index) => (
        <td key={index}>
          <Box sx={{ width: '100%', 
                    padding: '10px 5px', 
                    backgroundColor: colors.primary[600],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center" }}>
            <div className='rowTable'>
              {child}
            </div>
          </Box>
        </td>
      ))}
    </tr>
  );
};

export default CommonTableRow;