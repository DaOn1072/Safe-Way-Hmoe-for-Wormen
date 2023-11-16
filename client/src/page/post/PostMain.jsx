import React from 'react';
import { tokens } from "../../theme";
import { useTheme } from "@mui/system";
import PostList from './PostList';
import { Box } from '@mui/system';
import Header from '../../components/Header';


const PostMain = props => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  return (
      <div className="PostListScenes" style={{margin: "20px"}}>
      <Header
        title="신고 데이터 게시판"
        subtitle="수신 완료된 데이터가 저장되어 있는 게시판입니다. 신고 접수 여부와 기록을 제공합니다."
      />
      <Box height="80vh" sx={{ marginTop: '29px', textAlign: "center", color: colors.grey[100] }}>
        <Box height="80vh">
      <h1 align="center">수신 확인된 데이터 게시판 </h1>
      <PostList />
      </Box>
      </Box>

      </div>
  )



}

export default PostMain;