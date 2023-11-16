import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../component/table/CommonTable';
import CommonTableColumn from '../../component/table/CommonTableColumn';
import CommonTableRow from '../../component/table/CommonTableRow';
import { postList } from '../../Data';
import { Box } from '@mui/system';
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";

const PostList = props => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataList, setDataList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = postList.slice(firstIndex, lastIndex);
  const npage = Math.ceil(postList.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    setDataList(postList);
  }, [])

  return (
    <>
<CommonTable headersName={['번호', '근처 도로', '발생일', '연결된 경찰서', '신고여부']}>
  {dataList
    ? records.map((item, index) => (
        <CommonTableRow key={index}>
          <CommonTableColumn>{item.no}</CommonTableColumn>
          <CommonTableColumn>
          <Link to={`/post/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {item.title}
          </Link>
          </CommonTableColumn>
          <CommonTableColumn style={{ textAlign: 'right' }}>{item.createDate}</CommonTableColumn>
          <CommonTableColumn>{item.readCount}</CommonTableColumn>
          <CommonTableColumn>{item.repost}</CommonTableColumn>
        </CommonTableRow>
      ))
    : ''}
</CommonTable>
      <Box m="0px 10px 20px 20px" height="10vh" sx={{ marginTop: '29px', textAlign: "center" }}>
  <Box height="5vh" sx={{ }}>
    <nav>
      <ul className='pagination' style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <li className='page-item' style={{ backgroundColor: colors.primary[700], marginRight: '5px', padding: '10px', borderRadius: '5px' }}>
          <a href='#' className='page-link' onClick={perPage} style={{  color: colors.greenAccent[400], fontSize: '16px', textDecoration: 'none', fontWeight: 'bold' }}>
            Prev
          </a>
        </li>
        {numbers.map((n, i) => (
          <li
            className={`page-item ${currentPage === n ? 'active' : ''}`}
            key={i}
            style={{
              background: currentPage === n ? colors.greenAccent[500] : colors.greenAccent[400],
              marginRight: '5px',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            <a
              href='#'
              className='page-link'
              onClick={() => changeCPage(n)}
              style={{ color: currentPage === n ? 'black' : 'white' , textDecoration: 'none'}}
            >
              {n}
            </a>
          </li>
        ))}
        <li className='page-item' style={{ listStyleType: 'none', backgroundColor: colors.primary[700], marginLeft: '5px', padding: '10px', borderRadius: '5px' }}>
          <a href='#' className='page-link' onClick={nextPage} style={{ color: colors.greenAccent[400], fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  </Box>
</Box>
    </>
  )

  function perPage() {
    setCurrentPage(currentPage - 1);
  }

  function changeCPage(no) {
    setCurrentPage(no);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }
}

export default PostList;