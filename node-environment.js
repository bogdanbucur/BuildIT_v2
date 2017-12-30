/* eslint-env node, es5 */
/* eslint global-require: 0 */

require('dotenv').config({
    path: __dirname + '/.env'
});

global.Promise = require('bluebird');