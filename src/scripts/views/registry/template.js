exports.render = function(model) {
    return `
        <div class='registry'>
            <div class='view-title'>
                <hr/>
                <h2 class='view-title'>Registry</h2>
            </div>
            <div class='content'>
                ${model.content}
            </div>
            <div class='links'>
                ${model.links.map(renderLink).join(" / ")}
            </div>
        </div>
    `
}

var renderLink = function(link) {
    return `<a target='_blank' href='${link.url}'>${link.title}</a>`
}