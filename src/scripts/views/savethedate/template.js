exports.render = function(model) {
    return `
        <div class='save-the-date'>
            <div class='ornament'>
                <img src='/images/ornament.jpg'/>
            </div>
            <div class='image-container'>
                <img style='filter: sepia(20%); webkit-filter: sepia(20%);' src='${model.imageUrl}'>
                <h1 class='couple-title'>${model.title}</h1>
            </div>
            <div class='event'>
                <img src='/images/date.jpg'
            </div>
        </div>
    `
}