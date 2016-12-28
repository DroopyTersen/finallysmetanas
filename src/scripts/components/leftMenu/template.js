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
// var render = exports.render = function(model) {
//    return `            
//     <nav class='nav-bar'>
//         <span id='menu-trigger'><i class="fa fa-bars"></i></span>
//         <span id='mobile-title'>Finally Smetanas</span>
//         <ul>
//             <li><a href='/'><i class="fa fa-home"></i>Home</a></li>
//             <li><a href='/couple'><i class="fa fa-heart"></i>The Couple</a></li>
//             <li><a href='/weddingparty'><i class="fa fa-users"></i>Wedding Party</a></li>
//             <li><a href='/schedule'><i class="fa fa-clock-o"></i>Schedule</a></li>
//             <li><a href='/registry'><i class="fa fa-gift"></i>Registry</a></li>
//             <li><a href='/place'><i class="fa fa-map-marker"></i>Place</a></li>
//             <li><a href='/travel'><i class="fa fa-plane"></i>Travel</a></li>
//             <li><a href='/accomodations'><i class="fa fa-bed"></i>Accomodations</a></li>
//             <li><a href='/social'><i class="fa fa-twitter"></i>Social Media</a></li>
//         </ul>
//     </nav>`
// };