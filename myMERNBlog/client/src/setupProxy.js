const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){ //Step-118:- This will help us avoid the cors issue that comes up when we try to directly send reequests or response between the client and the server ports which are different.
    app.use(createProxyMiddleware('/api',{target:'http://localhost:5000/'}));
}