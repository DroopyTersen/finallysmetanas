var render = exports.render = function(model) {
   return `            
    <nav class='nav-bar'>
        <span id='menu-trigger'><i class="fa fa-bars"></i></span>
        <span id='mobile-title'>${model.title}</span>
        <ul>
            ${model.links.map(renderLink).join("")}
        </ul>
    </nav>`
};

var renderLink = function(link) {
    return `
        <li>
            <a href="${link.path}">
                <i class="fa fa-${link.icon}"></i>
                ${link.title}
            </a>
        </li>
    `
};