import React, { Component } from 'react';
// import Customer from './components/Customer';


import { DataGrid } from "@mui/x-data-grid";
import './App.css';
import { withStyles } from '@mui/styles';


const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Api_saferoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      completed: 0,
    };
  }

  stateRefresh = () => {
    this.setState({
      customers: [],
      completed: 0,
    });
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/saferoad');
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    const columns = [
      { field: "city_county_district", headerName: "시군구명", flex: 0.5 },
      { field: "eup_dong_myeong", headerName: "읍면동명" },
      { field: "safety_bells_cnt", headerName: "안심벨 수" },
      { field: "cctv_cnt", headerName: "CCTV 수" },
      { field: "security_light_cnt", headerName: "보안등 수" },
      { field: "information_sign_cnt", headerName: "안내표시 수" },
      { field: "safe_return_road", headerName: "안심귀갓길명" },
      { field: "detailed_location", headerName: "세부위치" },
    ];

    return (
      <div className={classes.root}>
        <DataGrid
          rows={this.state.customers}
          columns={columns}
        />
      </div>
      
    );
  }
}

export default withStyles(styles)(Api_saferoad);