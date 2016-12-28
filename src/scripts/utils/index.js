var utils = {
    dom: require("./domUtils"),
    Swiper: require("./Swiper")
}

utils.toArray = (obj) => {
    return Object.keys(obj).map(key => obj[key]);
};

utils.pluck = (obj, props) => {
    var newObj = {};
    props.forEach(prop => newObj[prop] = obj[prop]);
    return newObj;
};

module.exports = utils;