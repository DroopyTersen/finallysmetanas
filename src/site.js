var createHub = require("./scripts/hub").create;
require("./scripts/utils/polyfills");
global.fs = {
    _hub: createHub(),
    actions: require("./scripts/actions"),
    utils: require("./scripts/utils")        
};

