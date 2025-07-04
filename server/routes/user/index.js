const express = require('express');

function init() {

  const router = express.Router();
  const userRouter = require('./userController');

  global.logger.routes.info('Initializing User Routes');


  router.use('/', userRouter);

  return router;
};

module.exports = init;