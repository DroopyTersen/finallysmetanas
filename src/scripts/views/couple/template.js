exports.render = function(model) {
    return `
        <div class='the-couple'>
            <div class='view-title'>
                <hr/>
                <h2 class='view-title'>The Couple</h2>
            </div>
            <div class='image-container'>
                <img style='filter: sepia(35%); webkit-filter: sepia(35%);' src='${model.imageUrl}'>
            </div>
            <div class='content'>
                ${model.content}
            </div>
        </div>
    `
}