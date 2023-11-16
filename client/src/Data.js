const postList = [
    {
      "no": 1,
      "title": " 서울특별시 성동구 사근동10길 16 ",
      "content": (
        <div>
          2023-11-14 15:07:23<br />
          서울특별시 성동구 사근동 10길 16 도로에서 위급상황이 인식 되었습니다.<br />
          성동경찰서에 주변 순찰을 요청합니다.<br />
          Windows용 메일에서 발송된 메일입니다.
        </div>
      ),      
      "createDate": "2023-11-14 15:07:23",
      "readCount": "성동경찰서",
      "repost": "신고 접수"
    },
    {
      "no": 2,
      "title": " 서울특별시 성동구 마조로5길 8 ",
      "content": "두번째 게시글 내용입니다.",
      "createDate": "2023-11-14 14:28:53",
      "readCount": "성동경찰서",
      "repost": "신고 미접수"
    },
    {
      "no": 3,
      "title": " 서울특별시 성동구 고산자로 269 ",
      "content": "두번째 게시글 내용입니다.",
      "createDate": "2023-11-14 13:49:17",
      "readCount": "성동경찰서",
      "repost": "신고 미접수"
    },
    {
      "no": 4,
      "title": " 서울특별시 성동구 고산자로 269 ",
      "content": "두번째 게시글 내용입니다.",
      "createDate": "2023-11-14 13:02:03",
      "readCount": "성동경찰서",
      "repost": "신고 미접수"
    },
    {
      "no": 5,
      "title": " 서울특별시 성동구 무학봉 15가길 7 ",
      "content": "두번째 게시글 내용입니다.",
      "createDate": "2023-11-13 16:19:41",
      "readCount": "성동경찰서",
      "repost": "신고 미접수"
    },
    {
      "no": 6,
      "title": " 서울특별시 성동구 무학봉 15가길 7 ",
      "content": "세번째 게시글 내용입니다.",
      "createDate": "2023-11-13 16:07:22",
      "readCount": "성동경찰서",
      "repost": "신고 미접수"
    },
    {
      "no": 7,
      "title": " 서울특별시 성동구 장터길 34 ",
      "content": "네번째 게시글 내용입니다.",
      "createDate": "2023-11-11 14:53:39",
      "readCount": "성동경찰서",
      "repost": "신고 접수"
    },
    {
      "no": 8,
      "title": " 서울특별시 중구 청구로1길 23 ",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2023-11-11 14:11:58",
      "readCount": "약수 지구대",
      "repost": "신고 접수"
    },
    {
      "no": 9,
      "title": " 서울특별시 강동구 천호대로1469 ",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2023-11-11 18:43:03",
      "readCount": "상일지구대",
      "repost": "신고 접수"
    },
    {
      "no": 10,
      "title": " 서울특별시 강동구 천호대로1469 ",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2023-11-10 18:17:10",
      "readCount": "상일지구대",
      "repost": "신고 접수"
    },
    {
      "no": 11,
      "title": " 서울특별시 강동구 아리수로97길 20 ",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2023-11-09 11:03:57",
      "readCount": "강일지구대",
      "repost": "신고 미접수"
    },
    {
      "no": 12,
      "title": " 서울특별시 강동구 아리수로97길 20 ",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2023-11-09 10:42:08",
      "readCount": "강일지구대",
      "repost": "신고 접수"
    },
    {
      "no": 13,
      "title": "다섯번째 게시글입니다.",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 4,
      "repost": "yes"
    },
    {
      "no": 14,
      "title": "다섯번째 게시글입니다.",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 4,
      "repost": "yes"
    },
  ];
  
  const getPostByNo = no => {
    const array = postList.filter(x => x.no == no);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }
  
  export {
    postList,
    getPostByNo
  };