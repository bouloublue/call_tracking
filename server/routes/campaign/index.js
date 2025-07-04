const express = require('express');

function init() {

  const router = express.Router();
  const capaignRouter = require('./campaignController');

  global.logger.routes.info('Initializing User Routes');


  router.use('/', capaignRouter);

  return router;
};

module.exports = init;