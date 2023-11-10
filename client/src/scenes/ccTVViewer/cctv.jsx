import React from "react";
import CCTVViewer from ".";

const Cctv= () => {
  const cctvStreamURL = "http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=N8Sy3LEAg0b0IiqvcPcL7Bbj8eQ8hOVXGhXP6vbSY79CoNzdCLj8vR1amEHe&cctvid=L010233&cctvName=%25EC%2599%2595%25EC%258B%25AD%25EB%25A6%25EC%2597%25AD%25EC%2598%25A4%25EA%25B1%25B0%25EB%25A6%25AC&kind=Seoul&cctvip=null&cctvch=52&id=179&cctvpasswd=null&cctvport=null";

  return (
    <div>
      <h1>My React CCTV App</h1>
      <CCTVViewer cctvStreamURL={cctvStreamURL} />
    </div>
  );
};

export default App;