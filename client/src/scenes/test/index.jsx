import React from 'react';
import { Button, Box } from '@mui/material';

const LinkingScreen = () => {
    const phoneNumber = '01079131645';
    const email = 'zxcv17653@gmail.com';
    const fixedMessage = 'Hello! This is a fixed message.';

    const handlePhoneClick = () => {
        window.open(`tel:${phoneNumber}`);
    };

    const handleSmsClick2 = () => {
        window.open(`sms:${phoneNumber}?body=${encodeURIComponent(fixedMessage)}`);
    };

    const handleEmailClick = () => {
        window.open(`mailto:${email}?subject=Subject&body=${encodeURIComponent(fixedMessage)}`);
    };

    return (
        <Box>
            <Button variant="contained" onClick={() => window.open('https://www.google.com', '_blank')}>
                웹페이지 열기
            </Button>
            <Button variant="contained" onClick={handlePhoneClick}>
                전화 걸기
            </Button>
            <Button variant="contained" onClick={handleSmsClick2}>
                문자 보내기
            </Button>
            <Button variant="contained" onClick={handleEmailClick}>
                이메일 보내기
            </Button>
        </Box>
    );
};

export default LinkingScreen;