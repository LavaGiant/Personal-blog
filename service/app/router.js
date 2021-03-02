'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/default/index')(app)
  require('./router/admin/index')(app)
};
