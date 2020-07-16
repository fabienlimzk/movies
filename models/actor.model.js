const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actorSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  actedIn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Movie",
    }
  ],
});

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;