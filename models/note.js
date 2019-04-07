var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
  title: String,
  body: String
});

// Create Note model
var Note = mongoose.model("Note", NoteSchema);

// Export Note model
module.exports = Note;
