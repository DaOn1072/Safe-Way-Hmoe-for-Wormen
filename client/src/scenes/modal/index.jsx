import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";

const EmergencyModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMoveToFAQ = () => {
    console.log('Moving to /faq');
    navigate('/faq');
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} style={{ fontSize: '16px', color: colors.grey[100] }}>
      <DialogTitle style={{ fontSize: '24px', textAlign: 'center' }}>
        위급 상황 안내
      </DialogTitle>
      <DialogContent style={{ fontSize: '18px', textAlign: 'center' }}>
        <p>위급 상황이 발생했습니다.</p>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button
          onClick={handleMoveToFAQ}
          style={{
            backgroundColor: colors.redAccent[500], // 버튼 배경색
            color: 'white', // 버튼 텍스트 색
            fontSize: '18px',
          }}
        >
          이동
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmergencyModal;