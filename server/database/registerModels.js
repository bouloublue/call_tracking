function init(){
    // Register all models here
    require('./models/users');
    require('./models/number');
    require('./models/campaign');
    require('./models/campaignMapping');
    require('./models/billingRule');

}

module.exports = init;
