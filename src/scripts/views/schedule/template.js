exports.render = function(model) {
    return `
        <div class='schedule'>
            <div class='view-title'>
                <hr/>
                <h2 class='view-title'>Schedule</h2>
            </div>
            <div class='events'>
                ${model.map(renderEvent).join("\n<hr>\n")}
            </div>
        </div>
    `
}

var renderEvent = function(event) {
    return `
<div class='event'>
    <div class='date'>${event.date}</div>
    <h2 class='title'>${event.title}</h2>
    <h3 class='time'>${event.time}</h3>
    <div class='location'>${event.location}</div>
    <p class='details'>${event.details}</p>
</div>    
`
}