import { useNavigate, useParams } from 'react-router-dom';
import './Post.css';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useTheme } from "@mui/system";
import { tokens } from '../../theme';

const PostView = () => {
  const navigate = useNavigate(); // useNavigate hook to navigate between routes
  const { no } = useParams();
  const [data, setData] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  useEffect(() => {
    console.log("Fetching data for post:", no);
    fetchData(no); // Fetch data when the component mounts
  }, [no]);

  const fetchData = (postId) => {
    // Use an API endpoint to fetch data based on postId
    fetch(`/api/posts/${postId}`) // Replace this with your API endpoint
      .then((response) => response.json())
      .then((postData) => {
        console.log("Fetched data:", postData);
        setData(postData);
      })
      .catch((error) => console.error(error));
  };

  

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="PostListScenes" style={{margin: "20px"}}>
    <Header title="신고 데이터 게시판" subtitle="상세 페이지 입니다." />
    <Box height="80vh" sx={{ marginTop: '29px', color: colors.grey[100]}}>
        <Box height="45vh" sx={{width: "100%", marginTop: "130px"}}>
      <h1 align="center">게시글 상세정보</h1>
      <Box
        sx={{
        width: '60%',
        margin: '5px 120px',
        paddingLeft: "50px",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: colors.primary[400],
        border: '2px solid #fff',
        borderRadius: '10px', 
        }}
      >
      <div className="post-view-wrapper" style={{ fontSize: "18px"}}>
      {
          data ? (
            <>
              <div className="post-view-row" >
                <label style={{  color: colors.greenAccent[400], fontWeight: "bold" }}>게시글 번호</label>
                <label>d</label>
              </div>
              <div className="post-view-row">
                <label style={{  color: colors.greenAccent[400], fontWeight: "bold" }}>근처 도로</label>
                <label>d</label>
              </div>
              <div className="post-view-row">
                <label style={{  color: colors.greenAccent[400], fontWeight: "bold" }}>발생일</label>
                <label>d</label>
              </div>
              <div className="post-view-row">
                <label style={{  color: colors.greenAccent[400], fontWeight: "bold" }}>연결된 경찰서</label>
                <label>d</label>
              </div>
              <div className="post-view-row">
                <label style={{  color: colors.greenAccent[400], fontWeight: "bold" }}>신고 내용</label>
                <div>
                  d
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        </div>
        </Box>
      
      </Box>
      <button className="post-view-go-list-btn" onClick={goBack}
        style={{margin: '5px', color: colors.greenAccent[400], fontWeight: "bold", fontSize: "18px", marginLeft: "820px", backgroundColor: colors.primary[700], border: "1px solid #fff", padding: "12px 15px", borderRadius: '10px'}}>
          목록으로 돌아가기
        </button>
      </Box>
      </div>
  );
};

export default PostView; 