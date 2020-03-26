// // 참고 : https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     proxy({
//       target: 'http://localhost:5000',
//       changeOrigin: true,
//     })
//   );
// };

// Proxy 사용 방법이 변경됨

// 참고 : https://www.npmjs.com/package/http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
    );
  };