var bodyParser = require("body-parser");
var express = require("express");
var favicon = require('serve-favicon');
var compression = require("compression");
var config = { port: process.env.PORT || 3005 };
var app = express();


app.use(compression())
app.use(bodyParser.json());
// Use custom favicon
app.use(favicon(__dirname + '/images/favicon.ico'));

// Setup static folders
app.use('/dist', express.static(__dirname + '/dist', { maxAge: '1h' }));
app.use('/images', express.static(__dirname + '/images', { maxAge: '2d' }));

app.get("/", (req, res) => res.sendFile(__dirname + "/src/index.html"));
app.get("/:view", (req, res) => res.sendFile(__dirname + "/src/index.html"));

// Start the web server on the specified port
app.listen(config.port, process.env.IP, function() {
    console.log("Server running on port " + config.port)
});
