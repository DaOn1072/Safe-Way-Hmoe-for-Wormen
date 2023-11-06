import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import { tokens, themeSettings } from "../../theme";

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        })
        .then(() => {
            this.props.stateRefresh();
        })
        .catch(error => {
            console.error('Error deleting customer:', error);
        });
    }

    render() {
        const colors = tokens(themeSettings('dark').palette.mode); // 'dark' 또는 'light' 모드를 선택할 수 있습니다.

        return (
            <div>
                <Button variant="contained" sx={{ backgroundColor: colors.redAccent[500], color: 'white' }} onClick={this.handleClickOpen}> 삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</Button>
                        <Button variant="outlined" sx={{ backgroundColor: 'white', color: colors.blueAccent[800] }} onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;