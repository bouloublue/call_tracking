async function testConnection() {
  await global.db.sequelizeConfig.authenticate();
  global.logger.db.info('DB Connection has been established successfully.');
}

module.exports = testConnection;