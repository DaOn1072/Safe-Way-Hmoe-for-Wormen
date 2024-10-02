import React, { Component } from 'react';

import { DataGrid, GridToolbar } from "@mui/x-data-grid"; // MUI의 데이터 그리드 및 툴바를 가져옵니다.
import './App.css'; // 스타일시트를 가져옵니다.
import { withStyles } from '@mui/styles'; // 스타일을 적용하기 위한 HOC를 가져옵니다.

// 스타일 객체를 정의합니다. 테마를 사용하여 스타일을 설정합니다.
const styles = (theme) => ({
  root: {
    width: '100%', // 컨테이너의 너비를 100%로 설정합니다.
    marginTop: theme.spacing.unit * 3, // 위쪽 여백을 설정합니다.
    overflowX: "auto", // 가로 오버플로우를 자동으로 설정합니다.
  },
  table: {
    minWidth: 1080, // 최소 너비를 1080px로 설정합니다.
  },
  progress: {
    margin: theme.spacing.unit * 2, // 진행 상태의 여백을 설정합니다.
  },
});

// Api 컴포넌트를 정의합니다.
class Api extends Component {
  constructor(props) {
    super(props);
    // 초기 상태를 설정합니다. 고객 데이터 배열과 진행 상태를 포함합니다.
    this.state = {
      customers: [], // 고객 데이터를 저장할 배열입니다.
      completed: 0, // 진행 상태를 나타내는 값입니다.
    };
  }

  // 상태를 초기화하는 메서드입니다. 고객 데이터를 비우고 API를 호출합니다.
  stateRefresh = () => {
    this.setState({
      customers: [], // 고객 데이터를 비웁니다.
      completed: 0, // 진행 상태를 초기화합니다.
    });
    this.callApi() // API를 호출하여 고객 데이터를 가져옵니다.
      .then((res) => this.setState({ customers: res })) // 데이터가 성공적으로 반환되면 상태를 업데이트합니다.
      .catch((err) => console.log(err)); // 에러가 발생하면 콘솔에 로그를 출력합니다.
  };

  // 컴포넌트가 마운트될 때 호출되는 생명주기 메서드입니다.
  componentDidMount() {
    this.timer = setInterval(this.progress, 20); // 일정 간격으로 진행 상태를 업데이트하는 타이머를 설정합니다.
    this.callApi() // API를 호출하여 고객 데이터를 가져옵니다.
      .then((res) => this.setState({ customers: res })) // 데이터가 성공적으로 반환되면 상태를 업데이트합니다.
      .catch((err) => console.log(err)); // 에러가 발생하면 콘솔에 로그를 출력합니다.
  }

  // 고객 데이터를 가져오는 비동기 메서드입니다.
  callApi = async () => {
    const response = await fetch('/api/customers'); // API에 요청을 보냅니다.
    const body = await response.json(); // 응답을 JSON 형식으로 변환합니다.
    return body; // 변환된 데이터를 반환합니다.
  };

  // 진행 상태를 업데이트하는 메서드입니다.
  progress = () => {
    const { completed } = this.state; // 현재 진행 상태를 가져옵니다.
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 }); // 진행 상태가 100 이상이면 0으로 초기화합니다.
  };

  // 렌더링 메서드입니다.
  render() {
    const { classes } = this.props; // 클래스 스타일을 가져옵니다.
    const columns = [ // 데이터 그리드의 열을 정의합니다.
      { field: "id", headerName: "연번", flex: 0.5 }, // ID 열
      { field: "police_office", headerName: "경찰서" }, // 경찰서 열
      { field: "name", headerName: "관서명" }, // 관서명 열
      { field: "division", headerName: "구분" }, // 구분 열
      { field: "phone_number", headerName: "전화번호" }, // 전화번호 열
      { field: "address", headerName: "주소" }, // 주소 열
      { field: "설정", headerName: "설정" }, // 설정 열
    ];

    return ( // JSX를 반환합니다.
      <div className={classes.root}> // 스타일이 적용된 div를 생성합니다.
        <DataGrid // 데이터 그리드를 렌더링합니다.
          rows={this.state.customers} // 고객 데이터 행을 설정합니다.
          columns={columns} // 정의한 열을 설정합니다.
          components={{ Toolbar: GridToolbar }} // 툴바 컴포넌트를 설정합니다.
        />
      </div>
    );
  }
}

// 스타일을 적용한 Api 컴포넌트를 내보냅니다.
export default withStyles(styles)(Api);
