import React, { useState, useEffect } from 'react';
import ProtectedAreaAPI from '../../ProtectedAreaAPI';

const MyComponent = () => {
    const [htmlContent, setHtmlContent] = useState(''); // HTML 내용을 관리하는 상태

    // 컴포넌트가 마운트될 때 실행되는 함수
    useEffect(() => {
        // HTML 내용을 가져오거나 생성합니다.
        const newHtmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My React App</title>
            </head>
            <body>
                <h1>Hello, World!</h1>
                <p>This is an example of HTML within a React component.</p>
            </body>
            </html>
        `;

        // HTML 내용을 상태에 설정
        setHtmlContent(newHtmlContent);
    }, []); // 빈 배열을 넣어서 한 번만 실행하도록 설정

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
    );
}

export default MyComponent;