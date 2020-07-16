const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const app = express();
require("dotenv").config();

/* connect to mongoDB */
mongoose.connect(process.env.MONGODBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, 
() => {
  console.log("MongoDB connected!");
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressLayouts)

app.use("/", require("./routes/movie.route"));
app.use("/genres", require("./routes/genre.route"));
app.use("/directors", require("./routes/director.route"));
app.use("/actors", require("./routes/actor.route"));

app.listen(process.env.PORT, () => {
  console.log(`running on PORT ${process.env.PORT}`);
});