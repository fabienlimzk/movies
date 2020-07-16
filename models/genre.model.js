const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = Schema({
  genre: {
    type: String,
    required: true,
  },
  relatedMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Movie",
    }
  ]
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;