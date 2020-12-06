if(process.env.NODE_ENV === 'production') //Step-53:- To export the required module
    module.exports = require('./prod');
else
    module.exports = require('./dev');