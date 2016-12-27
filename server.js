var bodyParser = require("body-parser");
var express = require("express");
var hbs = require("hbs");
var config = { port: process.env.PORT || 3005 };
var app = express();


hbs.registerPartials(__dirname + '/src/views/partials');
// we need the body parser so we can get at the POST body that Amazon sends
app.use(bodyParser.json());
app.set('env', "development");
app.set('view cache', false);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/images'));

app.get("/favicon.ico", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => res.render("home"));
app.get("/:view", (req, res) => res.render(req.params.view));

// Start the web server on the specified port
app.listen(config.port, process.env.IP, function() {
    console.log("Server running on port " + config.port)
});
