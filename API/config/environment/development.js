'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/pandas-shorten-api-dev'
    },

    session: {
        secret: "pandas-shorten-api"
    },

    port: 8888,

    // Seed database on startup
    seedDB: true,

    admin: {
        username: 'user',
        password: 'panda'
    }
};
