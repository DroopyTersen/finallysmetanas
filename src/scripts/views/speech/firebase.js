module.exports = function() {
    return new Promise((resolve, reject) => {
        require.ensure(["droopy-firebase"], function(require) {
            // Now require it "sync"
            var firebase = require("droopy-firebase");
            var db = firebase.connect(require("./firebaseConfig"));
            
            var getCurrentSlide = function() {
                return db.slides.get("current")
                    .then(result => result.index);
            };
            
            var setCurrentSlide = function(index) {
                db.slides.update("current", {index})
            }
            
            var onSlideChange = function(handler) {
                db.slides.on("update", slide => {
                    handler(slide.index)
                });
            }
            resolve({
                getCurrentSlide,
                setCurrentSlide,
                onSlideChange,
            })
        }, "firebase");

    });
}