const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = Schema({
  title: String,
  description: String,
  image_path: String,
  featured: Boolean,
  genreTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Genre",
    }
  ],
  directedBy: 
  {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Director",
  },
  actedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Actor",
    }
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;