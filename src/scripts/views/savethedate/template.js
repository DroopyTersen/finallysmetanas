exports.render = function(model) {
    return `
        <div class='save-the-date'>
            <div class='image-container'>
                <img style='filter: sepia(20%); webkit-filter: sepia(20%);' src='${model.imageUrl}'>
                <div class='event'>
                    <div class='label'>
                        <span class='big'>Save</span>
                        <span class='small'>the</span>
                        <span class='big'>Date</span>
                    </div>
                    <div class='date'>${model.date}</div>
                    <div class='details'>
                        <div>
                            <a href='https://www.google.com/maps/place/Racine+Masonic+Center/@42.7211409,-87.7853379,17z/data=!3m1!4b1!4m12!1m6!3m5!1s0x88054379703c8603:0x36be514cd0886b05!2sRacine+Masonic+Center!8m2!3d42.721137!4d-87.7831439!3m4!1s0x88054379703c8603:0x36be514cd0886b05!8m2!3d42.721137!4d-87.7831439' target='_blank'>Racine Masonic Center</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
                // <h1 class='couple-title'>${model.title}</h1>