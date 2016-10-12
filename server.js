var bodyParser = require("body-parser");
var express = require("express");

var config = { port: process.env.PORT || 3000 };
var app = express();

// we need the body parser so we can get at the POST body that Amazon sends
app.use(bodyParser.json());
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.get("/", (req, res) => res.send("Hiya"));
app.use('/static', express.static('static'));

// Start the web server on the specified port
app.listen(config.port, process.env.IP, function() {
    console.log("Server running on port " + config.port)
});
