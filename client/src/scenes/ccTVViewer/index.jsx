import React from "react";

const CCTVViewer = ({ cctvStreamURL }) => {
  return (
    <div>
      <h2>CCTV 실시간 영상</h2>
      <video width="640" height="360" controls>
        <source src={cctvStreamURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CCTVViewer;