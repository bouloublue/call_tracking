const express = require('express');

function init() {

  const router = express.Router();
  const formController = require('./formController');

  global.logger.routes.info('Initializing User Routes');


  router.use('/', formController);

  return router;
};

module.exports = init;