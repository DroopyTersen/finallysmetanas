exports.render = function(model) {
    var cssClass ='the-speech' + (model.isAdmin ? " admin" : "");
    return `
        <div class='${cssClass}'>
            <div class='view-title'>
                <hr/>
                <h2 class='view-title'>The Speech</h2>
            </div>
            <div class='content slide-container'>
                ${model.slides.map(renderSlide).join("")}
            </div>
            <div class='admin-actions'>
                <button type='button' class='prev-btn'>Prev</button>
                <button type='button' class='next-btn'>Next</button>
            </div>
        </div>
    `
}
var renderSlide = function(slide, index) {
    return `
        <div class='slide slide-${index}'>
            <img src='${slide.image}'>
            <p class='caption tagline'>
                ${slide.caption || ""}
            </p>
        </div>
    `
}