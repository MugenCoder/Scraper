// ROUTE TIME

app.get("/scrape", function(req, res) {
  // Grab the body of the html with axios
  axios.get("http://www.nytimes.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article .assetWrapper a").each(function(i, element) {
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("h2")
        .text();
      result.link = $(this).attr("href");
      result.summary = $(this)
        .children("p")
        .text();

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Route: All Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// route to delete saved articles
app.delete("/delete", function(req, res) {
  var result = {};
  result._id = req.body._id;
  Save.findOneAndRemove(
    {
      _id: req.body._id
    },
    function(err, doc) {
      // Log any errors
      if (err) {
        console.log("error:", err);
        res.json(err);
      }
      // Or log the doc
      else {
        res.json(doc);
      }
    }
  );
});

// save notes
app.get("/notes/:id", function(req, res) {
  if (req.params.id) {
    Note.find({
      article_id: req.params.id
    }).exec(function(error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.send(doc);
      }
    });
  }
});

 // Create a new note or replace an existing note
 app.post("/notes", function (req, res) {
  if (req.body) {
      var newNote = new Note(req.body);
      newNote.save(function (error, doc) {
          if (error) {
              console.log(error);
          } else {
              res.json(doc);
          }
      });
  } else {
      res.send("Error");
  }
});

// find and update the note
app.get("/notepopulate", function (req, res) {
  Note.find({
      "_id": req.params.id
  }, function (error, doc) {
      if (error) {
          console.log(error);
      } else {
          res.send(doc);
      }
  });
});

// save the article
app.post("/save", function(req, res) {
  var result = {};
  result.id = req.body._id;
  result.summary = req.body.summary;
  result.byline = req.body.byline;
  result.title = req.body.title;
  result.link = req.body.link;
  // Save these results in an object that we'll push into the results array
  var entry = new Save(result);
  // Now, save that entry to the db
  entry.save(function(err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
      res.json(err);
    }
    // Or log the doc
    else {
      res.json(doc);
    }
  });
  //res.json(result);
});

 // get route to return all saved articles
 app.get("/saved/all", function (req, res) {
  Save.find({})
      .populate("note")
      .exec(function (error, data) {
          if (error) {
              console.log(error);
              res.json({"code" : "error"});
          } else {
              res.json(data);
          }
      });
});

