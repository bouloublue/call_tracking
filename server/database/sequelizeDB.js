
let sequelize;
sequelize = require('sequelize');

/**
 * Pool config for database. Production uses higher min and max value.
 * Development uses lesser value
 */
let poolConfig = {
  min: 20,
  max: 200,
  idle: 30000, // 30 seconds
};

if (process.env.NODE_ENV !== 'production') {
  poolConfig = {
    min: 0,
    max: 5,
    idle: 300000, // 5 mins
  };
}

const sequelizeConfig = new sequelize.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: 'mysql',
  // Uncomment and configure as needed
  // benchmark: process.env.BENCHMARK_DB === 'true',
  // logQueryParameters: logDbQueries,
  // pool: poolConfig,
  // dialectOptions: {
  //   connectTimeout: 60000,
  //   connectionTimeoutMillis: 60000,
  //   idle_in_transaction_session_timeout: 60000,
  // },
  // operatorsAliases: 0,
  logging: console.log,
});

module.exports = { sequelizeConfig, sequelize };