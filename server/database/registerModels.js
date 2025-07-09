function init(){
    // Register all models here
    require('./models/users');
    require('./models/campaign');
    require('./models/form');
    require('./models/campaignLead')
}

module.exports = init;
