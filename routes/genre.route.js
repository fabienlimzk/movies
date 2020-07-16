const router = require("express").Router();
const Genre = require("../models/genre.model");

router.get("/", (req, res) => {
  Genre.find()
  .then((genres) => {
    res.render("genres/index", { genres })
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/create", (req, res) => {
  res.render("genres/create");
});

router.post("/create", (req, res) => {
  let genreData = {
    genre: req.body.genre,
  };

  let genre = new Genre(genreData);

  genre.save()
  .then(() => {
    res.redirect("/genres");
    // res.send("genre saved");
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/show/:genreid", (req, res) => {
  Genre.findById(req.params.genreid)
  .then((genres) => {
    res.render("genres/show", { genres });
  })
  .catch((err) => {
    console.log(err);
  });
});

// edit genre at edit genre page
router.get("/edit/:genreid", (req, res) => {
  Genre.findById(req.params.genreid)
  .then((genre) => {
    res.render("genres/edit", { genre });
  }) 
  .catch((err) => {
    console.log(err);
  });
});

router.post("/edit/:genreid", (req, res) => {
  Genre.findByIdAndUpdate(req.params.genreid, req.body)
  .then(() => {
    res.redirect("/genres");
    console.log("edit success");
  })
  .catch((err) => {
    console.log(err);
  });
});

// delete genre at genre index page
router.get("/delete/:genreid", (req, res) => {
  Genre.findByIdAndDelete(req.params.genreid)
  .then(() => {
    res.redirect("/genres");
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;