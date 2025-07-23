const express = require('express');

function init() {

  const router = express.Router();
  const callRouter = require('./callcontroller');

  global.logger.routes.info('Initializing User Routes');


  router.use('/', callRouter);

  return router;
};

module.exports = init;