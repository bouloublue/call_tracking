function init(){
    // Register all models here
    require('./models/users');
    require('./models/number');
    require('./models/campaign');
    require('./models/campaignMapping');
    require('./models/billingRule');
    require('./models/callLogs');
    require('./models/billingLogs');
    require('./models/otpVerfication');
}

module.exports = init;
