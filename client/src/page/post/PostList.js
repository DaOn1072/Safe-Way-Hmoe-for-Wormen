import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../component/table/CommonTable';
import CommonTableColumn from '../../component/table/CommonTableColumn';
import CommonTableRow from '../../component/table/CommonTableRow';
import { Box } from '@mui/system';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';

const PostList = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataList, setDataList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;

  useEffect(() => {
    fetch('/api/report')
      .then((response) => response.json())
      .then((data) => {
        // Sort data by dateInfo in descending order (most recent first)
        data.sort((a, b) => new Date(b.dateInfo) - new Date(a.dateInfo));
        setReportData(data);
      })
      .catch((error) => console.error(error));
  
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => {
        setCustomerData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderTable = () => {
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = reportData.slice(firstIndex, lastIndex);

    return (
      <CommonTable headersName={['번호', '근처 도로', '발생일', '연결된 경찰서', '신고 수신 확인']}>
        {records.map((item, index) => {
          const closestLocation = findClosestLocation(item.lat, item.lon);
          const newId = index + 1 + (currentPage - 1) * recordsPerPage; // 1부터 순서대로 번호를 부여
          return (
            <CommonTableRow key={index}>
              <CommonTableColumn>{newId}</CommonTableColumn>
              <CommonTableColumn>
                <Link to={`/post/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {closestLocation.address}
                </Link>
              </CommonTableColumn>
              <CommonTableColumn>{item.dateInfo}</CommonTableColumn>
              <CommonTableColumn>{closestLocation ? closestLocation.police_office : ''}</CommonTableColumn>
              <CommonTableColumn>
                {item.checkYN === 'Y' ? '수신 확인' : item.checkYN ? '수신 미확인' : ''}
              </CommonTableColumn>
            </CommonTableRow>
          );
        })}
      </CommonTable>
    );
  };

  const findClosestLocation = (targetLat, targetLon) => {
    const closestLocation = customerData.reduce((closest, customer) => {
      const latDiff = parseFloat(customer.latitude) - parseFloat(targetLat);
      const lonDiff = parseFloat(customer.longitude) - parseFloat(targetLon);
      const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);

      if (distance < closest.distance) {
        return { ...customer, distance };
      }
      return closest;
    }, { distance: Infinity });

    return closestLocation;
  };


  const totalPageCount = Math.ceil(reportData.length / recordsPerPage);
  
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageCount;

  const perPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const changeCPage = (no) => {
    setCurrentPage(no);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPageCount));
  };

  return (
    <>
      {renderTable()}
      <Box m="0px 10px 20px 20px" height="10vh" sx={{ marginTop: '29px', textAlign: 'center' }}>
        <Box height="5vh" sx={{}}>
          <nav>
            <ul className="pagination" style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
            <li className="page-item" style={{ backgroundColor: colors.primary[700], marginRight: '5px', padding: '10px', borderRadius: '5px' }}>
        <a
          href="#"
          className="page-link"
          onClick={perPage}
          style={{
            color: colors.greenAccent[400],
            fontSize: '16px',
            textDecoration: 'none',
            fontWeight: 'bold',
            pointerEvents: isFirstPage ? 'none' : 'auto',
            opacity: isFirstPage ? 0.5 : 1,
          }}
        >
          Prev
        </a>
      </li>
              {[...Array(Math.ceil(reportData.length / recordsPerPage)).keys()].map((n, i) => (
                <li
                  className={`page-item ${currentPage === n + 1 ? 'active' : ''}`}
                  key={i}
                  style={{
                    background: currentPage === n + 1 ? colors.greenAccent[500] : colors.greenAccent[400],
                    marginRight: '5px',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changeCPage(n + 1)}
                    style={{ color: currentPage === n + 1 ? 'black' : 'white', textDecoration: 'none' }}
                  >
                    {n + 1}
                  </a>
                </li>
              ))}
      <li className="page-item" style={{ listStyleType: 'none', backgroundColor: colors.primary[700], marginLeft: '5px', padding: '10px', borderRadius: '5px' }}>
        <a
          href="#"
          className="page-link"
          onClick={nextPage}
          style={{
            color: colors.greenAccent[400],
            fontSize: '16px',
            fontWeight: 'bold',
            textDecoration: 'none',
            pointerEvents: isLastPage ? 'none' : 'auto',
            opacity: isLastPage ? 0.5 : 1,
          }}
        >
          Next
        </a>
              </li>
            </ul>
          </nav>
        </Box>
      </Box>
    </>
  );
};

export default PostList; 