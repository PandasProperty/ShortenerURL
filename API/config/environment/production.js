'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8888,

    session: {
        secret: "pandas-shorten-api"
    },

    // MongoDB connection options
    mongo: {
      uri: 'mongodb://localhost/pandas-shorten-api'
    },

    admin: {
        username: 'user',
        password: 'panda'
    }
};
