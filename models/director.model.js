const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  directedIn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Movie",
    }
  ],
});

const Director = mongoose.model("Director", directorSchema);

module.exports = Director;