// Scrape Hero Academia 
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");   //REMINDER: Promise Based (think ajax)
var cheerio = require("cheerio");

var db = require("./models");   // Sexy models

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

// ROUTE TIME

app.get("/scrape", function(req, res) {
    // Grab the body of the html with axios
    axios.get("http://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });