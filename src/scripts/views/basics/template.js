exports.render = function(model) {
    return `
        <div class='the-couple'>
            <div class='view-title'>
                <hr/>
                <h2 class='view-title'>The Basics</h2>
            </div>
            <div class='content'>
                ${model.content}
            </div>
        </div>
    `
}