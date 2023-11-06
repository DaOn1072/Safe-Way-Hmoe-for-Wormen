import React, { Component } from 'react';
// import Customer from './components/Customer';


import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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

class Api extends Component {
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
    const response = await fetch('/api/customers');
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
      { field: "id", headerName: "연번", flex: 0.5 },
      { field: "police_office", headerName: "경찰서" },
      { field: "name", headerName: "관서명" },
      { field: "division", headerName: "구분" },
      { field: "phone_number", headerName: "전화번호" },
      { field: "address", headerName: "주소" },
      { field: "설정", headerName: "설정" },
    ];

    return (
      <div className={classes.root}>
        <DataGrid
          rows={this.state.customers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
      
    );
  }
}

export default withStyles(styles)(Api);