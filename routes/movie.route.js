const router = require("express").Router();
const Movie = require("../models/movie.model");
const Genre = require("../models/genre.model");
const Director = require("../models/director.model");
const Actor = require("../models/actor.model");

// router.get("/", (req, res) => {
//   Movie.find()
//   .then((movies) => {
//     res.render("movies/index", { movies });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

router.get("/", async (req, res) => {
  try {
    let movies = await Movie.find()
    .populate("genreTypes") 
    console.log(movies);
    res.render("movies/index", { movies });
  } catch(error) {
    console.log(error);
  };
});

router.get("/create", async (req, res) => {
  try{
    let genres = await Genre.find()
    .populate("genreTypes")
    let directors = await Director.find()
    .populate("directedBy")
    let actors = await Actor.find()
    .populate("actedBy")
    res.render("movies/create", { genres, directors, actors });
  } catch(error) {
    console.log(error);
  }
});

router.post("/create", (req, res) => {
  // let movieData = {
  //   title: req.body.title,
  //   description: req.body.description,
  //   image_path: req.body.image_path,
  //   featured: req.body.featured,
  // };

  let movie = new Movie(req.body);
  console.log(movie);
  movie.save()
  .then(() => {
    console.log("It's saved!");
    Genre.findById(movie.genreTypes)
    .then((genres) => {
      genres.relatedMovies.push(movie._id)
      genres.save()
      .then(() => {
        Director.findById(movie.directedBy)
        .then((director) => {
          director.directedIn.push(movie._id)
          director.save()
          .then(() => {
            Actor.findById(movie.actedBy)
            .then((actors) => {
              actors.actedIn.push(movie._id)
              actors.save()
              .then(() => {
                res.redirect("/");
              });
            })
          })
        })
      })
    })
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/show/:id", async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id)
    .populate("genreTypes")
    .populate("directedBy")
    .populate("actedBy")
    res.render("movies/show", { movie });
  } catch (error) {
    console.log(error);
  }
  // Movie.findById(req.params.id)
  // .then((movie) => {
  //   res.render("movies/show", { movie });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
});

router.get("/edit/:id", (req, res) => {
  Movie.findById(req.params.id)
  .then((movie) => {
    res.render("movies/edit", { movie });
  })
  .catch((err) => {
    console.log(err);
  });
});

router.post("/edit/:id", (req, res) => {
  // req.body
  Movie.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect("/");
    console.log("edit success");
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/delete/:id", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;