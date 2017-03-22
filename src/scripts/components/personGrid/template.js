var renderPerson = function(person) {
    return `
        <li class='person' data-name='${person.name}'>
            <img src='/images/people/${person.name.toLowerCase()}-md.jpg'>
            <div class='caption'>
                <div class='name'>${person.name}</div>
                <div class='title'>${person.title}</div>
            </div>
        </li>
        `
};

exports.renderDetails = function(person) {
    return `
        <h3 class='name'>${person.name}</h3>
        <img src='/images/people/${person.name.toLowerCase()}.jpg'>
        <div class='knownfor'>Known for ${person.yearsKnown} years</div>
        <div class='bio'>
            ${person.bio}
        </div>
    `
}
exports.render = function(model) {
    return `
        <div class='person-grid'>
            <h3 class='grid-title'>${model.title}</h3>
            <ul>
                ${model.people.map(renderPerson).join("")}
            </ul>

            <div class='person-details'>
                <div class='content'></div>
                <span class='close-btn'><i class="fa fa-2x fa-times"></i></span>
            <div>
        </div>
    `
}