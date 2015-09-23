var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport")
var path = require("path");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var port = process.env.PORT || 3000;
var app = express();


mongoose.connect('mongodb://localhost/crowdfund');

app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/bower_components"));
app.use(bodyParser.urlencoded({ extended:false, limit:"25mb" }));
app.use(bodyParser.json({ limit: "25mb" }));
app.engine(".html", ejs.renderFile);
app.set('views', path.join(__dirname));
app.set("view options", { layout:false });

app.get('/', function(req, res){
	res.render("index.html");
});

app.listen(port, function(){
	console.log("Server online at localhost:" + port);
});
