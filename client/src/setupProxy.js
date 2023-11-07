// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/guide/getSafeOpenJson.do', // 프록시할 엔드포인트
    createProxyMiddleware({
      target: 'https://www.utic.go.kr', // 실제 요청할 대상 서버 주소
      changeOrigin: true, // 호스트 헤더 변경 가능 옵션
      pathRewrite: {
        '^/guide/getSafeOpenJson.do': '/guide/getSafeOpenJson.do' // 경로 재작성 (선택 사항)
      }
    })
  );
};