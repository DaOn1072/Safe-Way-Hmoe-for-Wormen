import React, { useState } from "react";
import axios from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { theme, colors } from "../../theme"; // theme 파일 경로에 맞게 수정
import Header from "../../components/Header";

const CustomerAdd = (props) => {
  const [state, setState] = useState({
    police_office: '',
    name: '',
    division: '',
    phone_number: '',
    address: '',
    open: false
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer()
      .then((response) => {
        console.log(response.data);
        props.stateRefresh();
      });
    setState({
      police_office: '',
      name: '',
      division: '',
      address: '',
      phone_number: '',
      open: false
    });
  }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('police_office', state.police_office);
    formData.append('name', state.name);
    formData.append('division', state.division);
    formData.append('phone_number', state.phone_number);
    formData.append('address', state.address);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return axios.post(url, formData, config);
  }

  const handleOpen = () => {
    setState(prevState => ({
      ...prevState,
      open: true
    }));
  }
  
  const handleClose = () => {
    setState(prevState => ({
      ...prevState,
      police_office: '',
      name: '',
      division: '',
      address: '',
      phone_number: '',
      open: false
    }));
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Header title="경찰청_경찰관서 위치 주소 현황" subtitle="경찰서, 관서명, 지구대,파출소 주소 정보를 제공하고 있습니다. (데이터 제공: 공공데이터 포털)" />
      <Button variant="contained" sx={{ backgroundColor: colors.blueAccent[700], color: theme.palette.common.white, margin: 1.5, padding: 2, fontSize: 14, fontWeight: "bold" }} onClick={handleOpen}>
        경찰 데이터 추가하기
      </Button>
      <Dialog open={state.open} onClose={handleClose}>
        <DialogTitle>목록 추가</DialogTitle>
        <DialogContent>
          <TextField type="text" label="경찰서" name="police_office" value={state.police_office} onChange={handleValueChange} /><br />
          <TextField type="text" label="관서명" name="name" value={state.name} onChange={handleValueChange} /><br />
          <TextField type="text" label="구분" name="division" value={state.division} onChange={handleValueChange} /><br />
          <TextField type="text" label="주소" name="address" value={state.address} onChange={handleValueChange} /><br />
          <TextField type="text" label="전화번호" name="phone_number" value={state.phone_number} onChange={handleValueChange} /><br />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
          <Button variant="outlined" sx={{ backgroundColor: theme.palette.common.white, color: colors.primary.main }} onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerAdd;