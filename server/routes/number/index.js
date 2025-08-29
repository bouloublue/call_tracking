const express = require('express');

function init() {

  const router = express.Router();
  const numberRouter = require('./numberController');

  global.logger.routes.info('Initializing User Routes');


  router.use('/', numberRouter);

  return router;
};

module.exports = init;