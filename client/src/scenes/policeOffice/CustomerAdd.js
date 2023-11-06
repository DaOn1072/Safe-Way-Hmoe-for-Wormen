import React, { Component } from "react";
import axios from 'axios';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import TextField from "@material-ui/core/TextField";
// import Button from '@material-ui/core/Button';
// import { WithStyles } from "@material-ui/core/styles";

// const styles = theme => ({
//   hidden: {
//     display: 'none'
//   }
// })

class CustomerAdd extends Component{
    constructor(props) {
      super(props);
      this.state = {
        police_office: '',
        name: '',
        division: '',
        phone_number: '',
        address: '',
        open: false
      };
    }
  
    handleFormSubmit = (e) => {
      e.preventDefault();
      this.addCustomer()
        .then((response) => {
          console.log(response.data);
          this.props.stateRefresh();
        });
      this.setState({
        police_office: '',
        name: '',
        division: '',
        address: '',
        phone_number: '',
        // open: false
      })
      
    }
  
    handleValueChange = (e) => {
    //   const { name, value } = e.target;
    //   this.setState({
    //     [name]: value
    //   });
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
  
    addCustomer = () => {
      const url = '/api/customers';
      const formData = new FormData();
      formData.append('police_office', this.state.police_office);
      formData.append('name', this.state.name);
      formData.append('division', this.state.division);
      formData.append('phone_number', this.state.phone_number);
      formData.append('address', this.state.address);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      return axios.post(url, formData, config);
    }

    // handleClickOpen = () => {
    //   this.setState({
    //     open: true
    //   });
    // }
    
    // handleClose = () => {
    //   this.setState({
    //     police_office: '',
    //     name: '',
    //     division: '',
    //     address: '',
    //     phone_number: '',
    //     open: false
    //   })
    // }
  
    // render() {
    //   const { classes } = this.props;
    //   return (
    //       <div>
    //         <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
    //           경찰서 추가하기
    //         </Button>
    //         <Dialog open={this.state.open} onClose={this.handleClose}>
    //           <DialogTitle>목록 추가</DialogTitle>
    //           <DialogContent>
    //             <TextField type="text" label="경찰서" name="police_office" value={this.state.police_office} onChange={this.handleValueChange} /><br />
    //             <TextField type="text" label="관서명" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
    //             <TextField type="text" label="구분" name="division" value={this.state.division} onChange={this.handleValueChange} /><br />
    //             <TextField type="text" label="주소" name="address" value={this.state.address} onChange={this.handleValueChange} /><br />
    //             <TextField type="text" label="전화번호" name="phone_number" value={this.state.phone_number} onChange={this.handleValueChange} /><br />
    //           </DialogContent>
    //           <DialogActions>
    //             <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
    //             <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
    //         </DialogActions>
    //         </Dialog>

    //       </div>
        render(){
            return(
                <form onSubmit={this.handleFormSubmit}>
                <h1>관서 추가</h1>
                    경찰서<input type="text" name="police_office" value={this.state.police_office} onChange={this.handleValueChange} /><br />
                    관서명<input type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                    구분<input type="text" name="division" value={this.state.division} onChange={this.handleValueChange} /><br />
                    전화번호<input type="text" name="phone_number" value={this.state.phone_number} onChange={this.handleValueChange} /><br />
                    주소<input type="text" name="address" value={this.state.address} onChange={this.handleValueChange} /><br />
                <button type="submit">정보 추가하기</button>
              </form>
            )
        }
      
    }

export default CustomerAdd;