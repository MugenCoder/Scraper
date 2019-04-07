// Scrape Hero Academia 
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");   //REMINDER: Promise Based (think ajax)
var cheerio = require("cheerio");

var db = require("./models");   // Bring in Sexy Models

var PORT = 3000;

var app = express();    //duh-always needed; stop forgetting

// A dash of middleware

app.use(logger("dev"));   // morgan will log our requests
app.use(express.urlencoded({ extended: true }));    // REMINDER: parses request body as JSON
app.use(express.json());
app.use(express.static("public"));  //establish static [shock] folders

// Anthony's preferred connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {     //invoke server
    console.log("App running on port " + PORT + "!");
  });