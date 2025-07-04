const registerModels = require('./registerModels');
const registerAssociations = require('./associations');


function init() {

  const { sequelizeConfig, sequelize } = require('./sequelizeDB');

  global.db = {
    sequelize: sequelize,
    sequelizeConfig: sequelizeConfig,
    models: {},
  };

  registerModels();
  registerAssociations();

}

module.exports = init;