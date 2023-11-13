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
      <div className="PostListScenes">
      <Header
        title="여성안심귀갓길 데이터 목록"
        subtitle="서울시에 위치한 여성안심귀갓길의 방범 시스템 데이터를 제공합니다.(데이터 제공: 서울 열린데이터 광장)"
        sx={{ margin: "20px", color: colors.greenAccent[300], color: colors.greenAccent[300] }}
      />
      <Box m="0px 10px 20px 10px" height="30vh" sx={{ marginTop: '29px', textAlign: "center"}}>
        <Box height="50vh">
      <h2 align="center">게시판</h2>
      <PostList />
      </Box>
      </Box>
      </div>
  )
}

export default PostMain;