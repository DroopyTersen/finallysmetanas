exports.render = function(model) {
    return `
        <div class='the-couple'>
            <div class='view-title'>
                <hr/>
                <h2 class='view-title'>The Couple</h2>
            </div>
            <div class='image-container'>
                <img style='filter: sepia(50%); webkit-filter: sepia(50%);' src='${model.imageUrl}'>
            </div>
            <div class='content'>
                ${model.content}
            </div>
        </div>
    `
}