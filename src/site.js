var createHub = require("./scripts/hub").create;
global.fs = {
    _hub: createHub(),
    actions: require("./scripts/actions"),
    utils: require("./scripts/utils")        
};

