const express = require('express');

function init() {

  const router = express.Router();
  const billingRouter = require('./billingController');

  global.logger.routes.info('Initializing Billing Routes');

  router.use('/', billingRouter);

  return router;
};

module.exports = init;