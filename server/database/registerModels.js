function init(){
    // Register all models here
    require('./models/users');
    require('./models/campaign');
    require('./models/campaignMapping');
    require('./models/number');
}

module.exports = init;
