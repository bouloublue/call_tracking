const express = require('express');

function init() {

  const router = express.Router();
  const authRouter = require('./authController');

  global.logger.routes.info('Initializing Billing Routes');

  router.use('/', authRouter);

  return router;
};

module.exports = init;