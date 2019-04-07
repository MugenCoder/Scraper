var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  }
});

//Export Article model
var Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;
