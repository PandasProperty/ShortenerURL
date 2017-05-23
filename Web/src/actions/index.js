/**
 * Created by anda on 5/14/17.
 */

let userActions = require('./user');
let urlActions = require('./url');
let modalAction = require('./modal');

module.exports = Object.assign({}, userActions, urlActions, modalAction);
