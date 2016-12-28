exports.render = function(model) {
    return `
        <div id='the-couple'>
            <div class='view-title'>
                <hr/>
                <h2 class='view-title'>The Couple</h2>
            </div>
            <div class='image-container'>
                <img src='${model.imageUrl}'>
            </div>
            <div class='content'>
                ${model.content}
            </div>
        </div>
    `
}