import { getPostByNo } from '../../Data';
import { useNavigate, useParams } from 'react-router-dom';
import './Post.css';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';

const PostView = () => {
  const navigate = useNavigate(); // useNavigate hook to navigate between routes
  const { no } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("Fetching data for post:", no);
    const postData = getPostByNo(no);
    console.log("Fetched data:", postData);
    setData(postData);
  }, [no]);

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
    <Header title="여성안심귀갓길 데이터 목록" subtitle="서울시에 위치한 여성안심귀갓길의 방범 시스템 데이터를 제공합니다.(데이터 제공: 서울 열린데이터 광장)" />
 
      <h2 align="center">게시글 상세정보</h2>
      <div className="post-view-wrapper">
      {
          data ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{ data.no }</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{ data.title }</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{ data.createDate }</label>
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{ data.readCount }</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                <div>
                  {
                    data.content
                  }
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <button className="post-view-go-list-btn" onClick={goBack}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default PostView; 